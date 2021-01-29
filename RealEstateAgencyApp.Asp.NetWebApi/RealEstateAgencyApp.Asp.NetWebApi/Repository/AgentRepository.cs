using RealEstateAgencyApp.Asp.NetWebApi.Interfaces;
using RealEstateAgencyApp.Asp.NetWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RealEstateAgencyApp.Asp.NetWebApi.Repository
{
    public class AgentRepository :IDisposable, IAgentRepository

    {

        private ApplicationDbContext db = new ApplicationDbContext();

        public IEnumerable<Agent> GetAll()
        {
            return db.Agents;
        }

        public IEnumerable<Agent> GetExtremes()
        {
            var min = db.Agents.Min(a => a.NumbOfSoldProperties);
            var max = db.Agents.Max(a => a.NumbOfSoldProperties);

            var agents = db.Agents.Where(a => a.NumbOfSoldProperties == min & a.NumbOfSoldProperties == max).OrderByDescending(a => a.NumbOfSoldProperties);
            return agents;
        }

        public IEnumerable<Agent> GetYoungest()
        {
            var youngest = db.Agents.OrderByDescending(a => a.Born);
            return youngest;
        }
        public Agent GetById(int id)
        {
            return db.Agents.Find(id);
        }

        private void Dispose(bool disposing)
        {
            if(disposing)
            {
                if(db!=null)
                {
                    db.Dispose();
                    db = null;
                }
            }
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }


    }
}