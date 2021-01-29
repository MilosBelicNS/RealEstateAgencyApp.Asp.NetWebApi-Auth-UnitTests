using System;
using System.Reflection;

namespace RealEstateAgencyApp.Asp.NetWebApi.Areas.HelpPage.ModelDescriptions
{
    public interface IModelDocumentationProvider
    {
        string GetDocumentation(MemberInfo member);

        string GetDocumentation(Type type);
    }
}