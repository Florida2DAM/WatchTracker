using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;
using BackendWT.Models;

namespace BackendWT.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
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

        [HttpGet]
        [Route("api/Users/Registers")]
        public List<String[]> Registers() => new UsersRepository().GetRegistersPerDay();

        public bool Post([FromBody] User user) => new UsersRepository().SaveUser(user);

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

        public bool Delete(string userId) => new UsersRepository().RemoveUser(userId);

    }
}
