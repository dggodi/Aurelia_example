using HelloWorld.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HelloWorld.Controllers
{
    public class BusinessCapabilitiesController : Controller
    {
        MovieContext db = new MovieContext();
        
        // GET: Users
        public ActionResult Index()
        {
            var m = db.FinalReviewers.ToList();
            return Json(m, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult Search(string text)
        {
            var m = db.FinalReviewers.Where(r => r.BusinessCapability.Equals(text));
            return Json(m, JsonRequestBehavior.AllowGet);
        }
    }
}