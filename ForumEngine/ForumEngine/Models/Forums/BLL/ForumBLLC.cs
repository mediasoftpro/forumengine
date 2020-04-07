using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Caching.Memory;
using Jugnoon.Utility;
using Jugnoon.Settings;
using System.Linq;
using Jugnoon.Framework;
using Microsoft.EntityFrameworkCore;
using LinqKit;
using System.Threading.Tasks;
using Jugnoon.BLL;
using Jugnoon.Entity;

namespace Jugnoon.Forums
{
    public class ForumBLLC
    {
        public static async Task<JGN_Forums> Process(ApplicationDbContext context, JGN_Forums entity)
        {
            if (entity.id == 0)
            {
                var _entity = new JGN_Forums()
                {
                    title = entity.title,
                    description = entity.description,
                    isenabled = entity.isenabled,
                    priority = entity.priority
                };

                context.Entry(_entity).State = EntityState.Added;

                await context.SaveChangesAsync();

                entity.id = _entity.id;

                // Content Associated Categories Processing
                CategoryContentsBLL.ProcessAssociatedContentCategories(context, entity.categories,
                    entity.id, (byte)CategoryContentsBLL.Types.Forums, false);
            }
            else
            {
                var item = context.JGN_Forums
                    .Where(p => p.id == entity.id)
                    .FirstOrDefault();

                if (item != null)
                {
                    item.title = entity.title;
                    item.description = entity.description;
                    item.isenabled = (byte)entity.isenabled;
                    item.priority = (byte)entity.priority;
                    await context.SaveChangesAsync();

                    // Content Associated Categories Processing
                    CategoryContentsBLL.ProcessAssociatedContentCategories(context, entity.categories,
                        item.id, (byte)CategoryContentsBLL.Types.Forums, true);
                }
               
            }
            

            return entity;
        }

        public static async Task<bool> Delete(ApplicationDbContext context,int id)
        {            
            var entity = new JGN_Forums { id = id };
            context.JGN_Forums.Attach(entity);
            context.JGN_Forums.Remove(entity);
            await context.SaveChangesAsync();
            // remove catgory references
            context.JGN_CategoryContents.RemoveRange(context.JGN_CategoryContents.Where(x => x.contentid == entity.id && x.type == (byte)CategoryContentsBLL.Types.Forums));
            return true;
        }


        #region Core Loading Script
        public static Task<List<JGN_Forums>> LoadItems(ApplicationDbContext context, ForumEntity entity)
        {
            if (entity.categoryname != ""
            || entity.categoryid > 0
            || entity.category_ids.Length > 0)
                return CategorizeForums.LoadItems(context, entity);
            else
                return _LoadItems(context, entity);
        }
       
        private static Task<List<JGN_Forums>> _LoadItems(ApplicationDbContext context,ForumEntity entity)
        {
            if (!entity.iscache 
                || Jugnoon.Settings.Configs.GeneralSettings.cache_duration == 0  
                || entity.pagenumber > Jugnoon.Settings.Configs.GeneralSettings.max_cache_pages)
            {
                return FetchItems(context,entity);
            }
            else
            {
                string key = GenerateKey("lg_forum_", entity);
                var data = new List<JGN_Forums>();
                if (!SiteConfig.Cache.TryGetValue(key, out data))
                {
                    data = FetchItems(context,entity).Result;

                    var cacheEntryOptions = new MemoryCacheEntryOptions()
                        // Keep in cache for this time, reset time if accessed.
                        .SetSlidingExpiration(TimeSpan.FromSeconds(3600));

                    // Save data in cache.
                    SiteConfig.Cache.Set(key, data, cacheEntryOptions);
                }
                else
                {
                    data = (List<JGN_Forums>)SiteConfig.Cache.Get(key);
                }

                return Task.Run(() => data);
            }
        }


        private static Task<List<JGN_Forums>> FetchItems(ApplicationDbContext context,ForumEntity entity)
        {
            // No INNER JOIN
            var collectionQuery = processOptionalConditions(prepareQuery(context, entity), entity);
            if (entity.isdropdown)
            {
                return LoadDropdownList(collectionQuery);
            }
            else
            {
                return LoadCompleteList(collectionQuery);
            }
        }
        public static Task<int> Count(ApplicationDbContext context,ForumEntity entity)
        {
            if (!entity.iscache 
                || Jugnoon.Settings.Configs.GeneralSettings.cache_duration == 0  
                || entity.pagenumber > Jugnoon.Settings.Configs.GeneralSettings.max_cache_pages)
            {
                return CountRecords(context,entity);
            }
            else
            {
                string key = GenerateKey("cnt_forum", entity);
                int records = 0;
                if (!SiteConfig.Cache.TryGetValue(key, out records))
                {
                    records = CountRecords(context,entity).Result;

                    var cacheEntryOptions = new MemoryCacheEntryOptions()
                        // Keep in cache for this time, reset time if accessed.
                        .SetSlidingExpiration(TimeSpan.FromSeconds(3600));

                    // Save data in cache.
                    SiteConfig.Cache.Set(key, records, cacheEntryOptions);
                }
                else
                {
                    records = (int)SiteConfig.Cache.Get(key);
                }
                return Task.Run(() => records);
            }
        }

        private static Task<int> CountRecords(ApplicationDbContext context,ForumEntity entity)
        {
            return prepareQuery(context, entity).CountAsync();
        }

