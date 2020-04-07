using System.Collections.Generic;
using Jugnoon.Framework;
using Jugnoon.Models;

namespace Jugnoon.Forums.Models
{
    public class ForumsListModel
    {        
        public List<ForumItem> Data { get; set; }
        public List<BreadItem> BreadItems { get; set; }

    }

    public class ForumItem
    {
        public int Type { get; set; }
        public string Title { get; set; }
        public string Term { get; set; }
        public List<JGN_Forums> ForumList { get; set; }
    }
}

/*
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.md', which is part of this source code package.
 * Copyright 2007 - 2020 MediaSoftPro
 * For more information email at support@mediasoftpro.com
 */
