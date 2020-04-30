using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Caching.Memory;
using Jugnoon.Utility;
using Jugnoon.Entity;
using Jugnoon.BLL;
using System.Linq;
using Jugnoon.Framework;
using Microsoft.EntityFrameworkCore;
using LinqKit;
using System.Threading.Tasks;
using Jugnoon.Models;

namespace Jugnoon.Forums
{
    public enum ResolvedActions
    {
        Open = 0,
        Resolved = 1,
        All = 2
    };
    public enum LockedActions
    {
        Open = 0,
        Locked = 1,
        All = 2
    };
    public class ForumTopicBLL
    {
        // Important Terms

        // isenabled
        // ........... 1: Enabled
        // ........... 0: Disabled

        // isapproved
        // ........... 1: Approved / Reviewed
        // ........... 0: Not approved, reviewed yet

        // isadult
        // ........... 1: Adult Oriented
        // ........... 0: Normal Post

        // isresolved
        // ........... 1: Resolved Topic
        // ........... 0: Unresolved Topic

        // Type
        // ........... 0: Normal Posts
        // ........... 1: Announcements 

        // islocked
        // ........... 0: Normal
        // ........... 1: Locked Post (No reply to post)



        #region ActionScript

        public static void Validation(JGN_ForumTopics gal)
        {
            // validation
            if (gal.title != null &&  gal.title.Length > 200)
                gal.title = gal.title.Substring(0, 199);

            if (gal.tags != null && gal.tags.Length > 300)
                gal.tags = gal.tags.Substring(0, 299);
        }

        public static async Task<JGN_ForumTopics> Process(ApplicationDbContext context, JGN_ForumTopics entity, bool isadmin)
        {
          
                if (entity.id == 0)
                {
                    Validation(entity);

                    var _entity = new JGN_ForumTopics()
                    {
                        forumid = entity.forumid,
                        title = UtilityBLL.processNull(entity.title, 0),
                        description = UtilityBLL.processNull(entity.description, 0),
                        tags = UtilityBLL.processNull(entity.tags, 0),
                        userid = entity.userid,
                        isenabled = entity.isenabled,
                        isapproved = entity.isapproved,
                        created_at = DateTime.Now,
                        replyid = entity.replyid,
                        lastpostdate = DateTime.Now,
                        isadult = entity.isadult
                    };

                    context.Entry(_entity).State = EntityState.Added;

                    await context.SaveChangesAsync();

                    entity = _entity;

                    // update statistics
                    // if topic is approved and enabled
                    if (entity.isapproved == 1 && entity.isenabled == 1)
                    {
                        // update user stats
                        var total_posts = await CountRecords(context,new ForumTopicEntity()
                        {
                            userid = entity.userid,
                            isenabled = EnabledTypes.All,
                            isapproved = ApprovedTypes.All
                        });

                        await UserStatsBLL.Update_Field(context,  entity.userid, (short)total_posts, "stat_forum_topics");

                        // update post stats
                        if (entity.replyid > 0)
                        {
                            // update topic post stats
                            // e.g
                            // replies (total replies)
                            // lastpostdatetime
                            // lastpostusername
                            await Update_Topic_Stats(context, entity);

                           // no need to update posts in case of reply
 
                        }
                        else
                        {
                        //update thread stats
                            try
                            {
                                int threads = await CountRecords(context, new ForumTopicEntity()
                                {
                                    forumid = entity.forumid,
                                    replyid = 0,
                                    ispublic = true
                                });
                                ForumBLLC.Update_Value_V3(context, entity.forumid, "threads", threads);
                            }
                            catch (Exception ex)
                            {
                                var ms = ex.Message;
                            }
                       

                            int posts = await CountRecords(context,new ForumTopicEntity()
                            {
                                forumid = entity.forumid,
                                replyid = 0,
                                ispublic = true,
                                onlytopics = false // replyid = 0;
                            });
                            ForumBLLC.Update_Value_V3(context, entity.forumid, "posts", posts);

                            // update lastpost time, last post id (only if new topic posted
                            ForumBLLC.Update_Last_Post(context, entity.forumid, _entity.id);

                        }

                        // update points
                        //int total_points = Convert.ToInt32(UserBLL.Return_Value(entity.userid, "stat_forum_points"));
                        //total_points = total_points + Forum_Settings.TopicReplyPoints;
                        //UserBLL.Update_Field_V3(context,  entity.userid, "stat_forum_points", total_points);

                        // send notification mail to admin
                        if (!isadmin)
                        {
                           // MailProcess.Admin_New_Content_Added(context, entity.userid, "forum topic", "");
                        }
                    }
                }
                else
                {
                    var item = context.JGN_ForumTopics
                    .Where(p => p.id == entity.id)
                    .FirstOrDefault<JGN_ForumTopics>();

                    item.forumid = entity.forumid;
                    //item.title = UtilityBLL.processNull(entity.title,0);
                    item.description = UtilityBLL.processNull(entity.description, 0);
                    //item.tags = UtilityBLL.processNull(entity.tags, 0);
                    item.isenabled = (byte)entity.isenabled;
                    item.isapproved = (byte)entity.isapproved;

                   context.SaveChanges();

                }
            
            return entity;
        }

