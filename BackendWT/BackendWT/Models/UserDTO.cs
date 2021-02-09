using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackendWT.Models
{
    public class UserDTO
    {
        public string UserId { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime Birthday { get; set; }
        public byte[] Image { get; set; }

        public UserDTO(string userId, string email, string name, string surname, DateTime birthday, byte[] image)
        {
            UserId = userId;
            Email = email;
            Name = name;
            Surname = surname;
            Birthday = birthday;
            Image = image;
        }
    }
}