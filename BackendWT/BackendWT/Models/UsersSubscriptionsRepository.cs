using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackendWT.Models
{
    public class UsersSubscriptionsRepository
    {
        internal List<UserSubscriptions> GetUserSubscriptions(string userId)
        {
            List<UserSubscriptions> userSubscriptions;
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                userSubscriptions = context.UserSubscriptions.Where(uSubs => uSubs.UserId == userId).ToList();
            }
            return userSubscriptions;
        }

        internal bool AddUserSubscription(UserSubscriptions userSubscription)
        {
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                UserSubscriptions uSub = context.UserSubscriptions
                    .Where(uSubs => uSubs.UserId == userSubscription.UserId && uSubs.ProviderId == userSubscription.ProviderId).FirstOrDefault();

                if (uSub == null)
                {
                    try
                    {
                        context.UserSubscriptions.Add(userSubscription);
                        context.SaveChanges();
                        return true;
                    } catch
                    {
                        return false;
                    }
                }
                return false;
            }
        }

        internal bool RemoveUserSubscription(string userId, byte providerId)
        {
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                UserSubscriptions uSub = context.UserSubscriptions
                    .Where(uSubs => uSubs.UserId == userId && uSubs.ProviderId == providerId).FirstOrDefault();
                if (uSub != null)
                {
                    context.UserSubscriptions.Remove(uSub);
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
        }





        internal bool UpdateUserSubscription(int id, DateTime paymentDate, string billingPeriod, double price)
        {
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                UserSubscriptions uSub = context.UserSubscriptions
                    .Where(uSubs => uSubs.UserSubscriptionsId == id).FirstOrDefault();
                if (uSub != null)
                {
                    uSub.PaymentDate = paymentDate;
                    uSub.BillingPeriod = billingPeriod;
                    uSub.Price = price;
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
        }
    }
}