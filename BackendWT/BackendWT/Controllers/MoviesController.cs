using BackendWT.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BackendWT.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
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

        // POST: api/Movies
        public void Post([FromBody] UserMovies userMovies) => new MoviesRepository().Save(userMovies);

        // PUT: api/Movies/5
        public void Put(int movieId, string userId, string userSatus, DateTime userDate, int userVote) => new MoviesRepository().UpdateUserMovie(movieId, userId, userSatus, userDate, userVote);

        // DELETE: api/Movies/5
        public void Delete(int movieId, string userId) => new MoviesRepository().Remove(movieId, userId);
    }
}
