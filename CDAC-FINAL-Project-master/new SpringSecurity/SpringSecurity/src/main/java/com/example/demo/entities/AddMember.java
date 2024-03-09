package com.example.demo.entities;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class AddMember {
	int empid, pid;
	String comments;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	Date assigneddate;
	
	public AddMember() {
		
	}
	

	public AddMember(int empid, int pid, String comments) {
		super();
		this.empid = empid;
		this.pid = pid;
		this.comments = comments;
	}


	public int getEmpid() {
		return empid;
	}

	public void setEmpid(int empid) {
		this.empid = empid;
	}

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public Date getAssigneddate() {
		return assigneddate;
	}

	public void setAssigneddate(Date assigneddate) {
		this.assigneddate = assigneddate;
	}
}
