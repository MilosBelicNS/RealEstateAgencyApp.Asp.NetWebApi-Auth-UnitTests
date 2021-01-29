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
    public class PropertiesController : ApiController
    {


        public IPropertyRepository _repository { get; set; }


        public PropertiesController(IPropertyRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<Property> GetAll()
        {
            return _repository.GetAll();
        }

        [Authorize]
        public IEnumerable<Property> SearchByYear(int built)
        {
            return _repository.SearchByYear(built);
        }
        [Authorize]
        [Route("api/search")]
        public IEnumerable<Property> SearchByQuadrature(Filter filter)
        {
            return _repository.SearchByQuadrature(filter);
        }
        

        [Authorize]
        [ResponseType(typeof(Property))]
        public IHttpActionResult GetById(int id)
        {
            var property = _repository.GetById(id);

            if (property == null)
            {
                return NotFound();
            }

            return Ok(property);
        }

        [Authorize]
        [ResponseType(typeof(Property))]
        public IHttpActionResult Delete(int id)
        {
            var property = _repository.GetById(id);

            if (property == null)
            {
                return NotFound();
            }

             _repository.Delete(property);
            return Ok();
        }
        [Authorize]
        [ResponseType(typeof(Property))]
        public IHttpActionResult Post(Property property)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repository.Create(property);

            return CreatedAtRoute("DefaultApi", new { Id = property.Id }, property);
        }

        [Authorize]
        [ResponseType(typeof(Property))]
        public IHttpActionResult Put(int id, Property property)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != property.Id)
            {
                return BadRequest();
            }

            try
            {
                _repository.Update(property);
            }
            catch
            {
                return BadRequest();
            }

            return Ok(property);
        }



    }
}
