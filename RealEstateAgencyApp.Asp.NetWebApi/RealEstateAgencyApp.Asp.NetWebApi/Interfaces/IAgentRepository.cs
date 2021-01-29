using RealEstateAgencyApp.Asp.NetWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealEstateAgencyApp.Asp.NetWebApi.Interfaces
{
   public  interface IAgentRepository
    {
        IEnumerable<Agent> GetAll();
        IEnumerable<Agent> GetExtremes();
        IEnumerable<Agent> GetYoungest();
        Agent GetById(int id);
        
       


    }
}
