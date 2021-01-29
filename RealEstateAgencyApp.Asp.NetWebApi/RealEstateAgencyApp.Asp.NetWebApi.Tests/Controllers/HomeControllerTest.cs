using Microsoft.VisualStudio.TestTools.UnitTesting;
using RealEstateAgencyApp.Asp.NetWebApi;
using RealEstateAgencyApp.Asp.NetWebApi.Controllers;
using System.Web.Mvc;

namespace RealEstateAgencyApp.Asp.NetWebApi.Tests.Controllers
{
    [TestClass]
    public class HomeControllerTest
    {
        [TestMethod]
        public void Index()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act
            ViewResult result = controller.Index() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Home Page", result.ViewBag.Title);
        }
    }
}
