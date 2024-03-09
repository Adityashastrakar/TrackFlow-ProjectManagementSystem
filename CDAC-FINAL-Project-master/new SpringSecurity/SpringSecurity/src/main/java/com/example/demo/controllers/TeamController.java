package com.example.demo.controllers;

import java.time.LocalDate;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.AddMember;
import com.example.demo.entities.DashboardDataByEmp;
import com.example.demo.entities.Employee;
import com.example.demo.entities.Project;
import com.example.demo.entities.Team;
import com.example.demo.services.EmployeeService;
import com.example.demo.services.ProjectService;
import com.example.demo.services.TeamService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TeamController {
	@Autowired
	TeamService tservice;
	
	@Autowired
	EmployeeService eservice;
	
	@Autowired
	ProjectService pservice;

	@PostMapping("/createTeam")
	public Team addTeam(@RequestBody AddMember meme) {
		Employee e = eservice.getEmpById(meme.getEmpid());
		Project p = pservice.getById(meme.getPid());
		LocalDate asignedtime =  LocalDate.now();
		java.sql.Date cdate = java.sql.Date.valueOf(asignedtime);
		Team t = new Team(meme.getComments(), cdate, true, e, p);
		
		return tservice.createTeam(t);
	}
	
	@GetMapping("/teamList/{pid}")
	public List<Team> teamList(@PathVariable("pid") int pid){
		return tservice.teamList(pid);
	}
	
	@PostMapping("/removeMember/{empid}")
	public int removeMember(@PathVariable("empid") int empid) {
		int update = tservice.removeMember(empid);
		if(update>0) {
			return 1;
		}else {
			return 0;
		}
	}
	
	@GetMapping("/dasboardDataByEmp/{empid}")
	public DashboardDataByEmp dasboardDataByEmp(@PathVariable("empid")int empId) {
		return tservice.dasboardDataByEmp(empId);
	}
}
