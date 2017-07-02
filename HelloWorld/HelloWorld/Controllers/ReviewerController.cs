using System.Collections.Generic;
using System.Web.Http;
using System.Linq;
using HelloWorld.Models;
using System.Threading.Tasks;
using System.Data.Entity;

namespace HelloWorld.Controllers
{
    [RoutePrefix("Reviewer")]
    public class ReviewerController : ApiController
    {
        MovieContext db = new MovieContext();

        [Route("BusinessCapabilities")]
        [HttpGet]
        public async Task<List<string>> GetBusinessCapabilities()
        {
            var result = await db.FinalReviewers.Select(grp => grp.BusinessCapability).Distinct().ToListAsync();
            return result; 
        }

        [Route("FinalReviewer")]
        [HttpPost]
        public async Task<string> GetFinalReviewer(FinalReviewers business)
        {
            var result = await db.FinalReviewers.Where(obj => obj.BusinessCapability.Equals(business.BusinessCapability))
                .Select(obj => obj.DowId).FirstAsync();

            return result;
        }
   
    }
}

