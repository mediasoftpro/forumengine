﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ForumEngine.Controllers
{
    [Authorize(Roles = "Admin")]
    public class adminController : Controller
    {
        public adminController()
        { }

        public IActionResult Index()
        {
            return View();
        }
    }
}

/*
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.md', which is part of this source code package.
 * Copyright 2007 - 2020 MediaSoftPro
 * For more information email at support@mediasoftpro.com
 */