        // update user topic post stats
        public static async Task<bool> Update_Topic_Stats(ApplicationDbContext context, JGN_ForumTopics entity)
        {
            // increment topic replies
            int replies = await CountRecords(context, new ForumTopicEntity()
            {
                replyid = entity.replyid,
                ispublic = true,
            });
            replies--; // it count both topic and replies (deduct topic)

            var item = context.JGN_ForumTopics
                    .Where(p => p.id == entity.replyid)
                    .FirstOrDefault();

            item.replies = replies;
            item.lastpostdate = DateTime.Now;
            item.lastpostuserid = entity.userid;

            context.Entry(item).State = EntityState.Modified;
            await context.SaveChangesAsync();
            
            return true;
        }
        /* public static async Task<bool> Update_Topic_Stats(ApplicationDbContext context, ForumTopicEntity entity)
        {
            // increment topic replies
            int replies = await CountRecords(context,new ForumTopicEntity()
            {
                replyid = entity.replyid,
                ispublic = true
            });
            replies--; // it count both topic and replies (deduct topic)

            
                var item = context.JGN_ForumTopics
                     .Where(p => p.id == entity.replyid)
                     .FirstOrDefault<JGN_ForumTopics>();

                item.replies = replies;
                item.lastpostdate = DateTime.Now;
                item.lastpostuserid = entity.userid;

                context.Entry(item).State = EntityState.Modified;
                context.SaveChanges();
            

            return true;
        }*/
        // Delete Forum
        public static async Task<bool> Delete(ApplicationDbContext context, long PostID, int ForumID, string UserName)
        {
            int EffectedRecords = 0;
            context.JGN_ForumTopics.RemoveRange(context.JGN_ForumTopics.Where(p => p.id == PostID || p.replyid == PostID));
            EffectedRecords = await context.SaveChangesAsync();

            await UpdateStats(context, EffectedRecords, ForumID, UserName);
          
            return true;
        }

        private static async Task<bool> UpdateStats(ApplicationDbContext context, int RecordsEffected, int ForumID, string UserName)
        {
            if (RecordsEffected > 0)
            {
                // update user total posts stats
                var total_posts = await CountRecords(context,new ForumTopicEntity()
                {
                    userid = UserName,
                    ispublic = true
                });
                await UserStatsBLL.Update_Field(context, UserName, (short)total_posts, "stat_forum_topics");
                //update thread stats
                int threads = await CountRecords(context,new ForumTopicEntity()
                {
                    forumid = ForumID,
                    replyid = 0,
                    ispublic = true,
                    onlytopics = true
                });
                ForumBLLC.Update_Value_V3(context, ForumID, "threads", threads);

                int posts = await CountRecords(context,new ForumTopicEntity()
                {
                    forumid = ForumID,
                    replyid = 0,
                    ispublic = true,
                    onlytopics = false // load all
                });
                ForumBLLC.Update_Value_V3(context, ForumID, "posts", posts);
            }
           
            return true;
        }

     
        public static string Return_Value(ApplicationDbContext context, long id, string fieldname)
        {
            string Value = "";
            var item = context.JGN_ForumTopics
                .Where(p => p.id == id)
                .FirstOrDefault();

            if (item != null)
            {
                foreach (var prop in item.GetType().GetProperties())
                {
                    if (prop.Name.ToLower() == fieldname.ToLower())
                    {
                        Value = prop.GetValue(item, null).ToString();
                    }
                }
            }

            return Value;
        }

