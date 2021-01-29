using RealEstateAgencyApp.Asp.NetWebApi.Interfaces;
using RealEstateAgencyApp.Asp.NetWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;

namespace RealEstateAgencyApp.Asp.NetWebApi.Repository
{
    public class PropertyRepository: IDisposable, IPropertyRepository
    {

        private ApplicationDbContext db = new ApplicationDbContext();

        public IEnumerable<Property> GetAll()
        {
            return db.Properties.Include(p => p.Agent).OrderByDescending(p => p.Price);
        }

        public IEnumerable<Property> SearchByYear(int built)
        {
            var propertiesRes = db.Properties.Where(p => p.ConstructionYear < built).OrderBy(p => p.ConstructionYear);
            return propertiesRes;
        }

        public IEnumerable<Property> SearchByQuadrature(Filter filter)
        {
            var filterProperties = db.Properties.Where(p => p.Quadrature >= filter.Min & filter.Max >= p.Quadrature).OrderBy(p => p.Quadrature);
            return filterProperties;
        }

        public Property GetById(int id)
        {
            return db.Properties.Find(id);
        }

        public void Create(Property property)
        {
             db.Properties.Add(property);
            db.SaveChanges();
        }

        public void Update(Property property)
        {
            db.Entry(property).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }catch(DbUpdateConcurrencyException)
            {
                throw;
            }
        }
        public void Delete(Property property)
        {
            db.Properties.Remove(property);
            db.SaveChanges();
        }

        private void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (db != null)
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