﻿
using Microsoft.AspNetCore.Mvc;
using Jugnoon.Utility;
using Jugnoon.BLL;
using System.Text;
using Jugnoon.Entity;
using Jugnoon.Settings;
using Jugnoon.Scripts;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Localization;
using Jugnoon.Framework;
using Microsoft.AspNetCore.Identity;
using Jugnoon.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using Jugnoon.Forums.Models;
using Jugnoon.Attributes;
using Jugnoon.Localize;

namespace ForumEngine.Controllers
{
    public class userController : Controller
    {
        ApplicationDbContext _context;
        public userController(
           IOptions<SiteConfiguration> settings,
           IMemoryCache memoryCache,
           ApplicationDbContext context,
           UserManager<ApplicationUser> userManager,
           IStringLocalizer<GeneralResource> generalLocalizer,
           IWebHostEnvironment _environment,
           IHttpContextAccessor _httpContextAccessor,
           IOptions<General> generalSettings,
           IOptions<Media> mediaSettings,
           IOptions<Features> featureSettings,
           IOptions<Registration> registerSettings
           )
        {
            _context = context;

            // general settings
            Jugnoon.Settings.Configs.GeneralSettings = generalSettings.Value;
            Jugnoon.Settings.Configs.FeatureSettings = featureSettings.Value;
            Jugnoon.Settings.Configs.RegistrationSettings = registerSettings.Value;
            Jugnoon.Settings.Configs.MediaSettings = mediaSettings.Value;

            SiteConfig.Config = settings.Value;
            SiteConfig.Cache = memoryCache;
           
            SiteConfig.userManager = userManager;
             SiteConfig.generalLocalizer = generalLocalizer;
           
            SiteConfig.Environment = _environment;
            SiteConfig.HttpContextAccessor = _httpContextAccessor;
        }

        // GET: user
        public async Task<IActionResult> Index(string username, string status = null, string uid = null)
        {
            var model = new UserModelView();
            model.ActiveIndex = 0;

            if (!InitProfile(model, username))
            {
                return Redirect(Config.GetUrl() + "signin?ReturnUrl=" + Config.GetUrl(username));
            }

            // fetch profile user information
            var query = new MemberEntity()
            {
                ispublic = true,
                loadall = true
            };

            if (Jugnoon.Settings.Configs.RegistrationSettings.uniqueFieldOption == 0)
                query.username = model.UserName;
            else
                query.userid = model.UserName;

            var userInfo = await UserProfileBLL.LoadItems(_context, query);

            if (userInfo.Count > 0)
            {
                // increment user views
                int _views = userInfo[0].views + 1;
                UserBLL.Update_Field_Id(_context, userInfo[0].Id, "views", _views);

                model.user = userInfo[0];

                model.Nav = new NavModelView()
                {
                    username = model.user.Id,
                    ActiveIndex = 100,
                    ShowForumPosts = getValue(model.user.stats.stat_forum_topics),
                    CountTopics = model.user.stats.stat_forum_topics
                };

                model.UserInfo = prepare_user_info(model);

                model.FullName = UserUrlConfig.PrepareUserName(model.user, Jugnoon.Settings.Configs.RegistrationSettings.uniqueFieldOption);


                model.forumtopics = new ForumTopicsListViewModel()
                {
                    BrowseText = SiteConfig.generalLocalizer["_see_all"].Value,
                    HeadingTitle = model.FullName + " " + SiteConfig.generalLocalizer["_forum_topics"].Value,
                    ListObject = new ListItems()
                    {
                        showViews = true,
                        showDate = true
                    },
                    BrowseUrl = Config.GetUrl("user/forums/" + model.UserName),
                    QueryOptions = new Jugnoon.Forums.ForumTopicEntity()
                    {
                        userid = model.user.Id,
                        order = "topic.created_at desc",
                        ispublic = true,
                        pagesize = 6
                    }
                };

                ViewBag.title= model.FullName + "'s " + SiteConfig.generalLocalizer["_profile"].Value;
                ViewBag.description = ViewBag.title+ ", info: " + model.UserInfo + ", date joined: " + model.user.created_at;
            }
            else
            {
                model.UserExist = false;
            }
            return View(model);
        }

