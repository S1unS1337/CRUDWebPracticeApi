using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUDWebPracticeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public EmployeeController(AppDbContext appDbContext)
        {

            _appDbContext = appDbContext;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            if(_appDbContext.Employees == null)
            {
                return NotFound();
            }

            return await _appDbContext.Employees.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            if (_appDbContext.Employees == null)
            {
                return NotFound();
            }

            var employee = await _appDbContext.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound(id);
            }
            return employee;
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            _appDbContext.Employees.Add(employee);

            await _appDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployee), new { Id = employee.Id}, employee);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutEmployee(int id, Employee employee)
        {
            if(id != employee.Id)
            {
                return BadRequest();
            }

            _appDbContext.Entry(employee).State = EntityState.Modified;

            try
            {
                await _appDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                throw;
            }

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            if(_appDbContext.Employees == null) 
            {
                return NotFound();
            }

            var employee = await _appDbContext.Employees.FindAsync(id);

            if(employee == null)
            {
                return NotFound();
            }
            _appDbContext.Employees.Remove(employee);
            await _appDbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
