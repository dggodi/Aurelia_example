using System.Collections.Generic;
using System.Web.Http;
using System.Linq;
using HelloWorld.Models;
using System.Threading.Tasks;
using System.Data.Entity;

namespace HelloWorld.Controllers
{
    [RoutePrefix("Users")]
    public class UsersController : ApiController
    {
        MovieContext db = new MovieContext();

        [Route("AllUsers")]
        [HttpGet]
        public async Task<List<Users>> AllUsers()
        {
            var result = await db.users.ToListAsync();
            return result;
        }

        [Route("SearchByName")]
        [HttpGet]
        public async Task<List<Users>> SearchByName(string name)
        {
            var result = await db.users.Where(r => r.LastName.StartsWith(name)).ToListAsync();
            return result;
        }

        [Route("SearchById")]
        [HttpGet]
        public async Task<Users> SearchById(string id)
        {
            var result = await db.users.Where(r => r.DowId.Equals(id)).FirstAsync();
            return result;
        }

    }
}