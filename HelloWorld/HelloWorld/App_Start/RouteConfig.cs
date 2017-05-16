using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace HelloWorld
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute("BusinessCapabilities", "BusinessCapabilities/Search/{text}",
                new { controller = "BusinessCapabilities", action = "Search", text = UrlParameter.Optional });

            routes.MapRoute("Users", "Users/Search/{text}",
                new { controller = "Users", action = "Search", text = UrlParameter.Optional });

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