        public static async Task<bool> Update_Value_V3(ApplicationDbContext context, long ID, string FieldName, dynamic Value)
        {
            var item = context.JGN_ForumTopics
                    .Where(p => p.id == ID)
                    .FirstOrDefaultAsync();

            if(item != null)
            {
                foreach (var prop in item.GetType().GetProperties())
                {
                    if (prop.Name.ToLower() == FieldName.ToLower())
                    {
                        prop.SetValue(item, Value);
                    }
                }
                context.Entry(item).State = EntityState.Modified;
                await context.SaveChangesAsync();
            }

            return true;
        }

      
        public static List<JGN_ForumTopics> Load_Last_Post(ApplicationDbContext context, long TopicID)
        {

            var _items = new List<JGN_ForumTopics>();

            _items = context.JGN_ForumTopics
                    .Where(p => p.id == TopicID && p.isenabled == 1 && p.isapproved == 1)
                    .Select(p => new JGN_ForumTopics()
                    {
                        title = p.title,
                        userid = p.userid
                    })
                    .ToList();

            return _items;
        }

        // increment views
        // update user topic post stats
        public static async Task<bool> Increment_Views(ApplicationDbContext context, long id, int current_views)
        {
            int views = current_views;
            if (views == 0)
            {
                var value = Return_Value(context, id, "views");
                if(value != "")
                {
                    views = Convert.ToInt32(value);
                }
            }
              
            views++;
            await Update_Value_V3(context, id, "views", views);
            return true;
        }

        // mark as resolved
        public static async Task<bool> MarkAsResolved(ApplicationDbContext context, long id, long postid, string postusername, int value)
        {
            await Update_Value_V3(context, id, "isresolved", (byte)value);
            if (value == 1) // resolved content
            {
                await Update_Value_V3(context, id, "resolvedpostid", (long)postid);
                // update points
                /*int total_points = Convert.ToInt32(UserBLL.Return_Value(context, postusername, "stat_forum_points"));
                total_points = 0;
                UserBLL.Update_Field_V3(context, postusername, "stat_forum_points", total_points); */
            }
            else
            {
                await Update_Value_V3(context, id, "resolvedpostid", (byte)0);
                // decrease points
                /*int total_points = Convert.ToInt32(UserBLL.Return_Value(context, postusername, "stat_forum_points"));
                total_points = total_points - Forum_Settings.MarkasAnswerPoints;
                if (total_points < 0)
                    total_points = 0;
                UserBLL.Update_Field_V3(context, postusername, "stat_forum_points", total_points); */
            }
            return true;
        }
        #endregion

        #region Core Loading Script
        //**************************************************************************************
        // Core Engine for generating cached and non cached photo listings
        //**************************************************************************************

        // Check authorization
        public static bool Check(ApplicationDbContext context, long PostID, string UserName)
        {
            bool flag = false;
            
                if (context.JGN_ForumTopics.Where(p => p.id == PostID && p.userid == UserName).Count() > 0)
                    flag = true;
            

            return flag;
        }

        public static async Task<List<JGN_ForumTopics>> LoadItems(ApplicationDbContext context, ForumTopicEntity entity)
        {
            if (entity.loadabusereports)
                return await AbuseTopics.LoadItems(context, entity);
            else
                return await _LoadItems(context, entity);
        }
         
