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
