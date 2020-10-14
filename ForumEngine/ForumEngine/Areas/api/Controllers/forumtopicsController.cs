using Jugnoon.Forums;
using System.Collections.Generic;
using System.IO;
using Jugnoon.Utility;
using Jugnoon.Scripts;
using Newtonsoft.Json;
using Jugnoon.BLL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Caching.Memory;
using Jugnoon.Framework;
using Microsoft.AspNetCore.Identity;
using Jugnoon.Models;
using Microsoft.Extensions.Localization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using ForumEngine.Models;
using System.Threading.Tasks;
using Jugnoon.Settings;
using System;
using Jugnoon.Localize;

namespace ForumEngine.Areas.api.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class forumtopicsController : ControllerBase
    {
        ApplicationDbContext _context;
        public forumtopicsController(
             IOptions<SiteConfiguration> settings,
             IMemoryCache memoryCache,
             ApplicationDbContext context,
             UserManager<ApplicationUser> userManager,
             RoleManager<ApplicationRole> roleManager,
             IStringLocalizer<GeneralResource> generalLocalizer,
             IWebHostEnvironment _environment,
             IHttpContextAccessor _httpContextAccessor,
             IOptions<General> generalSettings,
             IOptions<Features> featureSettings,
             IOptions<Smtp> smtpSettings,
             IOptions<Registration> registerSettings,
             IOptions<Jugnoon.Forums.Settings.General> generalForumSettings
         )
        {
            // readable settings
            Jugnoon.Settings.Configs.GeneralSettings = generalSettings.Value;
            Jugnoon.Settings.Configs.FeatureSettings = featureSettings.Value;
            Jugnoon.Settings.Configs.SmtpSettings = smtpSettings.Value;
            Jugnoon.Settings.Configs.RegistrationSettings = registerSettings.Value;
            // content specific settings
            Jugnoon.Forums.Configs.GeneralSettings = generalForumSettings.Value;

            SiteConfig.Config = settings.Value;
            SiteConfig.Cache = memoryCache;
            _context = context;
           
            SiteConfig.userManager = userManager;
            SiteConfig.roleManager = roleManager;
             SiteConfig.generalLocalizer = generalLocalizer;
            SiteConfig.Environment = _environment;
            SiteConfig.HttpContextAccessor = _httpContextAccessor;
        }
        [HttpPost("load")]
        public async Task<ActionResult> load()
        {            
            var json = new StreamReader(Request.Body).ReadToEnd();
            var data = JsonConvert.DeserializeObject<ForumTopicEntity>(json);
            data.isdropdown = false;
            data.issummary = false;
            var _posts = await ForumTopicBLL.LoadItems(_context, data);
            /* setup thumb path */
            foreach (var topic in _posts)
            {
                topic.url = Forum_Urls.Prepare_Topic_Url(topic.id, topic.title, false);
                topic.author_url = UserUrlConfig.ProfileUrl(topic.author, Jugnoon.Settings.Configs.RegistrationSettings.uniqueFieldOption);
            }
            var _records = 0;
            if (data.id == 0)
                _records = await ForumTopicBLL.Count(_context, data);

            var _settings = new
            {
                general = Jugnoon.Forums.Configs.GeneralSettings
            };
            return Ok(new { posts = _posts, records = _records, settings = _settings });
        }

        [HttpPost("load_reports")]
        public async Task<ActionResult> load_reports()
        {
            var json = new StreamReader(Request.Body).ReadToEnd();
            var data = JsonConvert.DeserializeObject<ForumTopicEntity>(json);
            var _reports = await ForumTopicBLL.LoadReport(_context, data);
            return Ok(new { data = _reports });
        }


        [HttpPost("generate_report")]
        public async Task<ActionResult> generate_report()
        {
            var json = new StreamReader(Request.Body).ReadToEnd();
            var data = JsonConvert.DeserializeObject<ForumTopicEntity>(json);
            var _reports = await ForumReports.GenerateReport(_context, data);
            return Ok(new { data = _reports });
        }

        [HttpPost("getinfo")]
        public async Task<ActionResult> getinfo()
        {
            var json = new StreamReader(Request.Body).ReadToEnd();
            var data = JsonConvert.DeserializeObject<ForumTopicEntity>(json);
            
            int pagesize = 10;
            int TotalRecords = await ForumTopicBLL.Count(_context, new ForumTopicEntity()
            {
                id = data.id,
                isenabled = EnabledTypes.All,
                isapproved = ApprovedTypes.All,
                loadall = true

            });
            if (TotalRecords == 0)
            {
                return Ok(new { status = "error", message = SiteConfig.generalLocalizer["_no_records"].Value });
            }

            bool DisablePost = false;

            var _lst = await ForumTopicBLL.LoadItems(_context, new ForumTopicEntity()
            {
                id = data.id,
                loadall = true,
                pagenumber = data.pagenumber,
                pagesize = pagesize,
                iscache = false,
                singlepost = false
            });

            foreach(var topic in _lst)
            {
                topic.img_url = UserUrlConfig.ProfilePhoto(topic.userid, topic.author.picturename, 0);
            }

            return Ok(new { status = "success", posts = _lst, disable = DisablePost, total = TotalRecords });
        }

        [HttpPost("getinfo_acc")]
        public async Task<ActionResult> getinfo_acc()
        {
            var json = new StreamReader(Request.Body).ReadToEnd();
            var data = JsonConvert.DeserializeObject<ForumTopicEntity>(json);
            
            var _lst = await ForumTopicBLL.LoadItems(_context, new ForumTopicEntity()
            {
                id = data.id,
                iscache = false,
                singlepost = true
            });

            if (_lst.Count == 0)
                return Ok(new { status = "error", message = SiteConfig.generalLocalizer["_no_records"].Value });

            foreach (var topic in _lst)
            {
                topic.img_url = UserUrlConfig.ProfilePhoto(topic.userid, topic.author.picturename, 0);
            }

            return Ok(new { status = "success", post = _lst[0] });
        }

        [HttpPost("proc")]
        public async Task<ActionResult> proc()
        {
            var json = new StreamReader(Request.Body).ReadToEnd();
            var model = JsonConvert.DeserializeObject<JGN_ForumTopics>(json);
            
            // new topic posted
            if (model.replyid == 0)
            {
                // check title
                if (model.title.Length < 5)
                {
                    return Ok(new { status = "error", message = SiteConfig.generalLocalizer["_invalid_title"].Value });
                }
            }

            // Add information in table
            var topics = new JGN_ForumTopics();
            if (model.id > 0)
                topics.id = model.id;

            string content = UGeneral.SanitizeText(model.description);
            topics.description = content;
            topics.title = model.title;
            if (topics.title.Length > 200)
                topics.title = topics.title.Substring(0, 199);
            topics.tags = model.tags;
            topics.forumid = model.forumid;
            topics.userid = model.userid;
            int isapproved = 1;
            topics.isapproved = (byte)isapproved;
            topics.isenabled = 1;
            topics.replyid = model.replyid;
                        

            topics = await ForumTopicBLL.Process(_context, topics, true);
            if (model.tags != "" && model.replyid == 0 && model.id == 0)
            {
                // Process tags
                TagsBLL.Process_Tags(_context, model.tags, TagsBLL.Types.Forums, 0);
            }


            // Mail Procesing Section
            if (model.id == 0 && model.replyid == 0)
            {
                 //  ProcessMail(tid, topics.replyid, topics.username, model.GroupID, model.Description, model.Title);
                // add newly added topic id in struct for user activity and group posting
                //topics.id = topics.id;

            }

            topics.url = Forum_Urls.Prepare_Topic_Url(topics.id, topics.title, true);
            topics.author_url = UserUrlConfig.ProfileUrl(topics.author, Jugnoon.Settings.Configs.RegistrationSettings.uniqueFieldOption);

            return Ok(new { status = "success", record = topics, message = SiteConfig.generalLocalizer["_record_created"].Value });
        }

        [HttpPost("authorize_author")]
        public ActionResult authorize_author()
        {
            var json = new StreamReader(Request.Body).ReadToEnd();
            var data = JsonConvert.DeserializeObject<JGN_ForumTopics>(json);
            var isaccess = ForumTopicBLL.Check(_context, data.id, data.userid);
            return Ok(new { isaccess = isaccess });
        }

        [HttpPost("action")]
        public async Task<ActionResult> action()
        {

            var json = new StreamReader(Request.Body).ReadToEnd();
            var data = JsonConvert.DeserializeObject<List<ForumTopicEntity>>(json);
            
            await ForumTopicBLL.ProcessAction(_context, data);

            return Ok(new { status = "success", message = SiteConfig.generalLocalizer["_records_processed"].Value });
        }
   
    }
}

/*
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.md', which is part of this source code package.
 * Copyright 2007 - 2020 MediaSoftPro
 * For more information email at support@mediasoftpro.com
 */

