using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BackendWT.Models
{
    public class UserMovies
    {
        public int UserMoviesId { get; set; }
        [Required]
        public int MovieId { get; set; }
        [Required]
        public string UserStatus { get; set; }
        [Required]
        public DateTime UserDate { get; set; }
        [Required]
        public int UserVote { get; set; }
        [Required]
        public string UserId { get; set; }
        public User User { get; set; }

        public UserMovies(int userMoviesId, int movieId, string userStatus, DateTime userDate, int userVote, string userId)
        {
            UserMoviesId = userMoviesId;
            MovieId = movieId;
            UserStatus = userStatus;
            UserDate = userDate;
            UserVote = userVote;
            UserId = userId;
        }
    }
}