package com.example.demo.services;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import com.example.demo.entities.*;
import com.example.demo.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

	@Autowired
	EmployeeRepository erepo;
	
	@Autowired
	LoginRepository lrepo;
	
	@Autowired
	RoleRepository rrepo;
	
	@Autowired
	DesignationRepository drepo;

	@Autowired
	ClientRepository crepo;

	@Autowired
	ProjectRepository prepo;
	
	public Employee saveEmployee(Employee emp)
	{
		Employee saved = null;
		try {
			saved = erepo.save(emp);
		}
		catch (Exception e) {
			saved = null;
		}
		return saved;
	}
	
	public Employee getEmployee(Login l)
	{
		return erepo.getEmployee(l);
	}
	
	public List<Employee> getActiveEmployees()
	{
		return erepo.getActiveEmployees();
	}
	
	public List<Employee> employeeHistory(){
		return erepo.employeeHistory();
	}
	
	public List<Employee> getManagers()
	{
		return erepo.getManagers();
	}
	
	
	public List<Employee> getBenchEmployees()
	{
		return erepo.getBenchEmployees();
	}
	
	public List<Employee> getAllEmp(){
		return erepo.findAll();
	}
	
	public Employee getEmpById(int id) {
		Employee emp = null;
		Optional<Employee> opt_emp = erepo.findById(id);
		try {
			emp = opt_emp.get();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return emp;
	}
	
	public Employee UpdateAll(UpdateCompany emp) {//int
		Optional<Employee> empok = erepo.findById(emp.getEmpid());
		Employee employee = empok.get();
		Login login = employee.getLogin_id();
		Role role = rrepo.findById(emp.getRole_id()).get();
		Designation designation = drepo.findById(emp.getDesignationID()).get();
		login.setRole(role);
		employee.setBasicSal(emp.getBasicSal());
		employee.setIncentives(emp.getIncentives());
		employee.setLogin_id(login);//
		employee.setDesg(designation);
		employee.setEmpId(emp.getEmpid());
		return erepo.save(employee);
	}


	public Employee  UpdatePersnolInfo(UpdatePersonalInfo emp){
		Optional<Employee> empOpt = erepo.findById(emp.getEmpid());
		Employee employee = empOpt.get();
		employee.setFullName(emp.getFullname());
		employee.setCurrentAddress(emp.getCurrentAddress());
		employee.setPermanentAddress(emp.getPermanentAddress());
		employee.setPhNo(emp.getPhNo());
		employee.setEmail(emp.getEmail());
		employee.setNationality(emp.getNationality());

		erepo.save(employee);
		return  employee;
	}

	public int InactiveAcc(int empid) {
		try {
			Optional<Employee> empok = erepo.findById(empid);
			if(empok.isPresent()) {
				Employee employee = erepo.findById(empid).get();//
				Login login = employee.getLogin_id();//
				login.setActive(false);
				lrepo.save(login);
				return 1;
			}else {
				return 0;
			}
		}catch(Exception e) {
			e.printStackTrace();
			return -1;
		}
	}

	public DashboardData getDashboardData(){
		DashboardData dd = new DashboardData();
		dd.setEmpdata(erepo.countEmp());
		dd.setProjectdata(prepo.countProject());
		dd.setClientdata(crepo.countClients());
		return dd;
	}
}