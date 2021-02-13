using BackendWT.Models;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BackendWT.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UsersSubscriptionsController : ApiController
    {

        public List<UserSubscriptionsDTO> Get(string userId) => new UsersSubscriptionsRepository().GetUserSubscriptions(userId);

        public bool Post([FromBody]UserSubscriptions userSubscription) => new UsersSubscriptionsRepository().AddUserSubscription(userSubscription);

        public bool Put(int id, DateTime paymentDate, string billingPeriod, double price)
        {
            return new UsersSubscriptionsRepository().UpdateUserSubscription(id, paymentDate, billingPeriod, price);
        }

        public bool Delete(string userId, int providerId) => new UsersSubscriptionsRepository().RemoveUserSubscription(userId, providerId);

    }
}
