using System;
using System.ComponentModel.DataAnnotations;

namespace BackendWT.Models
{
    public class User
    {

        public string UserId { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
        [Required]
        public DateTime Birthday { get; set; }
        public byte[] Image { get; set; }
        public DateTime RegisterDate { get; set; }
        public bool Active { get; set; }

        public User(string userId, string password, string email, string name, string surname, DateTime birthday, byte[] image,
            DateTime registerDate, bool active)
        {
            UserId = userId;
            Password = password;
            Email = email;
            Name = name;
            Surname = surname;
            Birthday = birthday;
            Image = image;
            RegisterDate = registerDate;
            Active = active;
        }

    }

}