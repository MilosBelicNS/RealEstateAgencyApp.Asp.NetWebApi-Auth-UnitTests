using RealEstateAgencyApp.Asp.NetWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealEstateAgencyApp.Asp.NetWebApi.Interfaces
{
   public  interface IPropertyRepository
    {

        IEnumerable<Property> GetAll();
        IEnumerable<Property> SearchByYear(int built);
        IEnumerable<Property> SearchByQuadrature(Filter filter);
        Property GetById(int id);
        void Create(Property property);
        void Update(Property property);
        void Delete(Property property);
    }
}
