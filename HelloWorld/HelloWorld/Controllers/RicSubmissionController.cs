using System.Collections.Generic;
using System.Web.Http;
using System.Linq;
using HelloWorld.Models;
using System.Threading.Tasks;
using System.Data.Entity;

namespace HelloWorld.Controllers
{
    [RoutePrefix("RicSubmission")]
    public class RicSubmissionController : ApiController
    {
        RicStoredProcedures db = new RicStoredProcedures();
        
        [Route("SumbitForm")]
        [HttpPost]
        public async Task<RequestTable> PostSumbitForm(RequestTable requestTable)
        {
            if (ModelState.IsValid)
            {
                var result = await Task.Run(() => (db.InsertRequestTable(requestTable)));
                return (result == -1) ? requestTable : null;
                //return null; // RedirectToRoute("");
            }

            return null;
        }
   
    }
}

