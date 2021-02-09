using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BackendWT.Models;

namespace BackendWT.Controllers
{
    public class ProvidersController : ApiController
    {
        public List<Provider> Get() => new ProvidersRepository().GetProviders();
    }
}
