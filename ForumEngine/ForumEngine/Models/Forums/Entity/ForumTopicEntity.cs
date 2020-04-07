using System;
using Jugnoon.Entity;

namespace Jugnoon.Forums
{
    public class ForumTopicEntity : ContentEntity
    {
        public int forumid { get; set; } = 0;
        public long replyid { get; set; } = 0;
        public long resolvedpostid { get; set; } = 0;
        public ResolvedActions isresolved { get; set; } = ResolvedActions.Open;
        public int type { get; set; } = 0;
        public LockedActions islocked { get; set; } = LockedActions.Open;
        public DateTime posteddate { get; set; } = DateTime.Now;
        public bool loadallposts { get; set; } = false;
        public bool onlytopics { get; set; } = false;

        public bool singlepost { get; set; } = false;

    }
}


/*
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.md', which is part of this source code package.
 * Copyright 2007 - 2020 MediaSoftPro
 * For more information email at support@mediasoftpro.com
 */

