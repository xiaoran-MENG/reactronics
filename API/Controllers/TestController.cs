using System;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TestController : BaseController
    {
        [HttpGet("not-found")]
        public ActionResult NotFound404()
        {
            return NotFound();
        }

        [HttpGet("bad-request")]
        public ActionResult BadRequest400()
        {
            return BadRequest("Bad request");
        }

        [HttpGet("unauthorized")]
        public ActionResult Unauthorized401()
        {
            return Unauthorized();
        }

        [HttpGet("invalid")]
        public ActionResult Invalid()
        {
            ModelState.AddModelError("Error 1", "First error");
            ModelState.AddModelError("Error 2", "Second error");
            ModelState.AddModelError("Error 3", "Third error");
            return ValidationProblem();
        }

        [HttpGet("server-error")]
        public ActionResult ServerError500()
        {
            throw new Exception("Server error");
        }
    }
}