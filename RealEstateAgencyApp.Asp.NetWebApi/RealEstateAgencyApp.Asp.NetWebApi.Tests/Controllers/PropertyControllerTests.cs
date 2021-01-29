using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using RealEstateAgencyApp.Asp.NetWebApi.Controllers;
using RealEstateAgencyApp.Asp.NetWebApi.Interfaces;
using RealEstateAgencyApp.Asp.NetWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Results;

namespace RealEstateAgencyApp.Asp.NetWebApi.Tests.Controllers
{
    [TestClass]
    public class PropertyControllerTests
    {
        [TestMethod]
        public void GetReturnsProductWithSameId()
        {
            // Arrange
            var mockRepository = new Mock<IPropertyRepository>();
            mockRepository.Setup(x => x.GetById(42)).Returns(new Property { Id = 42 });

            var controller = new PropertiesController(mockRepository.Object);

            // Act
            IHttpActionResult actionResult = controller.GetById(42);
            var contentResult = actionResult as OkNegotiatedContentResult<Property>;

            // Assert
            Assert.IsNotNull(contentResult);
            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual(42, contentResult.Content.Id);
        }

        

        [TestMethod]
        public void PutReturnsBadRequest()
        {
            // Arrange
            var mockRepository = new Mock<IPropertyRepository>();
            var controller = new PropertiesController(mockRepository.Object);

            // Act
            IHttpActionResult actionResult = controller.Put(10, new Property { Id = 9, Place = "Place2" });

            // Assert
            Assert.IsInstanceOfType(actionResult, typeof(BadRequestResult));
        }
        [TestMethod]
        public void DeleteReturnsNotFound()
        {
            // Arrange 
            var mockRepository = new Mock<IPropertyRepository>();
            var controller = new PropertiesController(mockRepository.Object);

            // Act
            IHttpActionResult actionResult = controller.Delete(10);

            // Assert
            Assert.IsInstanceOfType(actionResult, typeof(NotFoundResult));
        }


        [TestMethod]
        public void GetReturnsMultipleObjects()
        {
            // Arrange
            List<Property> properties = new List<Property>();
            properties.Add(new Property { Id = 1, Place = "Place1" });
            properties.Add(new Property { Id = 2, Place = "Place2" });

            var mockRepository = new Mock<IPropertyRepository>();
            mockRepository.Setup(x => x.GetAll()).Returns(properties.AsEnumerable());
            var controller = new PropertiesController(mockRepository.Object);

            // Act
            IEnumerable<Property> result = controller.GetAll();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(properties.Count, result.ToList().Count);
            Assert.AreEqual(properties.ElementAt(0), result.ElementAt(0));
            Assert.AreEqual(properties.ElementAt(1), result.ElementAt(1));
        }
    }
}
