using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackendWT.Models
{
    public class WatchTrackerContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<UserMovies> UserMovies { get; set; }
        public DbSet<Provider> Providers { get; set; }
        public DbSet<UserSubscriptions> UserSubscriptions { get; set; }

        public WatchTrackerContext() { }

        public WatchTrackerContext(DbContextOptions options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
                optionsBuilder.UseMySql("Server=127.0.0.1;Database=WatchTracker;Uid=root;Pwd=''; SslMode = none");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<UserMovies>(entity => entity.HasKey(e => e.UserMoviesId));
            modelBuilder.Entity<UserMovies>().HasIndex(uMovies => new { uMovies.MovieId, uMovies.UserId }).IsUnique();//MultiIndex for unique columns (Movie - User)
            modelBuilder.Entity<User>().HasData(new User("jolame", "1234", "jolame@gmail.es", "Jose", "Lacueva", DateTime.Now, null));
            modelBuilder.Entity<User>().HasData(new User("alalma", "1234", "alvaro@gmail.com", "Alvaro", "Alepuz", DateTime.Now, null));
            modelBuilder.Entity<UserMovies>().HasData(new UserMovies(1, 1726, "Watched", DateTime.Now, 9, "jolame"));
            modelBuilder.Entity<UserMovies>().HasData(new UserMovies(2, 557, "Watching", DateTime.Now, 10, "jolame"));
            modelBuilder.Entity<UserMovies>().HasData(new UserMovies(3, 557, "Watching", DateTime.Now, 8, "alalma"));

            byte providerId = 1;
            string[] providerNames = {
                "Netflix", "Prime Video", "HBO", "Disney Plus", "Apple TV", "Crunchyroll",
                "Movistar Plus", "Youtube Premium", "Filmin", "ATRESPlayer", "Mitele", "FuboTV"
            };
            foreach (var providerName in providerNames)
            {
                modelBuilder.Entity<Provider>().HasData(new Provider(providerId, providerName));
                providerId++;
            }

            modelBuilder.Entity<UserSubscriptions>().HasData(
                new UserSubscriptions(1, "Netflix", DateTime.Now.AddMonths(1), "Monthly", 9.95, "jolame", 1));
        }
    }
}