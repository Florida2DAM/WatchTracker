using BackendWT.Common;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BackendWT.Models
{
    public class MoviesRepository
    {

        internal Movie GetMovieDetails(int movieId, string userId)
        {
            string baseImgUrl = TMDBRequests.BASE_IMG_URL;
            JObject jsonDetails = TMDBRequests.SearchMovieDetailsByMovieId(movieId);
            JObject jsonProviders = TMDBRequests.SearchMovieProvidersByMovieId(movieId);

            string posterPath = (string)jsonDetails["poster_path"];
            if (posterPath != null)
                posterPath = baseImgUrl + posterPath;
            else
                posterPath = TMDBRequests.NO_IMAGE_URL;
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
            Movie movie = null;
            try
            {
                movie = new Movie((int)jsonDetails["id"], posterPath, (string)jsonDetails["title"], (double)jsonDetails["vote_average"], (string)jsonDetails["release_date"],
                (string)jsonDetails["overview"], (double)jsonDetails["popularity"], (int)jsonDetails["vote_count"], (int)jsonDetails["runtime"], providerLogos, null, DateTime.MinValue, -1, null);
            }
            catch (ArgumentException)
            {
                return null;
            }
            
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
                    if ((string)movie["poster_path"] != null)
                        moviesDTO.Add(new MovieDTO((int)movie["id"], baseImgUrl + (string)movie["poster_path"], (string)movie["title"], (double)movie["vote_average"], (string)movie["overview"]));
                    else
                        moviesDTO.Add(new MovieDTO((int)movie["id"], TMDBRequests.NO_IMAGE_URL, (string)movie["title"], (double)movie["vote_average"], (string)movie["overview"]));
                }
            }
            return moviesDTO;
        }

        internal List<MovieDTO> GetUserMovies(string userId)
        {
            List<MovieDTO> userMovies = new List<MovieDTO>();
            List<int> userMoviesId;
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                userMoviesId = context.UserMovies.Where(u => u.UserId == userId).Select(m => m.MovieId).ToList();
            }
            foreach (var id in userMoviesId)
            {
                Movie movie = GetMovieDetails(id, userId);
                userMovies.Add(new MovieDTO(movie.MovieId, movie.Poster, movie.Title, movie.VoteAverage, movie.Overview));
            }
            return userMovies;
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
                    if ((string)movie["poster_path"] != null)
                        moviePosterDTOs.Add(new MoviePosterDTO((int)movie["id"], TMDBRequests.BASE_IMG_URL + (string)movie["poster_path"], (string)movie["title"]));
                    else
                        moviePosterDTOs.Add(new MoviePosterDTO((int)movie["id"], TMDBRequests.NO_IMAGE_URL, (string)movie["title"]));
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

        internal List<String[]> GetMostListedMovies()
        {
            
            List<String[]> listedMovies = new List<String[]>();
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                var values = context.UserMovies
                    .GroupBy(um => um.MovieId)
                    .OrderByDescending(um => um.Count())
                    .Select(g => new { MovieID = g.Key.ToString(), Count = g.Count() })
                    .ToList();

                int i = 0;
                foreach (var value in values)
                {
                    if (i == 5)
                        break;
                    JObject jsonDetails = TMDBRequests.SearchMovieDetailsByMovieId(int.Parse(value.MovieID));
                    listedMovies.Add(new String[] { (string)jsonDetails["title"], value.Count.ToString() });
                    i++;
                }
            }
            return listedMovies;
        }

    }
}