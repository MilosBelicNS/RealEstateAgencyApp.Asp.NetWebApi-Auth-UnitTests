using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;

using Microsoft.AspNetCore.Cors;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Practices.Unity;
using Newtonsoft.Json.Serialization;
using ProductService.Resolver;
using RealEstateAgencyApp.Asp.NetWebApi.Interfaces;
using RealEstateAgencyApp.Asp.NetWebApi.Repository;


namespace RealEstateAgencyApp.Asp.NetWebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));


            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

           

            // Unity
            var container = new UnityContainer();
            container.RegisterType<IAgentRepository, AgentRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IPropertyRepository, PropertyRepository>(new HierarchicalLifetimeManager());
            config.DependencyResolver = new UnityResolver(container);
        }
    }
}
