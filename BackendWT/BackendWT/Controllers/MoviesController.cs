using BackendWT.Models;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BackendWT.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MoviesController : ApiController
    {

        public Movie Get(int movieId, string userId) => new MoviesRepository().GetMovieDetails(movieId, userId);

        [HttpGet]
        public List<MovieDTO> Get(string movieName) => new MoviesRepository().SearchMovies(movieName);

        [HttpGet]
        [Route("api/Movies/UserMovies")]
        public List<MovieDTO> GetUserMovies(string userId) => new MoviesRepository().GetUserMovies(userId);

        [HttpGet]
        [Route("api/Movies/Recent")]
        public List<MoviePosterDTO> GetRecent() => new MoviesRepository().GetRecentMovies();

        [HttpGet]
        [Route("api/Movies/Upcoming")]
        public List<MoviePosterDTO> GetUpcoming() => new MoviesRepository().GetUpcomingMovies();

        [HttpGet]
        [Route("api/Movies/TopRated")]
        public List<MoviePosterDTO> GetTopRated() => new MoviesRepository().GetTopRatedMovies();

        [HttpGet]
        [Route("api/Movies/MostListed")]
        public List<String[]> MostListed() => new MoviesRepository().GetMostListedMovies();

        public void Post([FromBody] UserMovies userMovies) => new MoviesRepository().Save(userMovies);

        public void Put(int movieId, string userId, string userSatus, DateTime userDate, int userVote) => new MoviesRepository().UpdateUserMovie(movieId, userId, userSatus, userDate, userVote);

        public void Delete(int movieId, string userId) => new MoviesRepository().Remove(movieId, userId);

    }
}
