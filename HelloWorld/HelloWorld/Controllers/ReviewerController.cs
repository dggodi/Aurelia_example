using HelloWorld.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;

namespace HelloWorld.Controllers
{
    public class ReviewerController : Controller
    {
        MovieContext db = new MovieContext();
        
        // GET: Users
        public ActionResult Index()
        {
            var result = db.FinalReviewers.Select(grp => grp.BusinessCapability).Distinct();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult Search(string text)
        {
            //var parseString = HttpUtility.HtmlDecode(text);

            var parseString = text.Replace("and", "&");

            var result = db.FinalReviewers.Where(obj => obj.BusinessCapability.Equals(parseString))
                .Select(obj => obj.DowId);
            //var m = db.FinalReviewers.Where(r => r.BusinessCapability.Equals(text));
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}