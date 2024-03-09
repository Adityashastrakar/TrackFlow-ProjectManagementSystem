package com.example.demo.controllers;

import java.util.List;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.example.demo.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.services.DesignationService;
import com.example.demo.services.EmployeeService;
import com.example.demo.services.LoginService;
import com.example.demo.services.RoleService;

import jakarta.websocket.server.PathParam;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {
	
	@Autowired
	EmployeeService eservice;
	
	@Autowired
	LoginService lservice;
	
	@Autowired
	RoleService rservice;
	
	@Autowired
	DesignationService dservice;
	
	@Autowired
	PasswordEncoder encoder;
	
	
 	@GetMapping("/getEmployee/{loginid}")
 	public Employee getEmployee(@PathVariable("loginid") int loginid)
 	{
 		Login l = lservice.getLogin(loginid);
 		return eservice.getEmployee(l);
 	}
 	
 	@GetMapping("/getActiveEmployees")
 	public List<Employee> getActiveEmployees()
 	{
 		return eservice.getActiveEmployees();
 	}
 	
 	@GetMapping("/getBenchEmployees")
 	public List<Employee> getBenchEmployees()
 	{
 		return eservice.getBenchEmployees();
 	}
 	
 	@GetMapping("/getManagers")
 	public List<Employee> getManagers()
 	{
 		return eservice.getManagers();
 	}
 	
 	@GetMapping("/emphistory")
 	public List<Employee> employeeHistory(){
 		return eservice.employeeHistory();
 	}
 	
 	
 	@PostMapping("/regEmployee")
 	public Employee regEmployee(@RequestBody AddEmployee emp)
 	{
 		System.out.println(emp);
 		Role r = rservice.getById(emp.getRole_id());
 		Login l = new Login(emp.getUsername(), encoder.encode(emp.getPassword()), r, true);
 		Designation d = dservice.getById(emp.getDesignationID()); 		
 		Login saved=lservice.save(l);
 		
 		Employee e= new Employee(emp.getFullname(),emp.getDob(),emp.getGender(),emp.getNationality() ,emp.getEmail(),emp.getPhNo(),emp.getCurrentAddress(),emp.getPermanentAddress(),emp.getBasicSal(), emp.getIncentives(), emp.getHireDate(), d, saved);
 		
 		return eservice.saveEmployee(e);	
 	}
 	
 	@GetMapping("/getallEmp")
	public List<Employee> getAll(){
		return eservice.getAllEmp();
	}
 	
 	@GetMapping("/getOneEmp/{userid}")
 	public Employee getEmpById(@PathVariable("userid") int empid) {
 		return eservice.getEmpById(empid);
 	}
 	
 	@PostMapping("/updateall")
	public Employee UpdateAll(@RequestBody UpdateCompany emp) {
 		return eservice.UpdateAll(emp);
	}

	@PostMapping("/updatepersonals")
	public Employee UpdatePersnolInfo(@RequestBody UpdatePersonalInfo emp){
		System.out.println(emp);
		return eservice.UpdatePersnolInfo(emp);
	}


 	@PostMapping("/inactiveEmp/{userid}")
 	public int InactiveAcc(@PathVariable("userid")int id) {
 		return eservice.InactiveAcc(id);
 	}

	 @GetMapping("/getDashboardData")
	public DashboardData getDashboardData(){
		 return eservice.getDashboardData();
	}
}