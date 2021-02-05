using BackendWT.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BackendWT.Controllers
{
    public class UsersSubscriptionsController : ApiController
    {
        // GET: api/UsersSubscriptions
        public List<UserSubscriptionsDTO> Get(string userId) => new UsersSubscriptionsRepository().GetUserSubscriptions(userId);

        // POST: api/UsersSubscriptions
        public bool Post([FromBody]UserSubscriptions userSubscription) => new UsersSubscriptionsRepository().AddUserSubscription(userSubscription);

        // PUT: api/UsersSubscriptions/5
        public bool Put(int id, DateTime paymentDate, string billingPeriod, double price)
        {
            return new UsersSubscriptionsRepository().UpdateUserSubscription(id, paymentDate, billingPeriod, price);
        }

        // DELETE: api/UsersSubscriptions/5
        public bool Delete(string userId, byte providerId) => new UsersSubscriptionsRepository().RemoveUserSubscription(userId, providerId);
    }
}
