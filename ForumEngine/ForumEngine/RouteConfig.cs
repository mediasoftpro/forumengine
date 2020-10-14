using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;

namespace Jugnoon.Core
{
    public static class RouteConfig
    {
        public static IEndpointRouteBuilder Use(IEndpointRouteBuilder routeBuilder)
        {

            #region Detail
            routeBuilder.MapControllerRoute(
               null,
               "property/{id}/{title}",
               defaults: new { controller = "property", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                 null,
                 "agency/{id}/{title}",
                 defaults: new { controller = "agency", action = "Index" }
            );

           
            #endregion

            #region Listings

            routeBuilder.MapControllerRoute(
               null,
                   "listings/search/{term}",
                   defaults: new { controller = "listings", action = "search" }
               );

            routeBuilder.MapControllerRoute(
               null,
               "listings/page/{pagenumber}",
               defaults: new { controller = "listings", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "listings/added/{filter}",
                defaults: new { controller = "listings", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                   null,
                   "listings/added/{filter}/{pagenumber}",
                   defaults: new { controller = "listings", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                 null,
                 "listings/{order}",
                 defaults: new { controller = "listings", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                 null,
                 "listings/{order}/{pagenumber}",
                 defaults: new { controller = "listings", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "listings/featured",
                defaults: new { controller = "listings", action = "featured" }
            );

            routeBuilder.MapControllerRoute(
                 null,
                 "listings/featured/{pagenumber}",
                 defaults: new { controller = "listings", action = "featured" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "listings/premium",
               defaults: new { controller = "listings", action = "premium" }
           );

            routeBuilder.MapControllerRoute(
                 null,
                 "listings/premium/{pagenumber}",
                 defaults: new { controller = "listings", action = "premium" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "listings/hot",
                defaults: new { controller = "listings", action = "hot" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "listings/hot/{pagenumber}",
                defaults: new { controller = "listings", action = "hot" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "listings/super-hot",
                defaults: new { controller = "listings", action = "super_hot" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "listings/super-hot/{pagenumber}",
                defaults: new { controller = "listings", action = "super_hot" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "listings/",
                defaults: new { controller = "listings", action = "Index" }
            );

            #endregion

            #region Buy
            routeBuilder.MapControllerRoute(
               null,
               "buy/{type}/{property_type}/order/{order}/{pagenumber}",
               defaults: new { controller = "buy", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "buy/{type}/{property_type}/order/{order}",
               defaults: new { controller = "buy", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "buy/{type}/{property_type}/page/{pagenumber}",
               defaults: new { controller = "buy", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "buy/{type}/{property_type}",
                defaults: new { controller = "buy", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "buy/{type}/order/{order}/{pagenumber}",
               defaults: new { controller = "buy", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "buy/{type}/order/{order}",
                defaults: new { controller = "buy", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "buy/{type}/page/{pagenumber}",
               defaults: new { controller = "buy", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "buy/{type}",
                defaults: new { controller = "buy", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "buy/order/{order}/{pagenumber}",
               defaults: new { controller = "buy", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "buy/order/{order}",
               defaults: new { controller = "buy", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "buy/page/{pagenumber}",
               defaults: new { controller = "buy", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "buy/",
                defaults: new { controller = "buy", action = "Index" }
            );

            #endregion

            #region Rent
            routeBuilder.MapControllerRoute(
               null,
               "rent/{type}/{property_type}/order/{order}/{pagenumber}",
               defaults: new { controller = "rent", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "rent/{type}/{property_type}/order/{order}",
               defaults: new { controller = "rent", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "rent/{type}/{property_type}/page/{pagenumber}",
               defaults: new { controller = "rent", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "rent/{type}/{property_type}",
                defaults: new { controller = "rent", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "rent/{type}/order/{order}/{pagenumber}",
               defaults: new { controller = "rent", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "rent/{type}/order/{order}",
                defaults: new { controller = "rent", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "rent/{type}/page/{pagenumber}",
               defaults: new { controller = "rent", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "rent/{type}",
                defaults: new { controller = "rent", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "rent/order/{order}/{pagenumber}",
               defaults: new { controller = "rent", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "rent/order/{order}",
               defaults: new { controller = "rent", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "rent/page/{pagenumber}",
               defaults: new { controller = "rent", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "rent/",
                defaults: new { controller = "rent", action = "Index" }
            );

            #endregion

            #region Wanted

            routeBuilder.MapControllerRoute(
               null,
               "wanted/{type}/order/{order}/{pagenumber}",
               defaults: new { controller = "wanted", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "wanted/{type}/order/{order}",
                defaults: new { controller = "wanted", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "wanted/{type}/page/{pagenumber}",
               defaults: new { controller = "wanted", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "wanted/{type}",
                defaults: new { controller = "wanted", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "wanted/order/{order}/{pagenumber}",
               defaults: new { controller = "wanted", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "wanted/order/{order}",
               defaults: new { controller = "wanted", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "wanted/page/{pagenumber}",
               defaults: new { controller = "wanted", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "wanted/",
                defaults: new { controller = "wanted", action = "Index" }
            );

            #endregion

            #region Places
            routeBuilder.MapControllerRoute(
                null,
                "country/{title}",
                defaults: new { controller = "country", action = "Index" }
           );

            routeBuilder.MapControllerRoute(
                 null,
                 "state/{country}/{title}",
                 defaults: new { controller = "state", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "place/{country}/{state}/{city}/{pagenumber}",
                defaults: new { controller = "place", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "place/{country}/{state}/{city}",
                defaults: new { controller = "place", action = "Index" }
            );

            #endregion

            #region States
            
            routeBuilder.MapControllerRoute(
                null,
                "state/{country}/{state}/{pagenumber}",
                defaults: new { controller = "state", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "state/{country}/{state}",
                defaults: new { controller = "state", action = "Index" }
            );

            #endregion

            #region Counry

            routeBuilder.MapControllerRoute(
                null,
                "country/{country}/{pagenumber}",
                defaults: new { controller = "country", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "country/{country}",
                defaults: new { controller = "country", action = "Index" }
            );

            #endregion

            #region Agencies

            routeBuilder.MapControllerRoute(
               null,
               "agencies/page/{pagenumber}",
               defaults: new { controller = "agencies", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "agencies/added/{filter}",
                defaults: new { controller = "agencies", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                   null,
                   "agencies/added/{filter}/{pagenumber}",
                   defaults: new { controller = "agencies", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                 null,
                 "agencies/{order}",
                 defaults: new { controller = "agencies", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                 null,
                 "agencies/{order}/{pagenumber}",
                 defaults: new { controller = "agencies", action = "Index" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "agencies/featured",
                defaults: new { controller = "agencies", action = "featured" }
            );

            routeBuilder.MapControllerRoute(
                 null,
                 "agencies/featured/{pagenumber}",
                 defaults: new { controller = "agencies", action = "featured" }
            );

            routeBuilder.MapControllerRoute(
               null,
               "agencies/premium",
               defaults: new { controller = "agencies", action = "premium" }
           );

            routeBuilder.MapControllerRoute(
                 null,
                 "agencies/premium/{pagenumber}",
                 defaults: new { controller = "agencies", action = "premium" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "agencies/hot",
                defaults: new { controller = "agencies", action = "hot" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "agencies/hot/{pagenumber}",
                defaults: new { controller = "agencies", action = "hot" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "agencies/super-hot",
                defaults: new { controller = "agencies", action = "super_hot" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "agencies/super-hot/{pagenumber}",
                defaults: new { controller = "agencies", action = "super_hot" }
            );

            routeBuilder.MapControllerRoute(
                null,
                "agencies/",
                defaults: new { controller = "agencies", action = "Index" }
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
