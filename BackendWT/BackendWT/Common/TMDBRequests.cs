using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace BackendWT.Common
{
    public class TMDBRequests
    {
        private const string API_KEY = "bd1e11d67c79371f88dd6275035b637c";
        private const string BASE_URL = "https://api.themoviedb.org/3/";
        public const string BASE_IMG_URL = "https://image.tmdb.org/t/p/w500";
        public const string NO_IMAGE_URL = "https://rimatour.com/wp-content/uploads/2017/09/No-image-found.jpg";

        public static JObject SearchRecent() => GeneralSearch(BASE_URL + "movie/now_playing" + "?api_key=" + API_KEY);
        public static JObject SearchUpcoming() => GeneralSearch(BASE_URL + "movie/upcoming" + "?api_key=" + API_KEY);
        public static JObject SearchTopRated() => GeneralSearch(BASE_URL + "movie/top_rated" + "?api_key=" + API_KEY);

        private static JObject GeneralSearch(string requestUrl)
        {
            using (HttpClient httpClient = new HttpClient())
            {
                using (HttpRequestMessage request = new HttpRequestMessage(new HttpMethod("GET"), requestUrl))
                {
                    return HTTP_JSON_Response(httpClient, request);
                }
            }
        }

        public static JObject SearchByName(string movieName)
        {
            using (HttpClient httpClient = new HttpClient())
            {
                using (HttpRequestMessage request = new HttpRequestMessage(new HttpMethod("GET"), BASE_URL + "search/movie" + "?api_key=" + API_KEY + "&query=" + movieName))
                {
                    return HTTP_JSON_Response(httpClient, request); //Returns de JSON Object
                }
            }
        }

        public static JObject SearchMovieDetailsByMovieId(int id)
        {
            using (HttpClient httpClient = new HttpClient())
            {
                using (HttpRequestMessage request = new HttpRequestMessage(new HttpMethod("GET"), BASE_URL + "movie/" + id + "?api_key=" + API_KEY))
                {
                    return HTTP_JSON_Response(httpClient, request);
                }
            }
        }

        public static JObject SearchMovieProvidersByMovieId(int id)
        {
            String url = $"{BASE_URL}movie/{id}/watch/providers?api_key={API_KEY}";
            using (HttpClient httpClient = new HttpClient())
            {
                using (HttpRequestMessage request = new HttpRequestMessage(new HttpMethod("GET"), url))
                {
                    return HTTP_JSON_Response(httpClient, request);
                }
            }
        }


        private static JObject HTTP_JSON_Response(HttpClient httpClient, HttpRequestMessage request)
        {
            request.Headers.TryAddWithoutValidation("Client-ID", API_KEY);

            using (HttpResponseMessage response = httpClient.SendAsync(request).Result)
            {
                using (HttpContent content = response.Content)
                {
                    return JObject.Parse(content.ReadAsStringAsync().Result);
                }
            }
        }
    }
}