namespace RealEstateAgencyApp.Asp.NetWebApi.Migrations
{
    using RealEstateAgencyApp.Asp.NetWebApi.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<RealEstateAgencyApp.Asp.NetWebApi.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(RealEstateAgencyApp.Asp.NetWebApi.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.
            context.Agents.AddOrUpdate(
                new Agent() { Name = "Pera Peric", License = "Lic1", Born = 1960, NumbOfSoldProperties = 15 },
                new Agent() { Name = "Mika Mikic", License = "Lic2", Born = 1970, NumbOfSoldProperties = 10 },
                new Agent() { Name = "Zika Zikic", License = "Lic3", Born = 1980, NumbOfSoldProperties = 15 });

            context.SaveChanges();

            context.Properties.AddOrUpdate(
                new Property() { Place = "Novi Sad", AgencyCode = "Nek01", ConstructionYear = 1974, Quadrature = 50, Price = 40000, AgentId = 1 },
                new Property() { Place = "Subotica", AgencyCode = " Nek02", ConstructionYear = 1990, Quadrature = 60, Price = 50000, AgentId = 2 },
                new Property() { Place = "Beograd", AgencyCode = "Nek03", ConstructionYear = 1995, Quadrature = 55, Price = 45000, AgentId = 3 },
                new Property() { Place = "Zrenjanin", AgencyCode = "Nek04", ConstructionYear = 2010, Quadrature = 70, Price = 60000, AgentId = 1 },
                new Property() { Place = "Sremska Mitrovica", AgencyCode = "Nek05", ConstructionYear = 2011, Quadrature = 72, Price = 61000, AgentId = 3 });

            context.SaveChanges();
        }
    }
}