        private static async Task<List<JGN_ForumTopics>> _LoadItems(ApplicationDbContext context,ForumTopicEntity entity)
        {
            if (!entity.iscache 
                || Jugnoon.Settings.Configs.GeneralSettings.cache_duration == 0  
                || entity.pagenumber > Jugnoon.Settings.Configs.GeneralSettings.max_cache_pages)
            {
                return await FetchItems(context,entity);
            }
            else
            {
                string key = GenerateKey("lg_frm_tp_", entity);
                var data = new List<JGN_ForumTopics>();
                if (!SiteConfig.Cache.TryGetValue(key, out data))
                {
                    data = await FetchItems(context,entity);

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

                return data;
            }
        }


        private static async Task<List<JGN_ForumTopics>> FetchItems(ApplicationDbContext context,ForumTopicEntity entity)
        {
            var collectionQuery = processOptionalConditions(prepareQuery(context, entity), entity);
            if (entity.id > 0 || !entity.issummary)
                return await LoadCompleteList(collectionQuery);
            else
                return await LoadSummaryList(collectionQuery);
        }

        public static async Task<int> Count(ApplicationDbContext context, ForumTopicEntity entity)
        {
            if (entity.loadabusereports)
                return await AbuseTopics.Count(context, entity);
            else
                return await _Count(context, entity);
        }

        private static async Task<int> _Count(ApplicationDbContext context,ForumTopicEntity entity)
        {
            if (!entity.iscache 
                || Jugnoon.Settings.Configs.GeneralSettings.cache_duration == 0  
                || entity.pagenumber > Jugnoon.Settings.Configs.GeneralSettings.max_cache_pages)
            {
                return await CountRecords(context,entity);
            }
            else
            {
                string key = GenerateKey("cnt_frm_topics", entity);
                int records = 0;
                if (!SiteConfig.Cache.TryGetValue(key, out records))
                {
                    records = await CountRecords(context,entity);

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
                return  records;
            }
        }

        public static async Task<int> CountRecords(ApplicationDbContext context,ForumTopicEntity entity)
        {
             return await prepareQuery(context, entity).CountAsync();
        }

        private static string GenerateKey(string key, ForumTopicEntity entity)
        {
            var cache = new StringBuilder();
            cache.Append(key + "_" + entity.forumid + "" + entity.userid + "" +
                entity.month + "" + entity.year + "" + entity.datefilter + "" + 
                entity.replyid + "" + entity.isadult + "" + 
                entity.isresolved + "" + entity.type + "" +
                entity.islocked + "" + UtilityBLL.ReplaceSpaceWithHyphin(entity.order.ToLower()) + "" + entity.pagenumber);

            return cache.ToString();
        }
        private static Task<List<JGN_ForumTopics>> LoadCompleteList(IQueryable<TopicUserEntity> query)
        {
            return query.Select(p => new JGN_ForumTopics
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
                    Id = p.user.Id,
                    firstname = p.user.firstname,
                    lastname = p.user.lastname,
                    UserName = p.user.UserName,
                    picturename = p.user.picturename,
                    created_at = p.user.created_at
                }
            }).ToListAsync();
        }

        private static Task<List<JGN_ForumTopics>> LoadSummaryList(IQueryable<TopicUserEntity> query)
        {
            return query.Select(prepareSummaryList()).ToListAsync();
        }

        public static System.Linq.Expressions.Expression<Func<TopicUserEntity, JGN_ForumTopics>> prepareSummaryList()
        {
            return p => new JGN_ForumTopics
            {
                id = p.topic.id,
                forumid = p.topic.forumid,
                userid = p.topic.userid,
                title = p.topic.title,
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
                replies = p.topic.replies,
                lastpostdate = p.topic.lastpostdate,
                lastpostuserid = p.topic.lastpostuserid,
                resolvedpostid = p.topic.resolvedpostid,
                author = new ApplicationUser()
                {
                    Id = p.user.Id,
                    firstname = p.user.firstname,
                    lastname = p.user.lastname,
                    picturename = p.user.picturename,
                    UserName = p.user.UserName,
                    created_at = p.user.created_at
                }
            };
        }

