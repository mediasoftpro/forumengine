using System;
using System.Collections.Generic;
using Jugnoon.Settings;
using Jugnoon.Utility;
using Jugnoon.BLL;
using System.IO;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Caching.Memory;
using Jugnoon.Framework;
using Microsoft.Extensions.Localization;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using Jugnoon.Forums;
using Jugnoon.Localize;

namespace ForumEngine.Areas.api.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class analyticsController : ControllerBase
    {
        ApplicationDbContext _context;
        public analyticsController(
         IOptions<SiteConfiguration> settings,
         IMemoryCache memoryCache,
         ApplicationDbContext context,
         IStringLocalizer<GeneralResource> generalLocalizer,
         IWebHostEnvironment _environment,
         IHttpContextAccessor _httpContextAccessor,
         IOptions<General> generalSettings,
         IOptions<Aws> awsSettings,
         IOptions<Smtp> smtpSettings,
         IOptions<Features> featureSettings,
         IOptions<Media> mediaSettings
       )
        {
            // readable configuration
            Jugnoon.Settings.Configs.GeneralSettings = generalSettings.Value;
            Jugnoon.Settings.Configs.AwsSettings = awsSettings.Value;
            Jugnoon.Settings.Configs.SmtpSettings = smtpSettings.Value;
            Jugnoon.Settings.Configs.FeatureSettings = featureSettings.Value;
            Jugnoon.Settings.Configs.MediaSettings = mediaSettings.Value;
           
            // other injectors
            SiteConfig.Config = settings.Value;
            SiteConfig.Cache = memoryCache;
            _context = context;

            SiteConfig.generalLocalizer = generalLocalizer;
            SiteConfig.Environment = _environment;
            SiteConfig.HttpContextAccessor = _httpContextAccessor;
        }

        [HttpPost("load_stats")]
        public async Task<ActionResult> load_stats()
        {
            var json = new StreamReader(Request.Body).ReadToEnd();
            //var data = JsonConvert.DeserializeObject<ClassifiedEntity>(json);

            var _forums = await ForumBLLC.Count(_context, new ForumEntity()
            {
                ispublic = true
            });

            var _topics = await ForumTopicBLL.Count(_context, new ForumTopicEntity()
            {
                ispublic = true,
                isfeatured = FeaturedTypes.Featured,
                nofilter = false
            });

            var _blogs = await Jugnoon.Blogs.BlogsBLL.Count(_context, new Jugnoon.Blogs.BlogEntity()
            {
                ispublic = true
            });

            var _users = await UserBLL.Count(_context, new Jugnoon.Entity.MemberEntity()
            {
                nofilter = true
            });

            
            return Ok(new { forums = _forums, topics = _topics, blogs = _blogs, users = _users });
        }
    }
}