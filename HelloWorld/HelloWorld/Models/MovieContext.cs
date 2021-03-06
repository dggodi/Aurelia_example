﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using Movies5.Model;

namespace HelloWorld.Models
{
    public class MovieContext : DbContext
    {
        public MovieContext() : base("name=connectionStringContext") { }

        public DbSet<Movie> movies { get; set; }
        public DbSet<Users> users { get; set; }
        public DbSet<FinalReviewers> FinalReviewers { get; set; }
        //public DbSet<RequestTable> RequestTable { get; set; }

        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<RequestTable>().MapToStoredProcedures();
        //    base.OnModelCreating(modelBuilder);
        //}
    }

    
}