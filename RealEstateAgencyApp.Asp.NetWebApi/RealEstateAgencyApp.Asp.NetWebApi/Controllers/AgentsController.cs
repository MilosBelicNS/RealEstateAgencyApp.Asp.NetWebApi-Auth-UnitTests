using RealEstateAgencyApp.Asp.NetWebApi.Interfaces;
using RealEstateAgencyApp.Asp.NetWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace RealEstateAgencyApp.Asp.NetWebApi.Controllers
{
    public class AgentsController : ApiController
    {


        public IAgentRepository _repository { get; set; }

        public AgentsController(IAgentRepository repository)
        {
            _repository = repository;
        }

        
        public IEnumerable<Agent> GetAll()
        {
            return _repository.GetAll();
        }

        [Authorize]
        [Route("api/extremes")]
        public IEnumerable<Agent> GetExtremes()
        {
            return _repository.GetExtremes();
        }

        [Authorize]
        [Route("api/youngest")]
        public IEnumerable<Agent> GetYoungest()
        {
            return _repository.GetYoungest();
        }

        [Authorize]
        [ResponseType(typeof(Agent))]
        public IHttpActionResult GetById(int id)
        {
            var agent = _repository.GetById(id);

            if (agent == null)
            {
                return NotFound();
            }

            return Ok(agent);
        }
    }
}
