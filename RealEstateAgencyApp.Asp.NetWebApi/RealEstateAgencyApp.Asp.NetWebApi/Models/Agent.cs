using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RealEstateAgencyApp.Asp.NetWebApi.Models
{
    public class Agent
    {

        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [StringLength(4, MinimumLength =4)]
        public string License { get; set; }
        [Required]
        [Range(1950,1995)]
        public int Born { get; set; }
        [Required]
        [Range(0, 50)]
        public int NumbOfSoldProperties { get; set; }
    }
}