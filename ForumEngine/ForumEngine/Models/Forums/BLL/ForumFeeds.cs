using Jugnoon.Framework;
using Jugnoon.Settings;
using Jugnoon.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jugnoon.Forums
{
    public class ForumFeeds
    {
        #region Feeds

        // Generate Google Sitemap - URL submission
        public static async Task<string> BuildGoogleSiteMap(ApplicationDbContext context, int pagenumber, int Records)
        {
            var str = new StringBuilder();
            str.AppendLine("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"  xsi:schemaLocation=\"http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd\">");
          
            var items = await ForumBLLC.LoadItems(context, new ForumEntity()
            {
                pagenumber = pagenumber,
                pagesize = Records,
                order = "forum.id desc"
            });
            foreach (var item in items)
            {
                str.AppendLine("<url>");
                string url = Forum_Urls.Prepare_Forum_Url(Convert.ToInt32(item.id), item.title, false);
                str.AppendLine("<loc>" + url + "</loc>");
                str.AppendLine("</url>");
            }
            str.AppendLine("</urlset>");

            return str.ToString();
        }

        // Generate ROR Sitemap - Yahoo URL submission
        public static async Task<string> BuildYahooSiteMap(ApplicationDbContext context, int pagenumber, int Records)
        {
            var str = new StringBuilder();
            str.AppendLine("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
            str.AppendLine("<rss version=\"2.0\" xmlns:ror=\"http://rorweb.com/0.1/\" >");

            str.AppendLine("<channel>");
            str.AppendLine("<title>" + Jugnoon.Settings.Configs.GeneralSettings.website_title + "</title>");
            str.AppendLine("<link>" + Config.GetUrl() + "</link>");
            // start sitemap url

            var items = await ForumBLLC.LoadItems(context, new ForumEntity()
            {
                pagenumber = pagenumber,
                pagesize = Records,
                order = "forum.id desc"
            });
            foreach (var item in items)
            {
                str.AppendLine("<item>");
                string url = Forum_Urls.Prepare_Forum_Url(item.id, item.title, false);
                str.AppendLine("<link>" + url + "</link>");
                str.AppendLine("<ror:updatePeriod></ror:updatePeriod>");
                str.AppendLine("<ror:sortOrder>2</ror:sortOrder>");
                str.AppendLine("<ror:resourceOf>sitemap</ror:resourceOf> ");
                str.AppendLine("</item>");
            }

            // close sitemap url
            str.AppendLine("</channel>");
            str.AppendLine("</rss>");

            return str.ToString();
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

