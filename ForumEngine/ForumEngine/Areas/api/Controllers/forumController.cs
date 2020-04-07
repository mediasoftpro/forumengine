using Jugnoon.Forums;
using Jugnoon.Entity;
using System;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using Jugnoon.BLL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Options;
using Jugnoon.Utility;
using Microsoft.Extensions.Caching.Memory;
using Jugnoon.Framework;
using Microsoft.Extensions.Localization;
using ForumEngine.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using Jugnoon.Setup;
using Jugnoon.Settings;
using Jugnoon.Localize;

namespace ForumEngine.Areas.api.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class forumController : ControllerBase
    {
        ApplicationDbContext _context;
        // writable injector configurations specific to videos
        private readonly IWritableOptions<Jugnoon.Forums.Settings.General> _general_options;
        public forumController(
              IOptions<SiteConfiguration> settings,
              IMemoryCache memoryCache,
              ApplicationDbContext context,
              IStringLocalizer<GeneralResource> generalLocalizer,
              IWebHostEnvironment _environment,
              IHttpContextAccessor _httpContextAccessor,
              IWritableOptions<Jugnoon.Forums.Settings.General> general_options,
              IOptions<General> generalSettings,
              IOptions<Features> featureSettings,
              IOptions<Jugnoon.Forums.Settings.General> generalForumSettings
          )
        {
            // readable configuration settings
            Jugnoon.Settings.Configs.GeneralSettings = generalSettings.Value;
            Jugnoon.Settings.Configs.FeatureSettings = featureSettings.Value;
            // content specific settings
            Jugnoon.Forums.Configs.GeneralSettings = generalForumSettings.Value;

            // writable configuration settings
            _general_options = general_options;
            SiteConfig.Config = settings.Value;
            SiteConfig.Cache = memoryCache;
            _context = context;
           
             SiteConfig.generalLocalizer = generalLocalizer;
            SiteConfig.Environment = _environment;
            SiteConfig.HttpContextAccessor = _httpContextAccessor;
        }

        [HttpPost("load")]
        public async Task<ActionResult> load()
        {
            var json = new StreamReader(Request.Body).ReadToEnd();
            var data = JsonConvert.DeserializeObject<ForumEntity>(json);

            var _posts = await ForumBLLC.LoadItems(_context, data);

            /* setup thumb path */
            foreach (var frm in _posts)
            {
                frm.lastpostid = 0;
                frm.lastposttime = DateTime.Now;
            }

            var _records = 0;
            if (data.id == 0)
                _records = await ForumBLLC.Count(_context, data);
            var _categories = new List<JGN_Categories>();
            if (data.loadstats)
            {
                _categories = await CategoryBLL.LoadItems(_context, new CategoryEntity()
                {
                    type = (byte)CategoryBLL.Types.Forum,
                    isenabled = EnabledTypes.All,
                    parentid = -1,
                    order = "level asc", // don't change this
                    issummary = false,
                    isdropdown = true,
                    loadall = true // load all data
                });
            }
            var _settings = new
            {
                general = Jugnoon.Forums.Configs.GeneralSettings
            };
            return Ok(new { posts = _posts, records = _records, categories = _categories, settings = _settings });
        }

        [HttpPost("quickload")]
        public async Task<ActionResult> quickload()
        {
            var data = new ForumEntity()
            {
                loadall = true,
                order = "priority desc"
            };
            var _posts = await ForumBLLC.LoadItems(_context, data);
            
            return Ok(new { posts = _posts });
        }

        [HttpPost("getinfo")]
        public async Task<ActionResult> getinfo()
        {
            var json = new StreamReader(Request.Body).ReadToEnd();
            var data = JsonConvert.DeserializeObject<ForumEntity>(json);

            var _posts = await ForumBLLC.LoadItems(_context, data);
            if (_posts.Count > 0)
            {
                // array of associate category list
                _posts[0].category_list = await CategoryContentsBLL.FetchContentCategoryList(_context, data.id, (byte)CategoryContentsBLL.Types.Forums);
                return Ok(new { status = "success", post = _posts[0] });
            }
            else
            {
                return Ok(new { status = "error", message = SiteConfig.generalLocalizer["_no_records"].Value });
            }
        }

        [HttpPost("proc")]
        public async Task<ActionResult> proc()
        {
            var json = new StreamReader(Request.Body).ReadToEnd();
            var data = JsonConvert.DeserializeObject<JGN_Forums>(json);
            
            var model = data;

            if (model.title != null && model.title.Length < 5)
            {
                return Ok(new { status = "error", message = SiteConfig.generalLocalizer["_invalid_title"].Value });
            }

            if (model.description == null || model.description == "" || model.description.Length < 10)
            {
                return Ok(new { status = "error", message = SiteConfig.generalLocalizer["_invalid_description"].Value });
            }
            
            var frm = new JGN_Forums();
           
            frm.id = model.id;
            frm.title = model.title;
            frm.description = model.description;
            frm.categories = model.categories;
            frm.priority = (byte)model.priority;
            frm.isenabled = 1; 

            frm = await ForumBLLC.Process(_context, frm);

            return Ok(new { status = "success", record = frm, message = SiteConfig.generalLocalizer["_record_created"].Value });
        }


        [HttpPost("action")]
        public async Task<ActionResult> action()
        {
            var json = new StreamReader(Request.Body).ReadToEnd();
            var data = JsonConvert.DeserializeObject<List<ForumEntity>>(json);

            await ForumBLLC.ProcessAction(_context, data);

            return Ok(new { status = "success", message = SiteConfig.generalLocalizer["_records_processed"].Value });
        }

        #region Update Configuration API Calls

        [HttpPost("configs_general")]
        public ActionResult configs_general()
        {
            var json = new StreamReader(Request.Body).ReadToEnd();
            var data = JsonConvert.DeserializeObject<Jugnoon.Forums.Settings.General>(json);

            _general_options.Update(opt =>
            {
                opt.enable_public_topics = data.enable_public_topics;
            });

            return Ok(new
            {
                status = 200
            });
        }
        #endregion
    }
}

/*
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.md', which is part of this source code package.
 * Copyright 2007 - 2020 MediaSoftPro
 * For more information email at support@mediasoftpro.com
 */
