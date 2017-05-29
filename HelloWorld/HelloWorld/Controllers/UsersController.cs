﻿using HelloWorld.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HelloWorld.Controllers
{
    public class UsersController : Controller
    {
        MovieContext db = new MovieContext();
        
        // GET: Users
        public ActionResult Index()
        {
            var m = db.users.ToList();
            return Json(m, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult Search(string text)
        {
            var m = db.users.Where(r => r.LastName.StartsWith(text));
            return Json(m, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult SearchById(string id)
        {
            var m = db.users.Where(r => r.DowId ==id);
            return Json(m, JsonRequestBehavior.AllowGet);
        }
    }
}