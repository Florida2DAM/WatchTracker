namespace BackendWT.Models
{
    public class MovieDTO
    {

        public MovieDTO(int movieId, string poster, string title, double voteAverage, string overview)
        {
            MovieId = movieId;
            Poster = poster;
            Title = title;
            VoteAverage = voteAverage;
            Overview = overview;
        }

        public int MovieId { get; set; }
        public string Poster { get; set; }
        public string Title { get; set; }
        public double VoteAverage { get; set; }
        public string Overview { get; set; }

    }
}