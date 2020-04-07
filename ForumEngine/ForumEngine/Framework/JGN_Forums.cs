using Jugnoon.Forums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Jugnoon.Framework
{   
    public partial class JGN_Forums
    {
        [Key]
        public int id { get; set; }
        [MaxLength(200)]
        public string title { get; set; }
        public string description { get; set; }
        public long threads { get; set; }
        public long posts { get; set; }
        public Nullable<long> lastpostid { get; set; }
        public Nullable<System.DateTime> lastposttime { get; set; }
        public byte isenabled { get; set; }
        public byte priority { get; set; }

        [NotMapped]
        public List<JGN_ForumTopics> lastpost { get; set; }

        [NotMapped]
        public string[] categories { get; set; }

        [NotMapped]
        public List<JGN_CategoryContents> category_list { get; set; }
    }
}