        private static string GenerateKey(string key, ForumEntity entity)
        {
            var cache = new StringBuilder();
            // generate cache key for different version of contents
            cache.Append(key + "_" + entity.isenabled + "" + UtilityBLL.ReplaceSpaceWithHyphin(entity.order.ToLower()) + "" + entity.pagenumber);
            if (entity.term != "")
                cache.Append(UtilityBLL.ReplaceSpaceWithHyphin(entity.term.ToLower()));
            return cache.ToString();
        }
     
        private static Task<List<JGN_Forums>> LoadCompleteList(IQueryable<JGN_Forums> query)
        {
            return query.Select(p => new JGN_Forums
            {
                id = p.id,
                title = p.title,
                description = p.description,
                posts = p.posts,
                threads = p.threads,
                lastpostid = p.lastpostid,
                lastposttime = p.lastposttime,
                isenabled = p.isenabled,
                priority = p.priority,
                categories = p.categories
            }).ToListAsync();
        }
       
        private static Task<List<JGN_Forums>> LoadDropdownList(IQueryable<JGN_Forums> query)
        {
            return query.Select(p => new JGN_Forums
            {
                id = p.id,
                title = p.title
            }).ToListAsync();
        }

        private static IQueryable<JGN_Forums> prepareQuery(ApplicationDbContext context, ForumEntity entity)
        {
            return context.JGN_Forums
             .Where(returnWhereClause(entity));
        }

        private static IQueryable<JGN_Forums> processOptionalConditions(IQueryable<JGN_Forums> collectionQuery, ForumEntity query)
        {
            if (query.order != "")
            {
                var orderlist = query.order.Split(char.Parse(","));
                foreach (var orderItem in orderlist)
                {
                    if (orderItem.Contains("asc") || orderItem.Contains("desc"))
                    {
                        var ordersplit = query.order.Split(char.Parse(" "));
                        if (ordersplit.Length > 1)
                        {
                            collectionQuery = AddSortOption(collectionQuery, ordersplit[0], ordersplit[1]);
                        }
                    }
                    else
                    {
                        collectionQuery = AddSortOption(collectionQuery, orderItem, "");
                    }
                }

            }

            // skip logic
            if (query.id == 0)
            {   
                // validation check (if not set, it will return zero records that will make it difficult to debug the code)
                if (query.pagesize == 0)
                    query.pagesize = 18;
                if (query.pagenumber > 1)
                    collectionQuery = collectionQuery.Skip(query.pagesize * (query.pagenumber - 1));
                // take logic
                if (!query.loadall)
                    collectionQuery = collectionQuery.Take(query.pagesize);
            }
           


            return collectionQuery;
        }

        private static IQueryable<JGN_Forums> AddSortOption(IQueryable<JGN_Forums> collectionQuery, string field, string direction)
        {
            var reverse = false;
            if (direction == "desc")
                reverse = true;

            return (IQueryable<JGN_Forums>)collectionQuery.Sort(field, reverse);
        }

        private static System.Linq.Expressions.Expression<Func<JGN_Forums, bool>> returnWhereClause(ForumEntity entity)
        {
            var where_clause = PredicateBuilder.New<JGN_Forums>(true);
           
            if (entity.excludedid > 0)
                where_clause = where_clause.And(p => p.id != entity.excludedid);
            if (entity.id > 0)
                where_clause = where_clause.And(p => p.id == entity.id);

            if (entity.ispublic)
                where_clause = where_clause.And(p => p.isenabled == 1);
            else
            {
                if (entity.isenabled != EnabledTypes.All)
                    where_clause = where_clause.And(p => p.isenabled == (byte)entity.isenabled);
            }

            if (entity.term != "")
                where_clause = where_clause.And(p => p.description.Contains(entity.term) 
                || p.title.Contains(entity.term));

            return where_clause;
        }

        #endregion

      
        public static bool Update_Value_V3(ApplicationDbContext context, int id, dynamic fieldname, dynamic Value)
        {
            if (id == 0)
                return true;
 
            
                var item = context.JGN_Forums
                     .Where(p => p.id == id)
                     .FirstOrDefault<JGN_Forums>();

                foreach (var prop in item.GetType().GetProperties())
                {
                    if (prop.Name.ToLower() == fieldname.ToLower())
                    {
                        prop.SetValue(item, Value);
                    }
                }
                context.Entry(item).State = EntityState.Modified;
                context.SaveChanges();
            
            return true;
            
        }

        public static bool Update_Last_Post(ApplicationDbContext context, int id, long lastpostid)
        {
                var item = context.JGN_Forums
                     .Where(p => p.id == id)
                     .FirstOrDefault<JGN_Forums>();
                if (item != null)
                {
                    item.lastpostid = lastpostid;

                    context.Entry(item).State = EntityState.Modified;
                    context.SaveChanges();
                }
               
            
            return true;
            
        }

        public static async Task<string> ProcessAction(ApplicationDbContext context,List<ForumEntity> list)
        {
            foreach (var entity in list)
            {
                if (entity.id > 0)
                {
                    switch (entity.actionstatus)
                    {
                        case "enable":
                            Update_Value_V3(context, (int)entity.id, "isenabled", (byte)1);
                            break;
                        case "disable":
                            Update_Value_V3(context, (int)entity.id, "isenabled", (byte)0);
                            break;
                        case "delete":
                            await Delete(context, (int)entity.id);
                            break;
                    }
                }
            }
            return "OK";
        }
    }

}


/*
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.md', which is part of this source code package.
 * Copyright 2007 - 2020 MediaSoftPro
 * For more information email at support@mediasoftpro.com
 */

