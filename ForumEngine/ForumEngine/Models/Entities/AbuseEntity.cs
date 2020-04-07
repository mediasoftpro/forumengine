﻿using Jugnoon.BLL;
namespace Jugnoon.Entity
{
    public class AbuseEntity : ContentEntity
    {
        public long contentid { get; set; } = 0;
        public AbuseReport.Types type { get; set; } = AbuseReport.Types.Forums;

        public AbuseReport.Status status { get; set; } = AbuseReport.Status.All;
    }
}

/*
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.md', which is part of this source code package.
 * Copyright 2007 - 2020 MediaSoftPro
 * For more information email at support@mediasoftpro.com
 */