        private static IQueryable<TopicUserEntity> prepareQuery(ApplicationDbContext context, ForumTopicEntity entity)
        {
            return context.JGN_ForumTopics
                .Join(context.AspNetusers,
                topic => topic.userid,
                user => user.Id,
                (topic, user) => new TopicUserEntity
                {
                    topic = topic,
                    user = user
                }).Where(returnWhereClause(entity));
        }
        public static IQueryable<TopicUserEntity> processOptionalConditions(IQueryable<TopicUserEntity> collectionQuery, ForumTopicEntity query)
        {
            if (query.order != "")
                collectionQuery = (IQueryable<TopicUserEntity>)collectionQuery.Sort(query.order);
            if (query.id > 0)
            {  
                // validation check (if not set, it will return zero records that will make it difficult to debug the code)
                if (query.pagesize == 0)
                    query.pagesize = 18;
                // skip logic
                if (query.pagenumber > 1)
                    collectionQuery = collectionQuery.Skip(query.pagesize * (query.pagenumber - 1));
                // take logic
                if (!query.loadall)
                    collectionQuery = collectionQuery.Take(query.pagesize);
            }

            return collectionQuery;
        }

        public static System.Linq.Expressions.Expression<Func<TopicUserEntity, bool>> returnWhereClause(ForumTopicEntity entity)
        {
            var where_clause = PredicateBuilder.New<TopicUserEntity>(true);
           
            if (entity.excludedid > 0)
                where_clause = where_clause.And(p => p.topic.id != entity.excludedid);

            if (entity.onlytopics)
            {
                where_clause = where_clause.And(p => p.topic.replyid == 0);
            }
            else if (entity.loadall)
            {
                if (entity.singlepost)
                {
                    where_clause = where_clause.And(p => p.topic.id == entity.id);
                }
                else
                {
                    where_clause = where_clause.And(p => p.topic.id == entity.id || p.topic.replyid == entity.id);
                }
            }
            else
            {
                if (entity.replyid > 0)
                    where_clause = where_clause.And(p => p.topic.replyid == entity.replyid);
                else if (entity.id > 0)
                    where_clause = where_clause.And(p => p.topic.id == entity.id);
                else
                    where_clause = where_clause.And(p => p.topic.replyid == 0); // only main topics
            }


            if (entity.tags != "")
            {
                foreach (var tag in entity.tags.Split(char.Parse(",")))
                {
                    where_clause = where_clause.And(p => p.topic.tags.Contains(tag));
                }
            }

            if (entity.loadabusereports)
                where_clause = where_clause.And(p => p.abusereports.type == (byte)AbuseReport.Types.Forums);

            if (entity.userid != "")
                where_clause = where_clause.And(p => p.topic.userid == entity.userid);

            if (entity.username != "")
                where_clause = where_clause.And(p => p.user.UserName == entity.username);

            if (entity.forumid > 0)
                where_clause = where_clause.And(p => p.topic.forumid == entity.forumid);

            if (entity.ispublic)
            {
                where_clause = where_clause.And(p => p.topic.isenabled == 1);
            }
            else
            {
                if (entity.isenabled != EnabledTypes.All)
                    where_clause = where_clause.And(p => p.topic.isenabled == (byte)entity.isenabled);

                if (entity.isapproved != ApprovedTypes.All)
                    where_clause = where_clause.And(p => p.topic.isapproved == (byte)entity.isapproved);
            }

           if (entity.isadult != AdultTypes.All)
                where_clause = where_clause.And(p => p.topic.isadult == (byte)entity.isadult);


             if (entity.isresolved != ResolvedActions.All)
                where_clause = where_clause.And(p => p.topic.isresolved == (byte)entity.isresolved);


            if (entity.islocked != LockedActions.All)
                where_clause = where_clause.And(p => p.topic.islocked == (byte)entity.islocked);

            if (entity.term != "")
                where_clause = where_clause.And(p => p.topic.title.Contains(entity.term) 
                || p.topic.description.Contains(entity.term)
                || p.user.UserName.Contains(entity.term)
                || p.topic.tags.Contains(entity.term));

            if (entity.month > 0 && entity.year > 0)
                where_clause = where_clause.And(p => p.topic.created_at.Month == entity.month && p.topic.created_at.Year == entity.year);
            else if (entity.year > 0)
                where_clause = where_clause.And(p => p.topic.created_at.Year == entity.year);
            else if (entity.month > 0)
                where_clause = where_clause.And(p => p.topic.created_at.Month == entity.month);

            return where_clause;
        }

        #endregion

