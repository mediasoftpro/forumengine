using Jugnoon.Framework;
using Jugnoon.Models;
using System.Collections.Generic;

namespace Jugnoon.Forums.Models
{
    public class ForumTopicsListViewModel : ListViewModel
    {
        public int ForumID { get; set; }

        public ForumTopicEntity QueryOptions { set; get; }

        public List<JGN_ForumTopics> Data { set; get; }

        public int Records { get; set; }
        
    }
}

/*
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.md', which is part of this source code package.
 * Copyright 2007 - 2020 MediaSoftPro
 * For more information email at support@mediasoftpro.com
 */
