using Jugnoon.Framework;
using LinqKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Jugnoon.BLL;
using System.Text;
using Jugnoon.Utility;
using Jugnoon.Models;
/// <summary>
/// Category Filtering API - Business Layer Designed for Forums Files. 
/// It support filtering forums based on category name, categoryid, or array of category lists.
/// It supports only public videos but you can extend its filter logics based on your requirements.
/// </summary>
namespace Jugnoon.Forums
{
    public class CategorizeForums
    {       
        public static Task<List<JGN_Forums>> LoadItems(ApplicationDbContext context, ForumEntity entity)
        {
            return processOrder(prepareQuery(context, entity), entity)
                   .Select(p => new JGN_Forums
                   {
                       id = p.forum.id,
                       title = p.forum.title,
                       description = p.forum.description,
                       posts = p.forum.posts,
                       threads = p.forum.threads,
                       lastpostid = p.forum.lastpostid,
                       lastposttime = (DateTime)p.forum.lastposttime,
                       isenabled = p.forum.isenabled,
                       priority = p.forum.priority,
                   }).ToListAsync();
        }

        public static Task<int> Count(ApplicationDbContext context, ForumEntity entity)
        {
            return prepareQuery(context, entity).CountAsync();
        }

        private static IQueryable<CategoryForumEntity> prepareQuery(ApplicationDbContext context, ForumEntity entity)
        {
            return context.JGN_Forums
             .Join(context.JGN_CategoryContents,
                 forum => forum.id,
                 forum_category => forum_category.contentid, (forum, forum_category) => new { forum, forum_category })
             .Join(context.JGN_Categories,
                 forum_category => forum_category.forum_category.categoryid,
                 category => category.id, (forum_category, category) => 
                 new CategoryForumEntity { 
                     forum = forum_category.forum,
                     forum_category = forum_category.forum_category,
                     category = category })
             .Where(returnWhereClause(entity));
        }

        private static IQueryable<CategoryForumEntity> processOrder(IQueryable<CategoryForumEntity> collectionQuery, ForumEntity query)
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
            if (query.pagenumber > 1)
                collectionQuery = collectionQuery.Skip(query.pagesize * (query.pagenumber - 1));
            // take logic
            if (!query.loadall)
                collectionQuery = collectionQuery.Take(query.pagesize);

            return collectionQuery;
        }

        private static System.Linq.Expressions.Expression<Func<CategoryForumEntity, bool>> returnWhereClause(ForumEntity entity)
        {
            var where_clause = PredicateBuilder.New<CategoryForumEntity>(true);

            // public contents only
            where_clause = where_clause.And(p => p.forum_category.type == (byte)CategoryContentsBLL.Types.Forums && p.forum.isenabled == 1);

            if (entity.categoryname != null && entity.categoryname != "")
                where_clause = where_clause.And(x => x.category.title == entity.categoryname || x.category.term == entity.categoryname);

            if (entity.categoryid > 0)
                where_clause = where_clause.And(x => x.forum_category.categoryid == entity.categoryid);

            if (entity.category_ids.Length > 0)
            {
                foreach(var id in entity.category_ids)
                {
                    where_clause = where_clause.And(x => x.forum_category.categoryid == id);
                }
            }

            // category search flag (if term > "" search enabled)
            if (entity.term != "" && entity.term != null)
                where_clause = where_clause.And(p => p.forum.title.Contains(entity.term) || p.forum.description.Contains(entity.term) || p.category.title.Contains(entity.term));

            return where_clause;
        }


        // Dynamic Sort Option
        private static IQueryable<CategoryForumEntity> AddSortOption(IQueryable<CategoryForumEntity> collectionQuery, string field, string direction)
        {
            var reverse = false;
            if (direction == "desc")
                reverse = true;

            return (IQueryable<CategoryForumEntity>)collectionQuery.Sort(field, reverse);

        }

        private static string prepare_cache_key(string key, ForumEntity vd)
        {
            var str = new StringBuilder();
            str.Append(key + "_" + vd.isfeatured + "" + vd.categoryid + "" + vd.categoryname + "" + UtilityBLL.ReplaceSpaceWithHyphin(vd.order.ToLower()) + "" + vd.pagenumber + "" + vd.pagesize);
            if (vd.category_ids.Length > 0)
            {
                foreach (var id in vd.category_ids)
                {
                    str.Append(id);
                }
            }
            return str.ToString();
        }
    }

    public class CategoryForumEntity
    {
        public JGN_Forums forum { get; set; }
        public JGN_Categories category { get; set; }
        public JGN_CategoryContents forum_category { get; set; }
    }
}

/*
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.md', which is part of this source code package.
 * Copyright 2007 - 2020 MediaSoftPro
 * For more information email at support@mediasoftpro.com
 */
