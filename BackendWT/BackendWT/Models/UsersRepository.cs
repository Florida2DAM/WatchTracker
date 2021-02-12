using System;
using System.Collections.Generic;
using System.Linq;

namespace BackendWT.Models
{
    public class UsersRepository
    {

        const string DEFAULT_IMG_B64 = "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";

        internal List<UserNoImgDTO> GetAllUsers()
        {
            List<UserNoImgDTO> usersDTO = new List<UserNoImgDTO>();
            List<User> users = null;
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                users = context.Users.ToList();
            }
            foreach (var user in users)
            {
                if (user.Image == null)
                    user.Image = Convert.FromBase64String(DEFAULT_IMG_B64);
                usersDTO.Add(new UserNoImgDTO(user.UserId, user.Email, user.Name, user.Surname, user.Birthday, user.RegisterDate, user.Active));
            }
            return usersDTO;
        }

        internal UserDTO GetUserData(string userId)
        {
            UserDTO userDTO = null;
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                User user = context.Users.Where(u => u.UserId == userId).FirstOrDefault();
                if (user != null)
                {
                    if (user.Image == null)
                        user.Image = Convert.FromBase64String(DEFAULT_IMG_B64);
                    userDTO = new UserDTO(user.UserId, user.Email, user.Name, user.Surname, user.Birthday, user.Image, user.RegisterDate, user.Active);
                }
            }
            return userDTO;
        }

        internal bool CheckLogin(string userId, string password)
        {
            User user;
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                user = context.Users.Where(u => u.UserId == userId && u.Password == password).FirstOrDefault();
            }
            if (user == null || !user.Active)
                return false;
            else
                return true;
        }

        internal bool CheckUsername(string userId)
        {
            User user;
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                user = context.Users.Where(u => u.UserId == userId).FirstOrDefault();
            }
            if (user == null)
                return false;
            else
                return true;
        }

        internal bool CheckEmail(string email)
        {
            User user;
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                user = context.Users.Where(u => u.Email == email).FirstOrDefault();
            }
            if (user == null)
                return false;
            else
                return true;
        }

        internal bool SaveUser(User user)
        {
            user.RegisterDate = DateTime.Now.Date;
            user.Active = true;
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                User u = context.Users.Where(x => x.UserId == user.UserId || x.Email == user.Email).FirstOrDefault();
                if (u == null)
                {
                    context.Users.Add(user);
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
        }

        internal bool RemoveUser(string userId)
        {
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                User user = context.Users.Where(u => u.UserId == userId).FirstOrDefault();
                if (user != null)
                {
                    context.Users.Remove(user);
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
        }

        internal bool ChangeImage(string userId, User us)
        {
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                User user = context.Users.Where(u => u.UserId == userId).FirstOrDefault();
                if (user != null)
                {
                    user.Image = us.Image;
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
        }

        internal bool ChangePassword(string userId, string oldPassword, string newPassword)
        {
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                User user = context.Users.Where(u => u.UserId == userId && u.Password == oldPassword).FirstOrDefault();
                if (user != null)
                {
                    user.Password = newPassword;
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
        }

        internal bool ChangeUserData(string userId, User bodyUs)
        {
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                User user = context.Users.Where(u => u.UserId == userId).FirstOrDefault();
                if (user != null)
                {
                    user.Name = bodyUs.Name;
                    user.Surname = bodyUs.Surname;
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
        }

        internal int[] GetUserStatusCount(string userId)
        {
            int[] listStatusCount = new int[3];
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                listStatusCount[0] = context.UserMovies.Where(u => u.UserId == userId && u.UserStatus == "Watching").Count();
                listStatusCount[1] = context.UserMovies.Where(u => u.UserId == userId && u.UserStatus == "Watched").Count();
                listStatusCount[2] = context.UserMovies.Where(u => u.UserId == userId && u.UserStatus == "Plan to Watch").Count();
            }
            return listStatusCount;
        }

        internal bool ChangeUserActive(string userId)
        {
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                User user = context.Users.Where(u => u.UserId == userId).FirstOrDefault();
                if (user != null)
                {
                    user.Active = !user.Active;
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
        }

        internal bool GenerateNewUserPassword(string userId)
        {
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                User user = context.Users.Where(u => u.UserId == userId).FirstOrDefault();
                if (user != null)
                {
                    string unhashedPassword = CreateRandomPassword();
                    user.Password = HashPassword(unhashedPassword);
                    context.SaveChanges();
                    new Common.MailSender(user, unhashedPassword).sendMail();
                    return true;
                }
                return false;
            }
        }

        private string CreateRandomPassword()
        {
            const string validChars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*?_-";
            Random random = new Random();

            char[] chars = new char[10];
            for (int i = 0; i < 10; i++)
            {
                chars[i] = validChars[random.Next(0, validChars.Length)];
            }
            string password = new string(chars);
            return password;
        }

        private string HashPassword(string password)
        {
            System.Security.Cryptography.MD5CryptoServiceProvider md5 = new System.Security.Cryptography.MD5CryptoServiceProvider();
            byte[] passwordBytes = System.Text.Encoding.UTF8.GetBytes(password);
            passwordBytes = md5.ComputeHash(passwordBytes);
            System.Text.StringBuilder hashedPassword = new System.Text.StringBuilder();
            foreach (byte passwordByte in passwordBytes)
            {
                hashedPassword.Append(passwordByte.ToString("x2").ToLower());
            }
            return hashedPassword.ToString();
        }

        internal List<String[]> GetRegistersPerDay()
        {
            List<String[]> registersPerDay = new List<String[]>();
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                var values = context.Users.GroupBy(u => u.RegisterDate)
                    .Select(g => new
                    {
                        RegisterDate = g.Key.ToString().Substring(0, 10),
                        Count = g.Count()
                    }).ToList();

                foreach (var value in values)
                {
                    registersPerDay.Add(new String[] { value.RegisterDate.ToString(), value.Count.ToString() });
                }
            }
            return registersPerDay;
        }

    }
}