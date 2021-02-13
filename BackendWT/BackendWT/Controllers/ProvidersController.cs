using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;
using BackendWT.Models;

namespace BackendWT.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ProvidersController : ApiController
    {

        public List<Provider> Get() => new ProvidersRepository().GetProviders();

        public bool Post([FromBody] Provider provider) => new ProvidersRepository().SaveProvider(provider);

        public bool Put(int providerId, Provider provider) => new ProvidersRepository().ChangeProvider(providerId, provider);

        public bool Delete(int provierId) => new ProvidersRepository().RemoveProvider(provierId);

    }
}
