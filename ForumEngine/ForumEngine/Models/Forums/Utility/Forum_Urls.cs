using Jugnoon.Utility;

namespace Jugnoon.Forums
{
    public class Forum_Urls
    {
        // Post New Forum Topic
        public static string Prepare_Post_New_Topic_Url(int forumid, bool isadmin)
        {
            string _forumquery = "";
            if (forumid > 0)
                _forumquery = "?f=" + forumid;

            return Config.GetUrl() + "forums/post" + _forumquery;
        }

        // Forum Topic Post Reply Url
        public static string Prepare_Post_Reply_Url(long topicid, long postid, bool isadmin, bool isquote)
        {
            string _noquote = "?t=" + topicid + "&nq=1";
            if (isquote)
                _noquote = "?t=" + topicid + "&p=" + postid + "&nq=0";

            return Config.GetUrl() + "forums/post/" + _noquote;
        }
        public static string Prepare_Post_Reply_Url(long topicid, long postid, bool isadmin, bool isquote, bool isedit)
        {
            string _url = "";
            if (isedit)
            {
                _url = Config.GetUrl() + "forums/post/" + postid;

            } else
            {
                _url = Prepare_Post_Reply_Url(topicid, postid, isadmin, isquote);
            }
            
            return _url;
        }
        public static string Prepare_Post_Remove_Url(long postid, bool isadmin)
        {
            return Config.GetUrl() + "forums/remove/" + postid;
        }
        // Forum Urls
        public static string Prepare_Forum_Url(int forumid, string title, bool isadmin)
        {
            if (title == null)
                return "";

            string title_ext = UtilityBLL.ReplaceSpaceWithHyphin_v2(title.Trim().ToLower());
            int maxium_length = Jugnoon.Settings.Configs.GeneralSettings.maximum_dynamic_link_length;
            if (title_ext.Length > maxium_length && maxium_length > 0)
                title_ext = title_ext.Substring(0, maxium_length);
            else if (title_ext.Length < 3)
                title_ext = "forum-post";

            return Config.GetUrl() + "forum/" + forumid + "/" + title_ext;
        }

        // Topic Url
        public static string Prepare_Topic_Url(long topicid, string title, bool isadmin)
        {
            string title_ext = UtilityBLL.ReplaceSpaceWithHyphin_v2(title.Trim().ToLower());
            int maxium_length = Jugnoon.Settings.Configs.GeneralSettings.maximum_dynamic_link_length;
            if (title_ext.Length > maxium_length && maxium_length > 0)
                title_ext = title_ext.Substring(0, maxium_length);
            else if (title_ext.Length < 3)
                title_ext = "forum-post";

            return Config.GetUrl() + "topic/" + topicid + "/" + title_ext; 
        }

        // Topic Url with Pagination
        public static string Prepare_Topic_Url(long topicid, string title, bool isadmin, int pagenumber)
        {
            string title_ext = UtilityBLL.ReplaceSpaceWithHyphin_v2(title.Trim().ToLower());
            int maxium_length = Jugnoon.Settings.Configs.GeneralSettings.maximum_dynamic_link_length;
            if (title_ext.Length > maxium_length && maxium_length > 0)
                title_ext = title_ext.Substring(0, maxium_length);
            else if (title_ext.Length < 3)
                title_ext = "forum-post";

            return Config.GetUrl() + "topic/" + topicid + "/" + title_ext + "/" + pagenumber;
        }

        // Single Post Url
        public static string Prepare_Post_Url(long topicid, bool isadmin = false)
        {
            return Config.GetUrl() + "topic/post/" + topicid;
        }

    }
}

/*
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.md', which is part of this source code package.
 * Copyright 2007 - 2020 MediaSoftPro
 * For more information email at support@mediasoftpro.com
 */
