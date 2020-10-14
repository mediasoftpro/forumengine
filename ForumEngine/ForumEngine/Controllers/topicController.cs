using Microsoft.AspNetCore.Mvc;
using Jugnoon.Utility;
using Jugnoon.Forums;
using Jugnoon.Settings;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Localization;
using Jugnoon.Framework;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using ForumEngine.Models;
using System.Net;
using System.Threading.Tasks;
using Jugnoon.Forums.Models;
using Jugnoon.Localize;

namespace ForumEngine.Controllers
{
    public class topicController : Controller
    {
        ApplicationDbContext _context;
        public topicController(
           IOptions<SiteConfiguration> settings,
           IMemoryCache memoryCache,
           ApplicationDbContext context,
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
            // general settings
            Jugnoon.Settings.Configs.GeneralSettings = generalSettings.Value;
            Jugnoon.Settings.Configs.FeatureSettings = featureSettings.Value;
            Jugnoon.Settings.Configs.SmtpSettings = smtpSettings.Value;
            Jugnoon.Settings.Configs.MediaSettings = mediaSettings.Value;
            // content specific
            Jugnoon.Forums.Configs.GeneralSettings = generalForumSettings.Value;

            SiteConfig.Config = settings.Value;
            SiteConfig.Cache = memoryCache;
            SiteConfig.forumLocalizer = forumLocalizer;
            SiteConfig.Environment = _environment;
            SiteConfig.HttpContextAccessor = _httpContextAccessor;
        }
        // GET: topic
        public async Task<IActionResult> Index(long? tid, string title, int? id)
        {
            int pagenumber = 1;
            if (id != null)
                pagenumber = (int)id;

            if (tid == null)
            {
                return Redirect(Config.GetUrl("forums"));
            }
            
            var model = new TopicListViewModel();
            model.isAllowed = true;
            model.isAdmin = false;
            model.DisablePost = false;

            if (title != "")
                model.TopicTitle = UtilityBLL.UppercaseFirst(UtilityBLL.ReplaceHyphinWithSpace(title), true);
            else
                model.TopicTitle = "default-topic";


            model.TopicID = (long)tid;

            model.QueryOptions = new ForumTopicEntity() {
                pagenumber = pagenumber,
                pagesize = Jugnoon.Settings.Configs.GeneralSettings.pagesize
            };
           
            model.TotalRecords = await ForumTopicPostsBLL.Count(_context, new ForumTopicEntity()
            {
                id = model.TopicID,
                ispublic = true,
                loadall = true

            });
            if (model.TotalRecords == 0)
            {
                model.isAllowed = false;
                model.DetailMessage = SiteConfig.forumLocalizer["norecordfound"].Value;
                return View(model);
            }
            model.DisablePost = false;
            
            var _lst = await ForumTopicPostsBLL.LoadItems(_context, new ForumTopicEntity()
            {
                id = model.TopicID,
                loadall = true,
                pagenumber = model.QueryOptions.pagenumber,
                pagesize = model.QueryOptions.pagesize,
                singlepost =false
            });
            if (_lst.Count > 0)
            {
                if (_lst[0].isadult == 1)
                {
                    // 1:-> adult content, 0:-> non adult content
                    var getValue = HttpContext.Session.GetString("adultmember");
                    if (getValue == null)
                    {
                        string surl = Forum_Urls.Prepare_Topic_Url(_lst[0].id, _lst[0].title, false);
                        return Redirect(Config.GetUrl("home/validateadult?surl=" + WebUtility.UrlEncode(surl) + ""));
                    }
                }
               
                // increment views
                await ForumTopicBLL.Increment_Views(_context, model.TopicID, _lst[0].views);
                // other settings
                model.ForumID = _lst[0].forumid;
                string forumtitle = _lst[0].forum_title;
                model.ForumTitle = forumtitle;
                // load topic and posts
                model.Topics = _lst;
             
                model.DefaultUrl = "topic/" + model.TopicID + "/" + title;
                model.PaginationUrl = "topic/" + model.TopicID + "/" + title + "/[p]";

                string _title = _lst[0].title;
                if (model.QueryOptions.pagenumber > 1)
                    _title = _title + " Page: " + model.QueryOptions.pagenumber;
                string _desc = UtilityBLL.StripHTML(_lst[0].description);
                if (_desc.Length > 80)
                    _desc = _desc.Substring(0, 80);

                model.HeadingTitle = _title;
                ViewBag.title= _title;
                ViewBag.description = _desc;
            }
            else
            {
                model.isAllowed = false;
                model.DetailMessage = SiteConfig.forumLocalizer["norecordfound"].Value;
                return View(model);
            }
            return View(model);
        }

        public async Task<IActionResult> post(long? id)
        {
            if (id == null)
            {
                return Redirect(Config.GetUrl("forums"));
            }

            var model = new TopicListViewModel();
            model.isAllowed = true;
            model.isAdmin = false;
            model.DisablePost = true;

            model.TopicTitle = ForumTopicBLL.Return_Value(_context, (long)id, "title");
            
            model.TopicID = (long)id;
            model.QueryOptions = new ForumTopicEntity()
            {
                singlepost = true,
                id = model.TopicID,
                ispublic = true,
                loadall = true,
                pagenumber = 1
            };
                     

            model.DisablePost = false;
            var _lst = await ForumTopicPostsBLL.LoadItems(_context, model.QueryOptions);

            if (_lst.Count > 0)
            {
                /*if (_lst[0].isadult == 1)
                {
                    // 1:-> adult content, 0:-> non adult content
                    if (Session["adultmember"] == null)
                    {
                        string surl = Forum_Urls.Prepare_Topic_Url(_lst[0].topicid, _lst[0].title, false);
                        return Redirect(Config.GetUrl("home/validateadult?surl=" + WebUtility.UrlEncode(surl) + ""));
                    }
                }*/
                // increment views
                await ForumTopicBLL.Increment_Views(_context, model.TopicID, _lst[0].views);
                // other settings
                int forumid = _lst[0].forumid;
                string forumtitle =  _lst[0].forum_title;
                model.ForumTitle = forumtitle;
                // load topic and posts
                model.Topics = _lst;
                                
                string _title = _lst[0].title + " Post: " + model.TopicID;

                string _desc = UtilityBLL.StripHTML(_lst[0].description);
                if (_desc.Length > 80)
                    _desc = _desc.Substring(0, 80);

                model.HeadingTitle = _title;

                ViewBag.title = _title;
                ViewBag.description = _desc + " Post: " + model.TopicID;

            }
            else
            {
                model.isAllowed = false;
                model.DetailMessage = SiteConfig.forumLocalizer["norecordfound"].Value;
                return View(model);
            }

            return View(model);
        }
    }
}

/*
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.md', which is part of this source code package.
 * Copyright 2007 - 2020 MediaSoftPro
 * For more information email at support@mediasoftpro.com
 */
