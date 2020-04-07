using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Jugnoon.Models;

namespace Jugnoon.Framework
{
    public partial class JGN_ForumTopics
    {
        [Key]
        public long id { get; set; }
        public int forumid { get; set; }
        [MaxLength(200)]
        public string title { get; set; }
        public string description { get; set; }
        [MaxLength(300)]
        public string tags { get; set; }
        [MaxLength(100)]
        public string userid { get; set; }
        public int views { get; set; }
        public int replies { get; set; }
        public byte isenabled { get; set; }
        public byte isapproved { get; set; }
        public byte isadult { get; set; }
        public int liked { get; set; }
        public int disliked { get; set; }
        public long replyid { get; set; }
        public byte isresolved { get; set; }
        public byte type { get; set; }
        public byte islocked { get; set; }
        public System.DateTime created_at { get; set; }
        public System.DateTime lastpostdate { get; set; }
        [MaxLength(100)]
        public string lastpostuserid { get; set; }
        public long resolvedpostid { get; set; }
        public long contentid { get; set; }
        public byte contenttype { get; set; }
        [NotMapped]
        public string forum_title { get; set; }
       
        [NotMapped]
        public string url { get; set; }
        [NotMapped]
        public string img_url { get; set; }
        [NotMapped]
        public string author_url { get; set; }

        [NotMapped]
        public ApplicationUser author { get; set; }

        [NotMapped]
        public JGN_Forums forums { get; set; }

        [NotMapped]
        public string isadmin { get; set; }
    }
}
