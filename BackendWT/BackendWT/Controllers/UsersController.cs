using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BackendWT.Models;

namespace BackendWT.Controllers
{
    public class UsersController : ApiController
    {
        // GET: api/Users
        //public List<User> Get() => new UsersRepository().GetUsers();

        [HttpGet]
        public bool CheckUsername(string userId) => new UsersRepository().CheckUsername(userId);
        [HttpGet]
        public bool CheckEmail(string email) => new UsersRepository().CheckEmail(email);

        // POST: api/Users
        public bool Post([FromBody] User user) => new UsersRepository().SaveUser(user);

        //// PUT: api/Users/5
        //public void Put(int id, [FromBody] string value) { }

        //// DELETE: api/Users/5
        //public bool Delete(string userId) => new UsersRepository().RemoveUser(userId);
    }
}
