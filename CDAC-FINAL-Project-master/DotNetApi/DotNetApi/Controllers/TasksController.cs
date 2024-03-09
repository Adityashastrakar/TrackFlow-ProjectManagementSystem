using DotNetApi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DotNetApi.Controllers
{
    [EnableCors]
    [Route("/[action]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        [HttpPost]
        public List<Tasktable> GetTasktables()
        {
            List<Tasktable> list = new List<Tasktable>();
            using(var db = new trackflowdbContext())
            {
                list = db.Tasktables.ToList();
            }
            return list;
        }

        [HttpPost]
        public Tasktable AddTasks([FromBody] Tasktable task)
        {
            using (var db = new trackflowdbContext())
            {
                db.Tasktables.Add(task);
                db.SaveChanges();
            }
            return task;
        }


        [HttpGet]
        public List<Tasktable> gettasksbypid(int pid)
        {
            List<Tasktable> tasks = new List<Tasktable>();
            using(var db = new trackflowdbContext())
            {
                tasks = db.Tasktables.Where(t => t.Pid == pid).ToList();
            }
            return tasks;
        }

        [HttpGet]
        public List<Tasktable> gettasksbyempid(int EmpId)
        {
            List<Tasktable> tasks = new List<Tasktable>();
            using (var db = new trackflowdbContext())
            {
                tasks = db.Tasktables.Where(t => t.Empid == EmpId).ToList();
            }
            return tasks;
        }

        [HttpGet]
        public List<Tasktable> getactivetasksbyempid(int EmpId)
        {
            List<Tasktable> tasks = new List<Tasktable>();
            using (var db = new trackflowdbContext())
            {
                tasks = db.Tasktables.Where(t => t.Empid == EmpId && t.Status == true).ToList();
            }
            return tasks;
        }

        [HttpGet]
        public int GetCompletedTaskCount(int EmpId)
        {
            int count = 0;
            using var db = new trackflowdbContext();
            {
                count = db.Tasktables.Count(t=> t.Progress == 100 && t.Empid == EmpId);
            }
            return count;
        }

        [HttpGet]
        public int GetIncompletedTaskCount(int EmpId)
        {
            int count = 0;
            using var db = new trackflowdbContext();
            {
                count = db.Tasktables.Count(t => t.Progress < 100 && t.Empid == EmpId);
            }
            return count;
        }

        [HttpPost]
        public void UpdateTaskStatus(int taskId, int  progress)
        {
            using (var db = new trackflowdbContext())
            {
                var taskToUpdate = db.Tasktables.FirstOrDefault(t => t.Tid == taskId);

                if (taskToUpdate != null)
                {
                   
                    taskToUpdate.Progress = progress;
                    db.SaveChanges();
                }
                else
                {
                    throw new Exception($"Task with ID {taskId} not found.");
                }
            }
        }
    }
}
