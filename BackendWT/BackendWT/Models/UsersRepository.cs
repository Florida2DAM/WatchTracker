using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackendWT.Models
{
    public class UsersRepository
    {
        //internal List<User> GetUsers()
        //{
        //    List<User> users = new List<User>();
        //    using (WatchTrackerContext context = new WatchTrackerContext())
        //    {
        //        users = context.Users.ToList();
        //    }
        //    return users;
        //}

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
    }
}