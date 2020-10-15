using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;

namespace Jugnoon.Core
{
    public static class RouteConfig
    {
        public static IEndpointRouteBuilder Use(IEndpointRouteBuilder routeBuilder)
        {

            #region User Profile
            routeBuilder.MapControllerRoute(
                    null,
                    "user/profile/{username}",
                    defaults: new { controller = "user", action = "profile" }

                );


            routeBuilder.MapControllerRoute(
                null,
                "user/topics/{username}",
                defaults: new { controller = "user", action = "topics" }
            );

            routeBuilder.MapControllerRoute(
              null,
              "user/topics/{username}/{id}",
              defaults: new { controller = "user", action = "topics" }
          );

            routeBuilder.MapControllerRoute(
                null,
                "user/{username}",
                defaults: new { controller = "user", action = "Index" }

             );
            #endregion


            #region Forums
            routeBuilder.MapControllerRoute(
                  null,
                  "forums/category/{title}",
                  defaults: new { controller = "forums", action = "category" }

             );

            routeBuilder.MapControllerRoute(
                null,
                "forums/category/{title}/{id}",
                defaults: new { controller = "forums", action = "category" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "forums/",
                defaults: new { controller = "forums", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                 null,
                 "forum/{fid}/{title}",
                 defaults: new { controller = "forum", action = "Index" }

            );

            routeBuilder.MapControllerRoute(
                 null,
                 "forum/{fid}/{title}/{id}",
                 defaults: new { controller = "forum", action = "Index" }

            );

            routeBuilder.MapControllerRoute(
                    null,
                    "topic/post/{id}",
                    defaults: new { controller = "topic", action = "post" }

            );

            routeBuilder.MapControllerRoute(
                null,
                "topic/{tid}/{title}",
                defaults: new { controller = "topic", action = "Index" }

           );
            routeBuilder.MapControllerRoute(
                null,
                "topic/{tid}/{title}/{id}",
                defaults: new { controller = "topic", action = "Index" }

            );


            #endregion

                #region Blogs

            // blog post detail
            routeBuilder.MapControllerRoute(
                    null,
                    "post/{id}/{title}",
                    defaults: new { controller = "post", action = "Index" }
            );

            // blogs category processing routes
            routeBuilder.MapControllerRoute(
                     null,
                     "blogs/category/filter/{title}/{filter}",
                     defaults: new { controller = "blogs", action = "category" }

            );

            routeBuilder.MapControllerRoute(
                   null,
                   "blogs/category/filter/{title}/{filter}/{pagenumber}",
                   defaults: new { controller = "blogs", action = "category" }
            );

            routeBuilder.MapControllerRoute(
                      null,
                      "blogs/category/filter/{title}/{filter}/{order}",
                      defaults: new { controller = "blogs", action = "category" }
            );

            routeBuilder.MapControllerRoute(
                  null,
                  "blogs/category/filter/{title}/{filter}/{order}/{pagenumber}",
                  defaults: new { controller = "blogs", action = "category" }
            );

            routeBuilder.MapControllerRoute(
                    null,
                    "blogs/category/{title}/{order}",
                    defaults: new { controller = "blogs", action = "category" }
            );

            routeBuilder.MapControllerRoute(
                  null,
                  "blogs/category/{title}/{order}/{pagenumber}",
                  defaults: new { controller = "blogs", action = "category" }
            );

            routeBuilder.MapControllerRoute(
                   null,
                   "blogs/category/{title}",
                   defaults: new { controller = "blogs", action = "category" }
            );

            routeBuilder.MapControllerRoute(
                 null,
                 "blogs/category/{title}/{pagenumber}",
                 defaults: new { controller = "blogs", action = "category" }
            );

            // blogs tag processing routes
            routeBuilder.MapControllerRoute(
                  null,
                  "blogs/label/filter/{title}/{filter}",
                  defaults: new { controller = "blogs", action = "label" }
            );

            routeBuilder.MapControllerRoute(
                  null,
                  "blogs/label/filter/{title}/{filter}/{pagenumber}",
                  defaults: new { controller = "blogs", action = "label" }
            );

            routeBuilder.MapControllerRoute(
                 null,
                 "blogs/label/filter/{title}/{filter}/{order}",
                 defaults: new { controller = "blogs", action = "label" }
            );

            routeBuilder.MapControllerRoute(
                  null,
                  "blogs/label/filter/{title}/{filter}/{order}/{pagenumber}",
                  defaults: new { controller = "blogs", action = "label" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "blogs/label/{title}/{order}/{pagenumber}",
               defaults: new { controller = "blogs", action = "label" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "blogs/label/{title}/{order}",
               defaults: new { controller = "blogs", action = "label" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "blogs/label/{title}/{order}/{pagenumber}",
               defaults: new { controller = "blogs", action = "label" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "blogs/label/{title}",
               defaults: new { controller = "blogs", action = "label" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "blogs/label/{title}/{pagenumber}",
               defaults: new { controller = "blogs", action = "label" }
            );

            routeBuilder.MapControllerRoute(
              null,
              "blogs/archive/{month}/{year}",
              defaults: new { controller = "blogs", action = "archive" }
           );

            routeBuilder.MapControllerRoute(
               null,
               "blogs/archive/{month}/{year}/{pagenumber}",
               defaults: new { controller = "blogs", action = "archive" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "blogs/categories",
                defaults: new { controller = "blogs", action = "categories" }
            );

            routeBuilder.MapControllerRoute(
                  null,
                  "blogs/categories/{pagenumber}",
                  defaults: new { controller = "blogs", action = "categories" }
            );

            routeBuilder.MapControllerRoute(
                  null,
                  "blogs/archivelist",
                  defaults: new { controller = "blogs", action = "archivelist" }
            );

            routeBuilder.MapControllerRoute(
                  null,
                  "blogs/labels",
                  defaults: new { controller = "blogs", action = "labels" }
            );

            routeBuilder.MapControllerRoute(
                  null,
                  "blogs/labels/{pagenumber}",
                  defaults: new { controller = "blogs", action = "labels" }
            );

            routeBuilder.MapControllerRoute(
                  null,
                  "blogs/labels/search/{term}",
                  defaults: new { controller = "blogs", action = "labels" }
            );

            routeBuilder.MapControllerRoute(
                  null,
                  "blogs/labels/search/{term}/{pagenumber}",
                  defaults: new { controller = "blogs", action = "labels" }
            );

            routeBuilder.MapControllerRoute(
                   null,
                   "blogs/queryresult",
                   defaults: new { controller = "blogs", action = "queryresult" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "blogs/search/{term}",
                defaults: new { controller = "blogs", action = "search" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "blogs/page/{pagenumber}",
                defaults: new { controller = "blogs", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "blogs/added/{filter}",
                defaults: new { controller = "blogs", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                   null,
                   "blogs/added/{filter}/{pagenumber}",
                   defaults: new { controller = "blogs", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                 null,
                 "blogs/{order}",
                 defaults: new { controller = "blogs", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                 null,
                 "blogs/{order}/{pagenumber}",
                 defaults: new { controller = "blogs", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                 null,
                 "blogs/",
                 defaults: new { controller = "blogs", action = "Index" }
            );

            #endregion

            routeBuilder.MapControllerRoute(
                name: "ActionApi",
                pattern: "api/{controller}/{action}/{name?}"
            );

            routeBuilder.MapControllerRoute(
                null,
                "/account/{*url}",
                defaults: new { controller = "account", action = "Index" }
           );

            routeBuilder.MapControllerRoute(
              null,
              "/admin/{*url}",
              defaults: new { controller = "admin", action = "Index" }
            );

            routeBuilder.MapFallbackToController("account/", "Index", "account");
            routeBuilder.MapFallbackToController("admin/", "Index", "admin");

            // default root
            routeBuilder.MapControllerRoute(
                 null,
                 "/{page}",
                 defaults: new { controller = "Home", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                   name: "default",
                   pattern: "{controller=Home}/{action=Index}/{id?}");


            return routeBuilder;

        }
    }
    
    public static class InitRouteControllerConfig
    {
        public static IEndpointRouteBuilder Use(IEndpointRouteBuilder routeBuilder)
        {
            routeBuilder.MapControllerRoute(
                            name: "default",
                            pattern: "{controller=Installation}/{action=Index}/{id?}");

            return routeBuilder;
        }
    }
}
