using System;
using System.ComponentModel.DataAnnotations;

namespace BackendWT.Models
{
    public class UserSubscriptions
    {

        public UserSubscriptions(int userSubscriptionsId, string providerName, DateTime paymentDate, string billingPeriod, double price, string userId, int providerId)
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
        public int ProviderId { get; set; }
        public User User { get; set; }
        public Provider Provider { get; set; }

    }

    public class UserSubscriptionsDTO : UserSubscriptions
    {

        public UserSubscriptionsDTO(int userSubscriptionsId, string providerName, DateTime paymentDate, string billingPeriod, double price, string userId, int providerId, byte[] providerLogo) : 
            base (userSubscriptionsId, providerName, paymentDate, billingPeriod, price, userId, providerId)
        {
            ProviderLogo = providerLogo;
        }

        public byte[] ProviderLogo { get; set; }

    }
}