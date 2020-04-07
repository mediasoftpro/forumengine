using Jugnoon.Framework;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


/// <summary>
/// Abuse Filtering API - Business Layer Designed for Forum Topics (Abuse Report) Files. 
/// It support filtering forum topics files based on reported videos for user.
/// </summary>
namespace Jugnoon.Forums
{
    public class AbuseTopics
    {
        public static Task<List<JGN_ForumTopics>> LoadItems(ApplicationDbContext context, ForumTopicEntity entity)
        {
            return ForumTopicBLL.processOptionalConditions(prepareQuery(context, entity), entity)
                   .Select(ForumTopicBLL.prepareSummaryList()).ToListAsync();
        }

        public static Task<int> Count(ApplicationDbContext context, ForumTopicEntity entity)
        {
            return prepareQuery(context, entity).CountAsync();
        }

        private static IQueryable<TopicUserEntity> prepareQuery(ApplicationDbContext context, ForumTopicEntity entity)
        {
            return context.JGN_ForumTopics
              .Join(context.AspNetusers,
                  topic => topic.userid,
                  user => user.Id, (topic, user) => new { topic, user })
              .Join(context.JGN_AbuseReports,
                  topic => topic.topic.id,
                  abusereports => abusereports.contentid, (topic, abusereports) => new TopicUserEntity { topic = topic.topic, user = topic.user, abusereports = abusereports })
              .Where(ForumTopicBLL.returnWhereClause(entity));
        }
    }

}

/*
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.md', which is part of this source code package.
 * Copyright 2007 - 2020 MediaSoftPro
 * For more information email at support@mediasoftpro.com
 */
