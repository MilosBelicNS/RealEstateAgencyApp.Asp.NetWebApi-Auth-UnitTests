using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RealEstateAgencyApp.Asp.NetWebApi.Models
{
    public class Property
    {

        public int Id { get; set; }
        [Required]
        [StringLength(40)]
        public string Place { get; set; }
        [Required]
        [StringLength(6)]
        public string AgencyCode { get; set; }
        [Required]
        [Range(1900,2018)]
        public int ConstructionYear { get; set; }
        [Required]
        [Range(3, 1500)]
        public decimal Quadrature { get; set; }
        [Required]
        [Range(1, 100000)]
        public decimal Price { get; set; }
        public int AgentId { get; set; }
        public Agent Agent { get; set; }
    }
}