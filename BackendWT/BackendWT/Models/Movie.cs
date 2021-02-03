using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackendWT.Models
{
    public class Movie
    {
        public Movie(int movieId, string poster, string title, double voteAverage, string releaseDate, string overview, double popularity, int voteCount,
            int runtime, List<String> providers, string userStatus, DateTime userDate, int userVote, string userId)
        {
            MovieId = movieId;
            Poster = poster;
            Title = title;
            VoteAverage = voteAverage;
            ReleaseDate = releaseDate;
            Overview = overview;
            Popularity = popularity;
            VoteCount = voteCount;
            Runtime = runtime;
            Providers = providers;
            UserStatus = userStatus;
            UserDate = userDate;
            UserVote = userVote;
            UserId = userId;
        }

        public int MovieId { get; set; }
        public string Poster { get; set; }
        public string Title { get; set; }
        public double VoteAverage { get; set; }
        public string ReleaseDate { get; set; }
        public string Overview { get; set; }
        public double Popularity { get; set; }
        public int VoteCount { get; set; }
        public int Runtime { get; set; }
        public List<String> Providers { get; set; }

        public string UserStatus { get; set; }
        public DateTime UserDate { get; set; }
        public int UserVote { get; set; }
        public string UserId { get; set; }
    }
}