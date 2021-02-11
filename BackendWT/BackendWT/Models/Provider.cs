using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BackendWT.Models
{
    public class Provider
    {
        public Provider(int providerId, string providerName, byte[] providerLogo)
        {
            ProviderId = providerId;
            ProviderName = providerName;
            ProviderLogo = providerLogo;
        }

        public int ProviderId { get; set; }
        [Required]
        public string ProviderName { get; set; }
        public byte[] ProviderLogo { get; set; }

        public List<UserSubscriptions> UserSubscriptions { get; set; }
    }
}