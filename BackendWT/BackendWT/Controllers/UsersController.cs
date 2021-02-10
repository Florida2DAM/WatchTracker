using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using BackendWT.Models;

namespace BackendWT.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class UsersController : ApiController
    {
        [HttpGet]
        [Route("api/Users/GetAllUsers")]
        public List<UserNoImgDTO> GetAllUsers() => new UsersRepository().GetAllUsers();
        [HttpGet]
        public bool CheckUsername(string userId) => new UsersRepository().CheckUsername(userId);
        [HttpGet]
        public bool CheckEmail(string email) => new UsersRepository().CheckEmail(email);
        [HttpGet]
        public bool CheckLogin(string userId, string password) => new UsersRepository().CheckLogin(userId, password);
        [HttpGet]
        [Route("api/Users/UserStatusCount")]
        public int[] UserStatusCount(string userId) => new UsersRepository().GetUserStatusCount(userId);
        [HttpGet]
        [Route("api/Users/UserData")]
        public UserDTO UserData(string userId) => new UsersRepository().GetUserData(userId);

        // POST: api/Users
        public bool Post([FromBody] User user) => new UsersRepository().SaveUser(user);

        //// PUT: api/Users/5
        [HttpPut]
        public bool Put(string userId, string oldPassword, string newPassword) => new UsersRepository().ChangePassword(userId, oldPassword, newPassword);
        [HttpPut]
        [Route("api/Users/ChangeData")]
        public bool PutData(string userId, [FromBody] User user) => new UsersRepository().ChangeUserData(userId, user);
        [HttpPut]
        [Route("api/Users/ChangeUserActive")]
        public bool ChangeUserActive(string userId) => new UsersRepository().ChangeUserActive(userId);
        [HttpPut]
        [Route("api/Users/GeneratePassword")]
        public bool GeneratePassword(string userId) => new UsersRepository().GenerateNewUserPassword(userId);
        [HttpPut]
        public bool Put(string userId,[FromBody] User user) => new UsersRepository().ChangeImage(userId, user);

        //// DELETE: api/Users/5
        public bool Delete(string userId) => new UsersRepository().RemoveUser(userId);
    }
}
