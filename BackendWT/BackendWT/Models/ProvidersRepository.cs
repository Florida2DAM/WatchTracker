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
    }
}