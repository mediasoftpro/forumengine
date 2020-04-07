using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Jugnoon.Framework;
using Jugnoon.Utility;


namespace Jugnoon.Forums.Models
{
    public class PostTopicViewModel
    {
        public long TopicID { get; set; }

        public long ReplyID { get; set; }

        public long GroupID { get; set; }

        public string UserName { get; set; }

        public string HeadingTitle { get; set; }

        public bool PostAccess { get; set; }

        public string PostMessage { get; set; }

        public bool isAdmin { get; set; }

        public bool showTitle { get; set; }

        public bool showTags { get; set; }

        public bool showForumOption { get; set; }

        [Display(Name = "Title")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Content Required")]
        [Display(Name = "Description")]

        public string Description { get; set; }
                
        public string Tags { get; set; }

        public int ForumID { get; set; }
        
        public List<JGN_Forums> ForumList { get; set; }
           
        public string Message { get; set; }

        public AlertTypes AlertType { get; set; }
    }
}

/*
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.md', which is part of this source code package.
 * Copyright 2007 - 2020 MediaSoftPro
 * For more information email at support@mediasoftpro.com
 */
