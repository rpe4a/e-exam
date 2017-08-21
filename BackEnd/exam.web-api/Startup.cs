using System.Web.Http;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(exam.web_api.Startup))]

namespace exam.web_api
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var httpConfiguration = new HttpConfiguration();



            app.UseWebApi(httpConfiguration);
        }
    }
}
