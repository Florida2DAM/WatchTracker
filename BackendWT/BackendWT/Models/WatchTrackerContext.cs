using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
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
            string[] providersLogos = {
                "p_Netflix.jpg", "p_Prime_Video.jpg", "p_HBO.jpg", "p_Disney_Plus.jpg", "p_Apple_TV.jpg", "p_Crunchyroll.jpg", 
                "p_Movistar_Plus.jpg", "p_Youtube.jpg", "p_Filmin.jpg", "p_ATRESPlayer.jpg", "p_Mitele.jpg", "p_FUBOTV.jpg"
            };

            for (byte i = 1; i <= providerNames.Length; i++)
            {
                modelBuilder.Entity<Provider>().HasData(new Provider(i, providerNames[i - 1], File.ReadAllBytes(@"Assets/" + providersLogos[i - 1])));
            }
            //foreach (var providerName in providerNames)
            //{
            //    //modelBuilder.Entity<Provider>().HasData(new Provider(providerId, providerName, BackendWT.Common.ImageHelper.
            //    //    GetImageByteArray("https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Netflix-new-icon.png/480px-Netflix-new-icon.png")));
            //    //modelBuilder.Entity<Provider>().HasData(new Provider(providerId, providerName, File.ReadAllBytes(@"Assets/p_Netflix.jpg")));
            //    modelBuilder.Entity<Provider>().HasData(new Provider(providerId, providerName, File.ReadAllBytes(@"Assets/" + providersLogos[providerId-1])));
            //    providerId++;
            //}

            modelBuilder.Entity<UserSubscriptions>().HasData(
                new UserSubscriptions(1, "Netflix", DateTime.Now.AddMonths(1), "Monthly", 9.95, "jolame", 1));
            modelBuilder.Entity<UserSubscriptions>().HasData(
                new UserSubscriptions(2, "Crunchyroll", DateTime.Now.AddMonths(1), "Monthly", 9.95, "jolame", 6));
        }
    }
}