        #region Report Script
        public static async Task<GoogleChartEntity> LoadReport(ApplicationDbContext context, ForumTopicEntity entity)
        {
            if (entity.reporttype == DefaultReportTypes.Yearly)
                return await ForumReports.YearlyReport(context, entity);
            else if (entity.reporttype == DefaultReportTypes.CurrentMonth)
                return await ForumReports.CurrentMonthReport(context, entity);
            else
                return await ForumReports.Last12MonthsReport(context, entity);
        }
        #endregion


        // fetch data to generate archive list of records
        public static List<ArchiveEntity> Load_Arch_List(ApplicationDbContext context,int records, bool isall)
        {
            // cache implementation
            int cache_duration = Jugnoon.Settings.Configs.GeneralSettings.cache_duration;
            if (cache_duration == 0) // no cache
                return Fetch_Archive_List(context,records, isall);
            else
            {
                string key = "ld_frm_arc_lst" + records + "" + isall;
                var data = new List<ArchiveEntity>();
                if (!SiteConfig.Cache.TryGetValue(key, out data))
                {
                    data = Fetch_Archive_List(context,records, isall);

                    var cacheEntryOptions = new MemoryCacheEntryOptions()
                        // Keep in cache for this time, reset time if accessed.
                        .SetSlidingExpiration(TimeSpan.FromSeconds(3600));

                    // Save data in cache.
                    SiteConfig.Cache.Set(key, data, cacheEntryOptions);
                }
                else
                {
                    data = (List<ArchiveEntity>)SiteConfig.Cache.Get(key);
                }

                return data;
            }

        }

        public static List<ArchiveEntity> Fetch_Archive_List(ApplicationDbContext context,int records, bool isall)
        {
            // var context = SiteConfig.dbContext;
            var model = context.JGN_ForumTopics
                .GroupBy(o => new
                {
                    Month = o.created_at.Month,
                    Year = o.created_at.Year
                })
                .Select(g => new ArchiveEntity
                {
                    Month = g.Key.Month,
                    Year = g.Key.Year,
                    Total = g.Count()
                })
                .OrderByDescending(a => a.Year)
                .ThenByDescending(a => a.Month)
                .ToList();

            return model;
        }

        public static async Task<string> ProcessAction(ApplicationDbContext context,List<ForumTopicEntity> list)
        {
            foreach (var entity in list)
            {
                if (entity.id > 0)
                {
                    switch (entity.actionstatus)
                    {
                        case "enable":
                            await Update_Value_V3(context, entity.id, "isenabled", (byte)1);
                            break;
                        case "disable":
                            await  Update_Value_V3(context, entity.id, "isenabled", (byte)0);
                            break;
                        case "approve":
                            await  Update_Value_V3(context, entity.id, "isapproved", (byte)1);
                            break;
                        case "locked":
                            await Update_Value_V3(context, entity.id, "islocked", (byte)1);
                            break;
                        case "unlocked":
                            await  Update_Value_V3(context, entity.id, "islocekd", (byte)0);
                            break;
                        case "resolved":
                            await Update_Value_V3(context, entity.id, "isresolved", (byte)1);
                            break;
                        case "nonresolved":
                            await  Update_Value_V3(context, entity.id, "isresolved", (byte)0);
                            break;
                        case "nonadult":
                            await  Update_Value_V3(context, entity.id, "isadult", (byte)0);
                            break;
                        case "adult":
                            await Update_Value_V3(context, entity.id, "isadult", (byte)1);
                            break;
                        case "delete":
                            await Delete(context, entity.id, entity.forumid,entity.userid);
                            // await  Update_Topic_Stats(context, entity);
                            break;
                    }
                }
            }
            return "OK";
        }
    }

    /// <summary>
    /// Entity used while joining data of two tables (forum_topics, users) via Entity Framework (Linq)
    /// </summary>
    public class TopicUserEntity
    {
        public JGN_ForumTopics topic { get; set; }
        public ApplicationUser user { get; set; }
        public JGN_AbuseReports abusereports { get; set; }
    }
}

/*
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.md', which is part of this source code package.
 * Copyright 2007 - 2020 MediaSoftPro
 * For more information email at support@mediasoftpro.com
 */