        private bool InitProfile(UserModelView model, string username)
        {
            if (username == null || username.ToLower() == "index")
            {
                if (User.Identity.IsAuthenticated)
                {
                    if (Jugnoon.Settings.Configs.RegistrationSettings.uniqueFieldOption == 0)
                        model.UserName = SiteConfig.userManager.GetUserName(User);
                    else
                        model.UserName = SiteConfig.userManager.GetUserId(User);

                    model.OwnProfile = true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                // user key provided
                model.UserName = username;
                if (User.Identity.IsAuthenticated)
                {
                    if (Jugnoon.Settings.Configs.RegistrationSettings.uniqueFieldOption == 0)
                    {
                        // check based on username
                        if (model.UserName == SiteConfig.userManager.GetUserName(User))
                            model.OwnProfile = true;
                    }
                    else
                    {
                        // check based on userid
                        if (model.UserName == SiteConfig.userManager.GetUserId(User))
                            model.OwnProfile = true;
                    }
                }
            }

            return true;
        }


        private bool getValue(int value)
        {
            if (value > 0)
                return true;
            else
                return false;
        }


        public async Task<IActionResult> profile(string username)
        {
            var model = new UserModelView();
            model.ActiveIndex = 10; // profile section

            if (!InitProfile(model, username))
            {
                return Redirect(Config.GetUrl() + "signin?ReturnUrl=" + Config.GetUrl(username));
            }

            if (!InitProfile(model, username))
            {
                return Redirect(Config.GetUrl() + "signin?ReturnUrl=" + Config.GetUrl(username));
            }

            // fetch profile user information
            var query = new MemberEntity()
            {
                ispublic = true,
                loadall = true
            };

            if (Jugnoon.Settings.Configs.RegistrationSettings.uniqueFieldOption == 0)
                query.username = model.UserName;
            else
                query.userid = model.UserName;


            var userInfo = await UserProfileBLL.LoadItems(_context, query);

            if (userInfo.Count > 0)
            {
                model.user = userInfo[0];
                // load dynamic attributes
                model.attr_values = await AttrValueBLL.LoadItems(_context, new AttrValueEntity()
                {
                    userid = model.user.Id,
                    attr_type = Attr_Type.UserProfile,
                    order = "priority desc",
                    nofilter = false
                });


                model.UserInfo = prepare_user_info(model);

                model.FullName = UserUrlConfig.PrepareUserName(model.user, Jugnoon.Settings.Configs.RegistrationSettings.uniqueFieldOption);

                model.Nav = new NavModelView()
                {
                    username = model.UserName,
                    ActiveIndex = 100,
                };
            }
            else
            {
                model.UserExist = false;
            }


            ViewBag.title = model.FullName + "'s " + SiteConfig.generalLocalizer["_profile_detail"].Value;

            return View(model);
        }

   
        public async Task<IActionResult> topics(string username, int? pagenumber)
        {
            if (pagenumber == null)
                pagenumber = 1;

            var model = new UserModelView();
            model.ActiveIndex = 8;
            
            if (!InitProfile(model, username))
            {
                return Redirect(Config.GetUrl() + "signin?ReturnUrl=" + Config.GetUrl(username));
            }

            // fetch profile user information
            var query = new MemberEntity()
            {
                ispublic = true,
                loadall = true
            };

            if (Jugnoon.Settings.Configs.RegistrationSettings.uniqueFieldOption == 0)
                query.username = model.UserName;
            else
                query.userid = model.UserName;


            var userInfo = await UserProfileBLL.LoadItems(_context, query);
            if (userInfo.Count > 0)
            {
                model.user = userInfo[0];

                model.UserInfo = prepare_user_info(model);

                model.FullName = UserUrlConfig.PrepareUserName(model.user, Jugnoon.Settings.Configs.RegistrationSettings.uniqueFieldOption);

                model.Nav = new NavModelView()
                {
                    username = model.UserName,
                    ActiveIndex = 100,
                    ShowForumPosts = getValue(model.user.stats.stat_forum_topics),
                    CountTopics = model.user.stats.stat_forum_topics,
                   
                };
                var _title = model.FullName + "'s " + SiteConfig.generalLocalizer["_posted_topics"] + " (" + userInfo[0].stats.stat_forum_topics + ")"; // 
                /* List Settings */
                model.forumtopics = new ForumTopicsListViewModel()
                {
                    isListStatus = false,
                    QueryOptions = new Jugnoon.Forums.ForumTopicEntity()
                    {
                        pagenumber = (int)pagenumber,
                        userid = model.user.Id,
                        term = "",
                        iscache = false,
                        ispublic = true,
                        pagesize = 20,
                        order = "topic.created_at desc",
                    },
                    ListObject = new ListItems(),
                    HeadingTitle = _title,
                    DefaultUrl = Config.GetUrl("user/topics/" + model.UserName),
                    PaginationUrl = Config.GetUrl("user/topics/" + model.UserName + "/[p]/"),
                    NoRecordFoundText = SiteConfig.generalLocalizer["_no_records"].Value,
                };
                ViewBag.title = _title;
            }
            else
            {
                model.UserExist = false;
            }
            return View(model);
        }
   
        private string prepare_user_info(UserModelView model)
        {
            /*var info = new StringBuilder();
            info.Append(model.user.profile.gender);
            if (model.user.profile.hometown != "" || model.user.profile.currentcity != "")
            {
                if (model.user.profile.currentcity != "")
                {
                    info.Append(", " + model.user.profile.hometown);
                }
                else
                {
                    info.Append(", " + model.user.profile.currentcity);
                }
            }
            if (model.user.profile.zipcode != "")
            {
                info.Append(", " + model.user.profile.zipcode);
            }

            if (model.user.profile.country != "")
            {
                info.Append(", " + model.user.profile.country);
            }

            return info.ToString();*/
            return "";
        }
    }
}

/*
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.md', which is part of this source code package.
 * Copyright 2007 - 2020 MediaSoftPro
 * For more information email at support@mediasoftpro.com
 */
