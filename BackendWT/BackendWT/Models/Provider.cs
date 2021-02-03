using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BackendWT.Models
{
    public class Provider
    {
        public Provider(byte providerId, string providerName)
        {
            ProviderId = providerId;
            ProviderName = providerName;
        }

        public byte ProviderId { get; set; }
        [Required]
        public string ProviderName { get; set; }

        public List<UserSubscriptions> UserSubscriptions { get; set; }
    }
}