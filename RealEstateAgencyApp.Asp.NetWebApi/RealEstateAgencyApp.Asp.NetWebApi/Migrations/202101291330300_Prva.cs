namespace RealEstateAgencyApp.Asp.NetWebApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Prva : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Properties", "AgencyCode", c => c.String(nullable: false, maxLength: 6));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Properties", "AgencyCode", c => c.String(nullable: false, maxLength: 5));
        }
    }
}
