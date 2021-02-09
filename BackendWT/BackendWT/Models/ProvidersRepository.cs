using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackendWT.Models
{
    public class ProvidersRepository
    {
        internal List<Provider> GetProviders()
        {
            List<Provider> providers;
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                providers = context.Providers.ToList();
            }
            return providers;
        }

        internal bool SaveProvider(Provider provider)
        {
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                Provider p = context.Providers.Where(x => x.ProviderId == provider.ProviderId).FirstOrDefault();
                if (p == null)
                {
                    context.Providers.Add(provider);
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
        }

        internal bool ChangeProvider(byte providerId, Provider provider)
        {
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                Provider p = context.Providers.Where(x => x.ProviderId == providerId).FirstOrDefault();
                if (p != null)
                {
                    p.ProviderName = provider.ProviderName;
                    if (provider.ProviderLogo != null)
                        p.ProviderLogo = provider.ProviderLogo;
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
        }

        internal bool RemoveProvider(byte providerId)
        {
            using (WatchTrackerContext context = new WatchTrackerContext())
            {
                Provider provider = context.Providers.Where(x => x.ProviderId == providerId).FirstOrDefault();
                if (provider != null)
                {
                    context.Providers.Remove(provider);
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
        }
    }
}