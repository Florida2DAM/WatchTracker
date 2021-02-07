using BackendWT.Common;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackendWT.Models
{
    public class MoviesRepository
    {
        internal Movie Retrieve(int movieId, string userId)
        {
            string baseImgUrl = TMDBRequests.BASE_IMG_URL;
            JObject jsonDetails = TMDBRequests.SearchMovieDetailsByMovieId(movieId);
            JObject jsonProviders = TMDBRequests.SearchMovieProvidersByMovieId(movieId);

            string posterPath = jsonDetails["poster_path"] != null ? baseImgUrl + jsonDetails["poster_path"] : null;
            JToken esProviders = null;
            List<String> providerLogos = new List<String>();

            if (jsonProviders["results"]["ES"] != null)
                esProviders = jsonProviders["results"]["ES"]["flatrate"];//rent//buy//flatrate
            if (esProviders != null)
            {
                foreach (var provider in esProviders.Children())
                {
                    providerLogos.Add(baseImgUrl + (string)provider["logo_path"]);
                }
            }

            Movie movie = new Movie((int)jsonDetails["id"], posterPath, (string)jsonDetails["title"], (double)jsonDetails["vote_average"], (string)jsonDetails["release_date"],
                (string)jsonDetails["overview"], (double)jsonDetails["popularity"], (int)jsonDetails["vote_count"], (int)jsonDetails["runtime"], providerLogos, null, DateTime.MinValue, -1, null);
            UserMovies userMovie;
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                userMovie = context.UserMovies.Where(um => um.MovieId == movieId && um.UserId == userId).FirstOrDefault();
            }
            if (userMovie != null)
            {
                movie.UserStatus = userMovie.UserStatus;
                movie.UserDate = userMovie.UserDate;
                movie.UserVote = userMovie.UserVote;
                movie.UserId = userMovie.UserId;
            }

            return movie;
        }

        internal List<MovieDTO> SearchMovies(string movieName)
        {
            string baseImgUrl = TMDBRequests.BASE_IMG_URL;
            JObject jsonMovies = TMDBRequests.SearchByName(movieName);
            JToken movies;
            List<MovieDTO> moviesDTO = new List<MovieDTO>();
            try
            {
                movies = jsonMovies["results"];
            }
            catch (NullReferenceException)
            {
                movies = null;
            }
            if (movies != null)
            {
                foreach (var movie in movies.Children())
                {
                    moviesDTO.Add(new MovieDTO((int)movie["id"], baseImgUrl + (string)movie["poster_path"], (string)movie["title"], (double)movie["vote_average"], (string)movie["overview"]));
                }
            }
            return moviesDTO;
        }


        internal List<MoviePosterDTO> GetRecentMovies() => GetGeneral(1);
        internal List<MoviePosterDTO> GetTopRatedMovies() => GetGeneral(2);
        internal List<MoviePosterDTO> GetUpcomingMovies() => GetGeneral(3);
        private List<MoviePosterDTO> GetGeneral(byte option)
        {
            JObject jsonMovies = null;
            switch (option)
            {
                case 1:
                    jsonMovies = TMDBRequests.SearchRecent();
                    break;
                case 2:
                    jsonMovies = TMDBRequests.SearchUpcoming();
                    break;
                case 3:
                    jsonMovies = TMDBRequests.SearchTopRated();
                    break;
                default:
                    return null;
            }
            JToken movies;
            List<MoviePosterDTO> moviePosterDTOs = new List<MoviePosterDTO>();
            try
            {
                movies = jsonMovies["results"];
            }
            catch (NullReferenceException)
            {
                movies = null;
            }
            if (movies != null)
            {
                foreach (var movie in movies.Children())
                {
                    moviePosterDTOs.Add(new MoviePosterDTO((int)movie["id"], TMDBRequests.BASE_IMG_URL + (string)movie["poster_path"], (string)movie["title"]));
                }
            }
            return moviePosterDTOs;
        }

        internal void Save(UserMovies userMovies)
        {
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                context.UserMovies.Add(userMovies);
                context.SaveChanges();
            }
        }

        internal void UpdateUserMovie(int movieId, string userId, string userStatus, DateTime userDate, int userVote)
        {
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                UserMovies userMovie = context.UserMovies.Where(um => um.MovieId == movieId && um.UserId == userId).FirstOrDefault();
                userMovie.UserStatus = userStatus;
                userMovie.UserDate = userDate;
                userMovie.UserVote = userVote;
                context.SaveChanges();
            }
        }

        internal void Remove(int movieId, string userId)
        {
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                UserMovies userMovie = context.UserMovies.Where(um => um.MovieId == movieId && um.UserId == userId).FirstOrDefault();
                if (userMovie != null)
                    context.UserMovies.Remove(userMovie);
                context.SaveChanges();
            }
        }
    }
}