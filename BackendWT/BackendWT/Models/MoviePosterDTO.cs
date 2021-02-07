using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackendWT.Models
{
    public class MoviePosterDTO
    {
        public MoviePosterDTO(int movieId, string poster, string title)
        {
            MovieId = movieId;
            Poster = poster;
            Title = title;
        }

        public int MovieId { get; set; }
        public string Poster { get; set; }
        public string Title { get; set; }
    }
}