using System.Collections.Generic;
using System.Web.Http;

namespace BackendWT.Controllers
{
    public class ValuesController : ApiController
    {

        public IEnumerable<string> Get() => new string[] { "value1", "value2" };

    }
}
