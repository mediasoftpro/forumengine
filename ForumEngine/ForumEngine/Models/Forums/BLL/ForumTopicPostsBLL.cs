using Jugnoon.Framework;
using LinqKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Text;
using Jugnoon.Utility;
using Microsoft.Extensions.Caching.Memory;
using Jugnoon.Models;
/// <summary>
/// Forum Topics Posts API - Business Layer Designed for Forums Topics. 
/// It support detail topic listing with all associated threads of posts or specific post within topic
/// It can also support optional search within topic threads.
/// </summary>
namespace Jugnoon.Forums
{
    public class ForumTopicPostsBLL
    {
        public static Task<List<JGN_ForumTopics>> LoadItems(ApplicationDbContext context, ForumTopicEntity entity)
        {
            if (!entity.iscache 
                || Jugnoon.Settings.Configs.GeneralSettings.cache_duration == 0 
                || entity.pagenumber > Jugnoon.Settings.Configs.GeneralSettings.max_cache_pages)
            {
                return Load_Raw(context, entity);
            }
            else
            {
                string key = prepare_cache_key("lg_frm_cat_", entity);
                var data = new List<JGN_ForumTopics>();
                if (!SiteConfig.Cache.TryGetValue(key, out data))
                {
                    data = Load_Raw(context, entity).Result;

                    var cacheEntryOptions = new MemoryCacheEntryOptions()
                        // Keep in cache for this time, reset time if accessed.
                        .SetSlidingExpiration(TimeSpan.FromSeconds(3600));

                    // Save data in cache.
                    SiteConfig.Cache.Set(key, data, cacheEntryOptions);
                }
                else
                {
                    data = (List<JGN_ForumTopics>)SiteConfig.Cache.Get(key);
                }
                return Task.Run(() => data);
            }
        }
        private static Task<List<JGN_ForumTopics>> Load_Raw(ApplicationDbContext context, ForumTopicEntity entity)
        {
            return processOrder(prepareQuery(context, entity), entity)
                   .Select(p => new JGN_ForumTopics
                   {
                       id = p.topic.id,
                       forumid = p.topic.forumid,
                       userid = p.topic.userid,
                       title = p.topic.title,
                       description = p.topic.description,
                       tags = p.topic.tags,
                       replies = p.topic.replies,
                       isadult = p.topic.isadult,
                       created_at = p.topic.created_at,
                       isenabled = p.topic.isenabled,
                       views = p.topic.views,
                       replyid = p.topic.replyid,
                       isresolved = p.topic.isresolved,
                       type = p.topic.type,
                       islocked = p.topic.islocked,
                       isapproved = p.topic.isapproved,
                       liked = p.topic.liked,
                       disliked = p.topic.disliked,
                       lastpostdate = p.topic.lastpostdate,
                       lastpostuserid = p.topic.lastpostuserid,
                       resolvedpostid = p.topic.resolvedpostid,
                       author = new ApplicationUser()
                       {
                           firstname = p.user.firstname,
                           lastname = p.user.lastname,
                           picturename = p.user.picturename
                       },
                       forums = new JGN_Forums()
                       {
                           id = p.forum.id,
                           title = p.forum.title,
                           lastpostid = p.forum.lastpostid
                       }
                   }).ToListAsync();
        }

        public static Task<int> Count(ApplicationDbContext context, ForumTopicEntity entity)
        {
            return prepareQuery(context, entity).CountAsync();
        }

        private static IQueryable<TopicPostsEntity> prepareQuery(ApplicationDbContext context, ForumTopicEntity entity)
        {
            return context.JGN_ForumTopics
             .Join(context.AspNetusers,
                 topic => topic.userid,
                 user => user.Id, (topic, user) => new { topic, user })
             .Join(context.JGN_Forums,
                 topic => topic.topic.forumid,
                 forum => forum.id, (topic, forum) =>
                 new TopicPostsEntity
                 {
                     forum = forum,
                     topic = topic.topic,
                     user = topic.user
                 })
                .Where(returnWhereClause(entity));
        }

        private static IQueryable<TopicPostsEntity> processOrder(IQueryable<TopicPostsEntity> collectionQuery, ForumTopicEntity query)
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

        private static System.Linq.Expressions.Expression<Func<TopicPostsEntity, bool>> returnWhereClause(ForumTopicEntity entity)
        {
            var where_clause = PredicateBuilder.New<TopicPostsEntity>(true);

            // public contents only
            where_clause = where_clause.And(p => p.topic.isenabled == 1 
            && p.topic.isapproved == 1 
            && p.forum.isenabled == 1 
            && p.user.isenabled == 1);

            if (entity.id > 0 || entity.replyid > 0)
            {
                if (entity.singlepost)
                {
                    where_clause = where_clause.And(p => p.topic.id == entity.id);
                }
                else
                {
                    // multiple posts associated with single thread / topic
                    long _id = 0;
                    if (entity.id > 0)
                        _id = entity.id;
                    else if (entity.replyid > 0)
                        _id = entity.replyid;

                    where_clause = where_clause.And(p => p.topic.replyid == _id || p.topic.id == _id);
                }
            }

            // add search support for searching within threads
            if (entity.term != "")
                where_clause = where_clause.And(p => p.topic.title.Contains(entity.term)
                || p.topic.description.Contains(entity.term)
                || p.user.UserName.Contains(entity.term)
                || p.topic.tags.Contains(entity.term));

            return where_clause;
        }


        // Dynamic Sort Option
        private static IQueryable<TopicPostsEntity> AddSortOption(IQueryable<TopicPostsEntity> collectionQuery, string field, string direction)
        {
            var reverse = false;
            if (direction == "desc")
                reverse = true;

            return (IQueryable<TopicPostsEntity>)collectionQuery.Sort(field, reverse);

        }

        private static string prepare_cache_key(string key, ForumTopicEntity vd)
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

    public class TopicPostsEntity
    {
        public JGN_ForumTopics topic { get; set; }
        public JGN_Forums forum { get; set; }
        public ApplicationUser user { get; set; }

    }
}


/*
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.md', which is part of this source code package.
 * Copyright 2007 - 2020 MediaSoftPro
 * For more information email at support@mediasoftpro.com
 */
