using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BackendWT.Models
{
    public class UserSubscriptions
    {
        public UserSubscriptions(int userSubscriptionsId, string providerName, DateTime paymentDate, string billingPeriod, double price, string userId, byte providerId)
        {
            UserSubscriptionsId = userSubscriptionsId;
            ProviderName = providerName;
            PaymentDate = paymentDate;
            BillingPeriod = billingPeriod;
            Price = price;
            UserId = userId;
            ProviderId = providerId;
        }

        public int UserSubscriptionsId { get; set; }
        [Required]
        public string ProviderName { get; set; }
        [Required]
        public DateTime PaymentDate { get; set; }
        [Required]
        public string BillingPeriod { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public byte ProviderId { get; set; }
        public User User { get; set; }
        public Provider Provider { get; set; }
    }
}