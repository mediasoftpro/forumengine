using System;
using Microsoft.AspNetCore.Mvc;
using Jugnoon.Utility;
using Jugnoon.Forums;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Localization;
using Jugnoon.Framework;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using Jugnoon.Settings;
using Jugnoon.Forums.Models;
using Jugnoon.Localize;

namespace ForumEngine.Controllers
{
    public class forumController : Controller
    {
        ApplicationDbContext _context;
        public forumController(
           IOptions<SiteConfiguration> settings,
           IMemoryCache memoryCache,
           ApplicationDbContext context,
           IStringLocalizer<GeneralResource> generalLocalizer,
           IStringLocalizer<ForumResource> forumLocalizer,
           IWebHostEnvironment _environment,
           IHttpContextAccessor _httpContextAccessor,
           IOptions<General> generalSettings,
           IOptions<Media> mediaSettings,
           IOptions<Features> featureSettings,
           IOptions<Smtp> smtpSettings,
           IOptions<Jugnoon.Forums.Settings.General> generalForumSettings
           )
        {
            _context = context;
            // readable settings (global)
            Jugnoon.Settings.Configs.GeneralSettings = generalSettings.Value;
            Jugnoon.Settings.Configs.FeatureSettings = featureSettings.Value;
            Jugnoon.Settings.Configs.MediaSettings = mediaSettings.Value;
            Jugnoon.Settings.Configs.SmtpSettings = smtpSettings.Value;
            // readable settings (content specific)
            Jugnoon.Forums.Configs.GeneralSettings = generalForumSettings.Value;

            SiteConfig.Config = settings.Value;
            SiteConfig.Cache = memoryCache;
            SiteConfig.generalLocalizer = generalLocalizer;
            SiteConfig.forumLocalizer = forumLocalizer;
            SiteConfig.Environment = _environment;
            SiteConfig.HttpContextAccessor = _httpContextAccessor;
        }

        #region Listing
        // GET: forums
        public async Task<IActionResult> Index(int? fid, string title, int? id)
        {
            ViewBag.ForumTabCss = "active";

            int pagenumber = 1;
            if (id != null)
                pagenumber = (int)id;
            if (fid == null || title == null)
            {
                return Redirect(Config.GetUrl("forums"));
            }

            string forum = title.Trim().ToLower();
            string forum_title = UtilityBLL.UppercaseFirst(UtilityBLL.ReplaceHyphinWithSpace(forum), true);
            int forumid = Convert.ToInt32(fid);

            /* List Initialization */
            var ListEntity = new ForumTopicsListViewModel()
            {
                ForumID = forumid,
                isListStatus = false,
                QueryOptions = new ForumTopicEntity()
                {
                    issummary = false,
                    loadall = false,
                    pagenumber = (int)pagenumber,
                    term = "",
                    iscache = true,
                    ispublic = true,
                    pagesize = 20,
                    type = 2, // all
                    order = "topic.created_at desc",
                    forumid = forumid
                },
                ListObject = new Jugnoon.Scripts.ListItems()
                {
                    ListType = Jugnoon.Scripts.ListType.List, // 0: grid 1: list
                },
                DefaultUrl = Config.GetUrl("forum/" + fid + "/" + title),
                PaginationUrl = Config.GetUrl("forum/" + fid + "/" + title + "/[p]/"),
                NoRecordFoundText = SiteConfig.generalLocalizer["_no_records"].Value,
                HeadingTitle = forum_title
            };
            ListEntity.Records = await ForumTopicBLL.Count(_context, ListEntity.QueryOptions);
            if(ListEntity.Records > 0)
            {
               ListEntity.Data = await ForumTopicBLL.LoadItems(_context, ListEntity.QueryOptions);
            }

            /* Page Title Adjustment */
            string _title = forum_title;
            if (pagenumber > 1)
            {
                _title = _title + " - Page: " + pagenumber;
            }

            ViewBag.title = _title;


            return View(ListEntity);
        }

        // GET: forum/tag
        public IActionResult tag(string title, int? pagenumber)
        {

            if (title == null)
            {
                return Redirect(Config.GetUrl("forum/"));
            }
            if (pagenumber == null)
                pagenumber = 1;

            string _term = UtilityBLL.ReplaceHyphinWithSpace(title);
            string categoryName = UtilityBLL.UppercaseFirst(_term);

            /* List Initialization */
            var ListEntity = new ForumTopicsListViewModel()
            {
                isListStatus = false,
                QueryOptions = new ForumTopicEntity()
                {
                    pagenumber = (int)pagenumber,
                    tags = _term,
                    iscache = false,
                    ispublic = true,
                    pagesize = 20,
                    order = "topic.created_at desc",
                },
                ListObject = new Jugnoon.Scripts.ListItems()
                {
                    ListType = Jugnoon.Scripts.ListType.List, // 0: grid 1: list
                },
                DefaultUrl = Config.GetUrl("forum/tag/" + title + "/"),
                PaginationUrl = Config.GetUrl("forum/tag/" + title + "/[p]/"),
                NoRecordFoundText = SiteConfig.generalLocalizer["_no_records"].Value,
            };

            // Page Title
            string _title = SiteConfig.forumLocalizer["forums_tag_title"].ToString().Replace("{TG}", categoryName);
          
            if (pagenumber > 1)
            {
                _title = _title + " - Page: " + pagenumber;
            }

            ViewBag.title= _title;

            return View(ListEntity);
        }

        // GET: forum/archive
        public IActionResult archive(int month, int year, int? pagenumber)
        {
            if (pagenumber == null)
                pagenumber = 1;

            string monthname = UtilityBLL.ReturnMonthName(month);

            /* List Initialization */
            var ListEntity = new ForumTopicsListViewModel()
            {
                isListStatus = false,
                QueryOptions = new ForumTopicEntity()
                {
                    pagenumber = (int)pagenumber,
                    term = "",
                    month = month,
                    year =  year,
                    iscache = true,
                    ispublic = true,
                    pagesize = 20,
                    order = "topic.created_at desc",
                },
                ListObject = new Jugnoon.Scripts.ListItems()
                {
                    ListType = Jugnoon.Scripts.ListType.List, // 0: grid 1: list
                },
                DefaultUrl = Config.GetUrl("forum/archive/" + month + "/" + year + "/"),
                PaginationUrl = Config.GetUrl("forum/archive/" + month + "/" + year + "/[p]/"),
                NoRecordFoundText = SiteConfig.generalLocalizer["_no_records"].Value,
            };

            // Page Title
            string _title = SiteConfig.forumLocalizer["forums_archive_default_title"].ToString().Replace("{MN}", monthname).Replace("{YR}", year.ToString());
          
            if (pagenumber > 1)
            {
                _title = _title + " - Page: " + pagenumber;
            }

            ViewBag.title= _title;

            return View(ListEntity);
        }

        // GET: forum/archivelist
        public IActionResult archivelist()
        {
            ViewBag.title= SiteConfig.forumLocalizer["forum_archivelist_title"];

            return View();
        }

        // GET: forum/taglist
        public IActionResult taglist()
        {
            ViewBag.title= SiteConfig.forumLocalizer["forum_tags_home_title"];
            return View();
        }
        #endregion

        #region Search

        // GET: forum/search
        public IActionResult search()
        {
            return View();
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
