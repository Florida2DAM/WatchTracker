using System;

namespace BackendWT.Models
{
    public class UserNoImgDTO
    {

        public string UserId { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime Birthday { get; set; }
        public DateTime RegisterDate { get; set; }
        public bool Active { get; set; }

        public UserNoImgDTO(string userId, string email, string name, string surname, DateTime birthday, DateTime registerDate, bool active)
        {
            UserId = userId;
            Email = email;
            Name = name;
            Surname = surname;
            Birthday = birthday;
            RegisterDate = registerDate;
            Active = active;
        }

    }
}