package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Client;
import com.example.demo.entities.CreateProject;
import com.example.demo.entities.Employee;
import com.example.demo.entities.Login;
import com.example.demo.entities.Project;
import com.example.demo.services.ClientService;
import com.example.demo.services.EmployeeService;
import com.example.demo.services.LoginService;
import com.example.demo.services.ProjectService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {
	
	@Autowired
	ProjectService pservice;
	
	@Autowired
	ClientService cservice;
	
	@Autowired
	LoginService lservice;
	
	@Autowired
	EmployeeService eservice;
	
	@GetMapping("/getAllProjects")
	public List<Project> getAllProjects(){
		return pservice.getAll();
	}

	@GetMapping("/getAllActiveProjects")
	public List<Project> getActiveProject(){return pservice.getActiveProjects();}
	
	@GetMapping("/getProjectByEmpId/{empid}")
	public List<Project> getProjectByEmpId(@PathVariable("empid") int empid){
		return pservice.getProjectByEmpId(empid);
	}
	
	@GetMapping("/getProjectByLoginId/{loginid}")
	public List<Project> getProjectByLoginId(@PathVariable("loginid") int loginid){
		Login l = lservice.getLogin(loginid);
		Employee e = eservice.getEmployee(l);
		return pservice.getProjectByEmpId(e.getEmpId());
	}
	
	@PostMapping("/createProject")
	public Project insertProject(@RequestBody CreateProject project) {
		Client c = cservice.getById(project.getClientid());
		Employee e = eservice.getEmpById(project.getEmpid());
		
		Project p = new Project(project.getTitle(), project.getTechstack(), project.getDescription(), project.getDeadline(), true, project.getComments(), e, c);
		
		return pservice.InsertProject(p);
	}

	@PostMapping("/endProject/{pid}")
	public int EndProject(@PathVariable("pid")int pid){
		int end = pservice.EndProject(pid);
		if(end>0){
			return 1;
		}else{
			return 0;
		}
	}
	
	@GetMapping("/projecthistory")
	public List<Project>projecthistory(){return pservice.projecthistory();}
	
	
	@GetMapping("/getCurrentProject/{empid}")
	public List<Project>getCurrentProject(@PathVariable("empid")int id){return pservice.getCurrentProject(id);}
	
}
