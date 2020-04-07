using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Jugnoon.Entity;
using Jugnoon.Utility;
using Jugnoon.BLL;
using System.Text;
using Jugnoon.Scripts;
using Jugnoon.Forums;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Localization;
using Jugnoon.Framework;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.Net;
using System.Threading.Tasks;
using Jugnoon.Settings;
using Jugnoon.Forums.Models;
using Jugnoon.Localize;

namespace ForumEngine.Controllers
{
    public class forumsController : Controller
    {
        ApplicationDbContext _context;
        public forumsController(
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
            Jugnoon.Settings.Configs.SmtpSettings = smtpSettings.Value;
            Jugnoon.Settings.Configs.MediaSettings = mediaSettings.Value;
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
        public IActionResult Index()
        {
            ViewBag.ForumTabCss = "active";
            var model = new ForumsListModel()
            {
                Data = GetForumData()
            };
         
            ViewBag.title= SiteConfig.generalLocalizer["_forums"].Value;

            return View(model);
        }
            

        // GET: forums/category
        public async Task<IActionResult> category(string title, int? pagenumber)
        {
            if (title == null)
            {
                return Redirect(Config.GetUrl("forums/"));
            }
            if (pagenumber == null)
                pagenumber = 1;

            string _term = UtilityBLL.ReplaceHyphinWithSpace(title);
            string categoryName = UtilityBLL.UppercaseFirst(_term);


            string _title = categoryName + " Forums";
            /* List Initialization */
            var ListEntity = new ForumListViewModel()
            {
                isListStatus = false,
                QueryOptions = new ForumEntity()
                {
                    pagenumber = (int)pagenumber,
                    categoryname = _term,
                    //categories_str = _term,
                    iscache = true,
                    ispublic = true,
                    pagesize = 20,
                    order = "forum.priority desc",
                },
                DefaultUrl = Config.GetUrl("forums/category/" + title + "/"),
                PaginationUrl = Config.GetUrl("forums/category/" + title + "/[p]/"),
                NoRecordFoundText = SiteConfig.generalLocalizer["_no_records"].Value,
                headingTitle = _title
            };

            ListEntity.Records = await ForumBLLC.Count(_context, ListEntity.QueryOptions);
            if(ListEntity.Records > 0)
            {
                ListEntity.Data = await ForumBLLC.LoadItems(_context, ListEntity.QueryOptions);
                foreach (var Item in ListEntity.Data)
                {                    
                    // attach last post id
                    foreach (var Itm in ListEntity.Data)
                    {
                        Itm.lastpost = ForumTopicBLL.Load_Last_Post(_context, (long)Itm.lastpostid);
                    }
                }
            }

            if (pagenumber > 1)
            {
                _title = _title + " - Page: " + pagenumber;
            }

            ViewBag.title= _title;

            return View(ListEntity);
        }


        // GET: forums/categories
        public IActionResult categories()
        {
            ViewBag.title= SiteConfig.generalLocalizer["_categories"].Value;

            return View();
        }
        #endregion


        #region Post Topic
        // GET: forums/post
        public async Task<IActionResult> post(long? id)
        {
            var model = new PostTopicViewModel();
            model.AlertType = AlertTypes.Error;
            model.PostAccess = true;

            long TopicID = 0;
            if(id != null)
            {
                TopicID = (long)id;
            }

            if (!User.Identity.IsAuthenticated)
            {
                string redirect_url = Config.GetUrl() + "forums/post";
                return Redirect(Config.GetUrl() + "login?returnUrl=" + redirect_url);
            }

            model.isAdmin = false;


            model.UserName = SiteConfig.userManager.GetUserName(User);

            if (HttpContext.Request.Query["gd"].Count > 0)
            {
                model.GroupID = Convert.ToInt64(HttpContext.Request.Query["gd"]);
            }

            model.showTitle = true;
            model.showTags = true;
            model.showForumOption = true;

            if (HttpContext.Request.Query["f"].Count > 0)
            {
                model.ForumID = Convert.ToInt32(HttpContext.Request.Query["f"]);
                model.showForumOption = false;
            }
            else
            {
                // load forums for manual selection
                model.ForumList = await ForumBLLC.LoadItems(_context, new ForumEntity()
                {
                    loadall  = true,
                    iscache = true
                });
            }


            // use for posting reply
            if (HttpContext.Request.Query["t"].Count > 0)
            {
                model.ReplyID = Convert.ToInt32(HttpContext.Request.Query["t"]);

                var status = Load_Topic_Info(model);
                if (status != "OK")
                {
                    model.Message = status;
                    return View(model);
                }
            }

            
            // use for updat posting only
            if (TopicID > 0)
            {
                model.TopicID = TopicID;
                model.showForumOption = false;

                if (!model.isAdmin)
                {
                    // Security Validation -> Awnership Check
                    if (!ForumTopicBLL.Check(_context, model.TopicID, SiteConfig.userManager.GetUserName(User)))
                    {
                        model.PostAccess = false;
                        model.PostMessage = SiteConfig.generalLocalizer["_authentication_failed"];
                        return View(model);
                    }
                }
                var _lst = await ForumTopicBLL.LoadItems(_context, new ForumTopicEntity()
                {
                    id = model.TopicID,
                    loadall = true
                });
                if (_lst.Count > 0)
                {
                    model.Title= _lst[0].title;
                    model.Tags = _lst[0].tags;
                    model.ForumID = _lst[0].forumid;
                    string desc = _lst[0].description;
                    model.Description = _lst[0].description;

                }
                else
                {
                    model.ReplyID = 0;
                    model.Message = SiteConfig.forumLocalizer["_forum_post_msg_01"].Value; //  "No existing topic found to post reply, add new topic"
                    return View(model);
                }
            }

            if (model.ReplyID > 0)
                model.HeadingTitle = SiteConfig.forumLocalizer["_post_reply"].Value;
            else if (TopicID > 0)
                model.HeadingTitle = "Update Post";
            else
                model.HeadingTitle = SiteConfig.forumLocalizer["_post_new_topic"].Value;


            ViewBag.title= model.HeadingTitle ;
            return View(model);
        }

        public string Load_Topic_Info(PostTopicViewModel model)
        {
            var _lst = ForumTopicBLL.LoadItems(_context, new ForumTopicEntity()
            {
                id = model.ReplyID,
                loadall = true,
                singlepost = true
            }).Result;
            if (_lst.Count > 0)
            {
                // further validation
                if (_lst[0].replyid > 0)
                {
                    model.ReplyID = 0;
                    return SiteConfig.forumLocalizer["_forum_post_msg_02"].Value; 
                }
                if (_lst[0].type == 1)
                {
                    model.ReplyID = 0; // reset it to post new topic
                    return SiteConfig.forumLocalizer["_forum_post_msg_03"].Value;
                }
                if (_lst[0].islocked == 1)
                {
                    model.ReplyID = 0; // reset it to post new topic
                    return SiteConfig.forumLocalizer["_forum_post_msg_04"].Value;
                }
                if (_lst[0].isresolved == 1)
                {
                    model.ReplyID = 0; // reset it to post new topic
                    return SiteConfig.forumLocalizer["_forum_post_msg_05"].Value; 
                }
                if (_lst[0].isapproved == 0)
                {
                    model.ReplyID = 0; // reset it to post new topic
                    return SiteConfig.forumLocalizer["_forum_post_msg_06"].Value;
                }
                if (_lst[0].isenabled == (byte)EnabledTypes.Disabled)
                {
                    model.ReplyID = 0; // reset it to post new topic
                    return SiteConfig.forumLocalizer["_forum_post_msg_07"].Value; 
                }
                // Validation completed
                model.showTitle = false;
                model.showTags = false;
                model.showForumOption = false;
                model.ForumID = _lst[0].forumid;
                model.Title= "Re: " + _lst[0].title;
                model.Tags = _lst[0].tags;

                if (HttpContext.Request.Query["nq"].Count > 0)
                {
                    if (HttpContext.Request.Query["nq"].ToString() == "0")
                    {
                        // quote is on
                        if (HttpContext.Request.Query["p"].Count > 0)
                        {
                            long postid = Convert.ToInt64(HttpContext.Request.Query["p"]);
                            if (postid > 0)
                            {
                                string desc = ForumTopicBLL.Return_Value(_context, postid, "description");
                                desc = UtilityBLL.CompressCodeBreak(desc); // replace \n with <br />
                                desc = WebUtility.HtmlDecode(desc);
                                model.Description = "\n[quote]" + desc + "[/quote]\n";
                            }
                        }

                    }
                }
                return "OK";
            }
            else
            {
                model.ReplyID = 0;
                return SiteConfig.forumLocalizer["_forum_post_msg_08"].Value;
            }
        }
        
        [ValidateAntiForgeryToken]
        [HttpPost]
        public async Task<IActionResult> post(PostTopicViewModel model)
        {
            if (ModelState.IsValid)
            {            
                // new topic posted
                if (model.ReplyID == 0)
                {
                    // check title 
                    if (model.Title.Length < 10)
                    {
                        model.Message = SiteConfig.forumLocalizer["_forum_post_msg_09"].Value;
                        return View(model);
                    }

                    if (UtilityBLL.isLongWordExist(model.Title) || UtilityBLL.isLongWordExist(model.Title))
                    {
                        model.Message = SiteConfig.generalLocalizer["_invalid_title"];
                        return View(model);
                    }
                }

                // Add information in table
                var topics = new JGN_ForumTopics();
                if (model.TopicID > 0)
                {
                    topics.id = model.TopicID;
                }

                topics.forumid = model.ForumID;

                string content = UGeneral.SanitizeText(model.Description);

                // Process Contents -> links, bbcodes etc
                // content = UtilityBLL.Process_Content_Text(content);
                // Generate Album Preview
                //content = AlbumsBLL.Generate_Blog_Gallery_Previews(content);
                
                topics.description = content;

                if (model.ReplyID > 0)
                {
                    var _lst = await ForumTopicBLL.LoadItems(_context, new ForumTopicEntity()
                    {
                        id = model.TopicID,
                        loadall = true
                    });
                    if (_lst.Count > 0)
                    {                        
                        topics.tags = _lst[0].tags;
                        topics.title= _lst[0].title;
                        topics.forumid = _lst[0].forumid;
                        if (topics.title.Length > 200)
                            topics.title= topics.title.Substring(0, 199);
                    }
                }
                else
                {
                    if(model.Tags != null)
                    {
                        topics.tags = model.Tags;
                        if (topics.tags.Length > 300)
                            topics.tags = topics.tags.Substring(0, 299);
                    }
                 
                    topics.title= model.Title;
                }
                topics.userid = model.UserName;

                int isapproved = 1;
                if (Jugnoon.Settings.Configs.GeneralSettings.content_approval == 0 && !model.isAdmin && model.ReplyID == 0)
                {
                    isapproved = 0; // manual approval
                }
                topics.isapproved = (byte)isapproved;
                topics.isenabled = 1;
                topics.replyid = model.ReplyID;

                topics = await ForumTopicBLL.Process(_context, topics, model.isAdmin);
                if (model.Tags != "")
                {
                    // Process tags
                    TagsBLL.Process_Tags(_context, model.Tags, TagsBLL.Types.Forums, 0);
                }

                
                // Mail Procesing Section
                if (model.TopicID == 0 && model.ReplyID == 0)
                {
                    ProcessMail(topics.id, topics.replyid, topics.userid, model.GroupID, model.Description, model.Title);
                    // add newly added topic id in struct for user activity and group posting
                    //topics.topicid = topics.topicid;
                   
                }

                if (model.ReplyID > 0)
                {
                    // topic is posted in reply
                    // redirect to topic
                    return Redirect(Forum_Urls.Prepare_Topic_Url(topics.replyid, topics.title, model.isAdmin) + "?status=posted");
                }

                return Redirect(Forum_Urls.Prepare_Topic_Url(topics.id, topics.title, model.isAdmin) + "?status=posted");
            }

            // initialize values
            if(model.ForumID == 0)
            {
                model.ForumList = await ForumBLLC.LoadItems(_context, new ForumEntity()
                {
                    loadall = true,
                    
                    iscache = true
                });
            }
            model.Message = "Validation Error";
            return View(model);
        }

        public async Task<IActionResult> remove(long? id)
        {
            if (id == null)
            {
                return Redirect(Config.GetUrl("forum"));
            }
            if(!User.Identity.IsAuthenticated)
            {
                return Redirect(Config.GetUrl("forum?status=notsigned"));
            }

            if (!ForumTopicBLL.Check(_context, (long)id, SiteConfig.userManager.GetUserName(User)))
            {
                return Redirect(Config.GetUrl("forum?status=authfailed"));
            }

            var _obj = await ForumTopicBLL.LoadItems(_context, new ForumTopicEntity()
            {
                id = (long)id,
                pagenumber = 1,
                pagesize = 1000,
                singlepost = true,
                loadall = true
            });
            if (_obj.Count > 0)
            {
                var Item = _obj[0];
                await ForumTopicBLL.Delete(_context, Item.id, Item.forumid, Item.userid);
                if (Item.replyid > 0)
                {
                    // get post info
                    Item.replies--;
                    if (Item.replies < 0)
                        Item.replies = 0;

                    await ForumTopicBLL.Update_Value_V3(_context, Item.replyid, "replies", Item.replies);
                }
            }

            return Redirect(Config.GetUrl("forum?status=removed"));
        }
        //********************************************************************************
        // SEND MAIL TO AUTHOR OF TOPIC, ADMIN (MODERATOR) OR ALL USERS WHO POST Comments)
        //*********************************************************************************

        // Mail Logic
        // If user post new topic mail will be sent to user and admin (moderator)
        // If admin approve topic mail will be sent to author (in case of manual review)
        // If normal user post reply, mail will be sent to author and all users who contribute replies and admin
        private void ProcessMail(long tid, long replyid, string username, long groupid, string description, string title)
        {
            try
            {
                string subject = title;
                string content = UtilityBLL.StripHTML(description);
                string url = Forum_Urls.Prepare_Topic_Url(tid, subject, false);
                if (replyid == 0)
                {
                    // New Topic Posted Mail Will Be Sent To Admin AND Author
                    // send mail to admin
                    var alst = MailTemplateBLL.Get_Template(_context, "FORUMTOPIC").Result;
                    Send_Email(username, "admin", "", subject, content, url, alst);
                    // send mail to author
                    var tlst = MailTemplateBLL.Get_Template(_context, "FORUMTA").Result;
                    string authoremail = UserBLL.Return_Value_UserId(_context, username, "email");
                    var authormailpermission = Convert.ToByte(UserSettingsBLL.Get_Field_Value(_context, username, "isemail"));

                    if (authormailpermission == 1)
                        Send_Email("", username, authoremail, subject, content, url, tlst);
                }
                else
                {
                    // User Post Reply, Mail will be sent to autho, admin and all users who contribute replies
                    MailTemplateProcess(replyid, subject, content, url, username, groupid);
                }
            }
            catch (Exception ex)
            {
                ErrorLgBLL.Add(_context, "Mail Processing Error", "", ex.Message);
            }

        }
        private void MailTemplateProcess(long tid, string subject, string content, string url, string username, long groupid)
        {
            //if sending mail option enabled
            if (Jugnoon.Settings.Configs.SmtpSettings.enable_email)
            {
                var lst = MailTemplateBLL.Get_Template(_context, "FORUMTREP").Result;
                if (lst.Count > 0)
                {
                    string TopicAuthorusername = ForumTopicBLL.Return_Value(_context, tid, "username");
                    //// send email to admin
                    //string emailaddress = UserBLL.Return_Value(model.username, "email");
                    //Send_Email(model.username,"admin", subject, content, url, lst);
                    // send mail to all other usernames who already post topi on model content
                    var cuserlist = UserBLL.LoadItems(_context,new MemberEntity()
                    {
                        topicid = tid
                    }).Result;
                    if (cuserlist.Count > 0)
                    {
                        int i = 0;
                        for (i = 0; i <= cuserlist.Count - 1; i++)
                        {
                            //if (cuserlist[i].isautomail == 1)
                            //{
                                if (cuserlist[i].UserName == TopicAuthorusername)
                                {
                                    // topic author
                                    GroupMailProcessTemplate(TopicAuthorusername, subject, username, cuserlist[i].Email, url, groupid);
                                }
                                else
                                {
                                    // normal user
                                    Send_Email(username, cuserlist[i].UserName, cuserlist[i].Email, subject, content, url, lst);
                                }
                            //}
                        }
                    }

                }
            }
        }
        // send mail to admin or author of user
        private void Send_Email(string poster_username, string rusername, string emailaddress, string subject, string content, string url, List<JGN_MailTemplates> lst)
        {
            if (rusername != "guest")
            {
                if (rusername == "admin")
                {
                    // mail send to admin
                    emailaddress = Jugnoon.Settings.Configs.GeneralSettings.admin_mail;
                }

                string msubject = MailProcess.Process2(lst[0].subject, "\\[poster_username\\]", poster_username);
                msubject = MailProcess.Process2(msubject, "\\[username\\]", rusername);
                msubject = MailProcess.Process2(msubject, "\\[subject\\]", subject);
                var str = new StringBuilder();
                str.AppendLine("<a href=\"" + url + "\">" + subject + "</a><br /><br />");
                str.AppendLine(WebUtility.HtmlDecode(UtilityBLL.Process_Content_Text(content)));
                string contents = MailProcess.Process2(lst[0].contents, "\\[poster_username\\]", poster_username);
                contents = MailProcess.Process2(contents, "\\[username\\]", rusername);
                contents = MailProcess.Process2(contents, "\\[content\\]", str.ToString());

                // attach signature
                contents = MailProcess.Prepare_Email_Signature(contents);

                MailProcess.Send_Mail(emailaddress, msubject, contents);
            }
        }

        // Send mail to owner of group if user posted new topic in group
        private void GroupMailProcessTemplate(string ownerusername, string title, string username, string emailaddress, string inboxurl, long groupid)
        {
            //if sending mail option enabled
            if (Jugnoon.Settings.Configs.SmtpSettings.enable_email)
            {
                var lst = MailTemplateBLL.Get_Template(_context, "GRPTPAPR").Result;
                if (lst.Count > 0)
                {
                    string subject = MailProcess.Process2(lst[0].subject, "\\[ownerusername\\]", ownerusername);
                    subject = MailProcess.Process2(subject, "\\[username\\]", username);

                    string contents = MailProcess.Process2(lst[0].contents, "\\[ownerusername\\]", ownerusername);
                    contents = MailProcess.Process2(contents, "\\[username\\]", ownerusername);

                    string group_url = Config.GetUrl("group/" + groupid);
                    string url = "<a href=\"" + group_url + "\">" + group_url + "</a>";

                    contents = MailProcess.Process2(contents, "\\[url\\]", url);
                    contents = MailProcess.Process2(contents, "\\[title\\]", title);
                    contents = MailProcess.Process2(contents, "\\[inboxurl\\]", inboxurl);

                    // attach signature
                    contents = MailProcess.Prepare_Email_Signature(contents);

                    MailProcess.Send_Mail(emailaddress, subject, contents);
                }
            }
        }

        #endregion


        public async Task<IActionResult> resolved()
        {
             long TopicID = 0;
             long PostID = 0;
             int isresolved = 0;
             string Postusername = "";
             string ElementID = ""; // div element id where you want to load box with close link

            if (HttpContext.Request.Query["t"].Count > 0)
                TopicID = Convert.ToInt64(HttpContext.Request.Query["t"]);
            if (HttpContext.Request.Query["p"].Count > 0)
                PostID = Convert.ToInt64(HttpContext.Request.Query["p"]);
            if (HttpContext.Request.Query["res"].Count > 0)
                isresolved = Convert.ToInt32(HttpContext.Request.Query["res"]);
            if (HttpContext.Request.Query["pusr"].Count > 0)
                Postusername = HttpContext.Request.Query["pusr"].ToString();
            if (HttpContext.Request.Query["cnt"].Count > 0)
                ElementID = HttpContext.Request.Query["cnt"].ToString();

            // mark content as resolved
            await ForumTopicBLL.MarkAsResolved(_context, TopicID, PostID, Postusername, isresolved);
            // wrap output
            if (isresolved == 1)
                return this.Content(SiteConfig.forumLocalizer["_remove_answer"], "text/plain");
            else
                return this.Content(SiteConfig.forumLocalizer["_mark_answer"], "text/plain");
        }

        private List<ForumItem> GetForumData()
        {
            string key = "mn_forum_cache";
            var data = new List<ForumItem>();
            if (!SiteConfig.Cache.TryGetValue(key, out data))
            {
                var _list = CategoryBLL.LoadItems(_context, new CategoryEntity()
                {
                    type = (int)CategoryBLL.Types.Forum,
                    ispublic = true,
                    iscache = false,
                    order = "title asc",
                    pagesize = 50
                }).Result;
                var _Data = new List<ForumItem>();
                if (_list.Count > 0)
                {
                    foreach (var Item in _list)
                    {
                        var _data = new ForumItem()
                        {
                            Type = 12,
                            Title = Item.title,
                            Term = Item.term,
                            ForumList = ForumBLLC.LoadItems(_context, new ForumEntity()
                            {
                                order = "forum.priority desc",
                                categoryname =Item.term,
                                //categories_str = Item.term,
                                iscache = false
                            }).Result
                        };
                        // attach last post id
                        foreach (var Itm in _data.ForumList)
                        {
                            Itm.lastpost = new List<JGN_ForumTopics>();
                            if (Itm.lastpostid != null && Itm.lastpostid > 0)
                                Itm.lastpost = ForumTopicBLL.Load_Last_Post(_context, (long)Itm.lastpostid);
                        }
                        _Data.Add(_data);
                    }
                }

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    // Keep in cache for this time, reset time if accessed.
                    .SetSlidingExpiration(TimeSpan.FromSeconds(3600));

                data = _Data;
                // Save data in cache.
                SiteConfig.Cache.Set(key, _Data, cacheEntryOptions);
            }
            else
            {
                data = (List<ForumItem>)SiteConfig.Cache.Get(key);
            }
            
            return data;
        }
    }
}

/*
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.md', which is part of this source code package.
 * Copyright 2007 - 2020 MediaSoftPro
 * For more information email at support@mediasoftpro.com
 */
