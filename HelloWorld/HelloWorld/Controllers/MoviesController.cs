using Movies5.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HelloWorld.Controllers
{
    public class MoviesController : Controller
    {
        static List<Movie> _movie = new List<Movie>
        {
            new Movie
            {
                Id = 1, Title = "Lord of the Rings", ReleaseYear = 2002
            },
            new Movie
            {
                Id = 2, Title = "The two towers", ReleaseYear = 2004
            }
        };

        [HttpGet]
        public IEnumerable<Movie> Get()
        {
            return from r in _movie select r;
        }

        public ActionResult Index()
        {
            var m = (from r in _movie select r).ToList();
            return Json(m, JsonRequestBehavior.AllowGet); 
        }
        //    GET: Movies
        //   [Route("api/[controller]")]
        //    public ActionResult Index()
        //    {
        //        List<Movie> movie = new List<Movie>();
        //        Movie movie = new Movie { Id = 1, Title = "Lord of the Rings", ReleaseYear = 2002 };
        //        movie.Add(new Movie { Id = 2, Title = "The two towers", ReleaseYear = 2004 });
        //        var model = from r in movie select r;
        //        var model = Newtonsoft.Json.JsonConvert.SerializeObject(movie);
        //        return View(movie);
        //    }
    }
}
