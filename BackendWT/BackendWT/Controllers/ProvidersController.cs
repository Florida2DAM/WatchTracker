﻿using System;
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
        public bool Post([FromBody] Provider provider) => new ProvidersRepository().SaveProvider(provider);
        public bool Put(byte providerId, Provider provider) => new ProvidersRepository().ChangeProvider(providerId, provider);
        public bool Delete(byte provierId) => new ProvidersRepository().RemoveProvider(provierId);
    }
}
