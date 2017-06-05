using HelloWorld.Models;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

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

        //[HttpPost]
        //[AsyncTimeout(2000)]
        public ActionResult Search([Bind(Include = "BusinessCapability")]FinalReviewers text)
        {
            var result = db.FinalReviewers.Where(obj => obj.BusinessCapability.Equals(text.BusinessCapability))
                .Select(obj => obj.DowId);

            //var m = db.FinalReviewers.Where(r => r.BusinessCapability.Equals(text));
            //if (result == null )
            //    return HttpNotFound();

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        //[HttpPost]
        //public ActionResult Search(FinalReviewers text)
        //{
        //    var result = db.FinalReviewers.Where(obj => obj.BusinessCapability.Equals(text.BusinessCapability))
        //        .Select(obj => obj.DowId);
        //    return Json(result, JsonRequestBehavior.AllowGet);
        //}
    }
}

//string _jsonObject = data.Replace(@"\", string.Empty);
//var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
//Dictionary<string, string> jsonObject = serializer.Deserialize<Dictionary<string, string>>(_jsonObject);


//        return Json(new object{status = true});
