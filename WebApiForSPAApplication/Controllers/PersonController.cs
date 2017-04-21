using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Xml.Linq;
using WebApiForSPAApplication.Models;

namespace WebApiForSPAApplication.Controllers
{
    public class PersonController : ApiController
    {
        public List<Person> personList = new List<Person>();
        //{
        //    new Person() { Id = 1, Name = "A", Age = 20 },
        //    new Person() { Id = 2, Name = "B", Age = 25 },
        //    new Person() { Id = 3, Name = "C", Age = 30 },
        //    new Person() { Id = 4, Name = "D", Age = 35 }
        //};
        // GET: api/Person
        public IHttpActionResult Get()
        {
            XDocument doc = XDocument.Load("C://People.xml");
            foreach (XElement person in doc.Descendants("Person"))
            {
                Person newPerson = new Person();
                foreach (XElement item in person.Nodes())
                {
                    if (item.Name.ToString().Equals("Id"))
                        newPerson.Id = Convert.ToInt16(item.Value);
                    else if (item.Name.ToString().Equals("Name"))
                        newPerson.Name = item.Value;
                    else
                        newPerson.Age = Convert.ToInt16(item.Value);
                }
                personList.Add(newPerson);
            }

            return Ok(personList);
        }

        //// GET: api/Person/5
        //public IHttpActionResult Get(int id)
        //{
        //    Person selectedPeron = personList.Where(m => m.Id == id).SingleOrDefault();
        //    if (selectedPeron != null)
        //        return Ok(selectedPeron);
        //    else
        //        return BadRequest("No results found!");

        //}

        // POST: api/Person
        public IHttpActionResult Post([FromBody]Person person)
        {
            XDocument doc = XDocument.Load("C://People.xml");
            doc.Root.Add(new XElement("Person",
                    new XElement("Id", person.Id),
                    new XElement("Name", person.Name),
                    new XElement("Age", person.Age)));
            doc.Save("C://People.xml");

            return Ok("Person successfully added");
        }

        // PUT: api/Person/5
        public IHttpActionResult Put(int id, [FromBody]Person person)
        {
            XDocument doc = XDocument.Load("C://People.xml");
            //var query = from c in doc.Descendants("Band") select c;
            foreach (XElement docPerson in doc.Descendants("Id"))
            {
                if (Convert.ToInt16(docPerson.Value) == id)
                {
                    foreach (XElement node in docPerson.Parent.Nodes())
                    {
                        if (node.Name.ToString().Equals("Id"))
                            node.SetValue(person.Id);
                        else if (node.Name.ToString().Equals("Name"))
                            node.SetValue(person.Name);
                        else
                            node.SetValue(person.Age);
                    }
                    doc.Save("C://People.xml");
                    return Ok("Person successfully updated");

                }                
            }            
            return BadRequest("Person does not exist!");
        }

        // DELETE: api/Person/5
        public IHttpActionResult Delete(int id)
        {
            XDocument doc = XDocument.Load("C://People.xml");

            foreach (XElement docPerson in doc.Descendants("Id"))
            {
                if (Convert.ToInt16(docPerson.Value) == id)
                {
                    docPerson.Parent.Remove();
                    doc.Save("C://People.xml");
                    return Ok("Person successfully removed");

                }              
            }
            return BadRequest("Person does not exist!");
        }
    }
}
