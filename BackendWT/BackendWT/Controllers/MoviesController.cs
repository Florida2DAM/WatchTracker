using BackendWT.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BackendWT.Controllers
{
    public class MoviesController : ApiController
    {
        public Movie Get(int movieId, string userId) => new MoviesRepository().Retrieve(movieId, userId);//Añadir usuario y película ID (ahora están hardcodeados)

        [HttpGet]
        public List<MovieDTO> Get(string movieName) => new MoviesRepository().SearchMovies(movieName);
        // POST: api/Movies
        public void Post([FromBody] UserMovies userMovies) => new MoviesRepository().Save(userMovies);

        // PUT: api/Movies/5
        public void Put(int movieId, string userId, string userSatus, DateTime userDate, int userVote) => new MoviesRepository().UpdateUserMovie(movieId, userId, userSatus, userDate, userVote);

        // DELETE: api/Movies/5
        public void Delete(int movieId, string userId) => new MoviesRepository().Remove(movieId, userId);
    }
}
