using System;

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
        public DateTime RegisterDate { get; set; }
        public bool Active { get; set; }

        public UserDTO(string userId, string email, string name, string surname, DateTime birthday, byte[] image, 
            DateTime registerDate, bool active)
        {
            UserId = userId;
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