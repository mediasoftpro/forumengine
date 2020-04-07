using Jugnoon.Forums;
using Jugnoon.Framework;
using Jugnoon.Models;
using System.Collections.Generic;

namespace Jugnoon.Forums.Models
{
    public class TopicListViewModel : ListViewModel
    {      

        public long TopicID { get; set; }

        public string TopicTitle { get; set; }

        public ForumTopicEntity QueryOptions { get; set; }

        public List<JGN_ForumTopics> Topics { get; set; }

        public int ForumID { get; set; }

        public string ForumTitle { get; set; }

        public int TotalRecords { get; set; }

        public bool isAdmin { get; set; }

        public string DetailMessage { get; set; }

        public bool isAllowed { get; set; }

        public bool DisablePost { get; set; }
    }
}

/*
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.md', which is part of this source code package.
 * Copyright 2007 - 2020 MediaSoftPro
 * For more information email at support@mediasoftpro.com
 */
