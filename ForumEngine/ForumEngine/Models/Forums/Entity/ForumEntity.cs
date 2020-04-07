using System;
using Jugnoon.Entity;

namespace Jugnoon.Forums
{
    public class ForumEntity : ContentEntity
    {
        public long lastpostid { get; set; } = 0;
        public DateTime lastposttime { get; set; } = DateTime.Now;
    }
}


/*
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.md', which is part of this source code package.
 * Copyright 2007 - 2020 MediaSoftPro
 * For more information email at support@mediasoftpro.com
 */

