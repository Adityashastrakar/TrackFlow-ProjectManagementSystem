package com.example.demo.entities;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class CreateProject {
	
    public String title, techstack, description, status, comments;
    public int empid, clientid;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    public Date deadline;

    public CreateProject() {
    	
    }
    	
	public CreateProject(String title, String techstack, String description, Date deadline, String status,
			String comments, int empid, int clientid) {
		super();
		this.title = title;
		this.techstack = techstack;
		this.description = description;
		this.deadline = deadline;
		this.status = status;
		this.comments = comments;
		this.empid = empid;
		this.clientid = clientid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTechstack() {
		return techstack;
	}

	public void setTechstack(String techstack) {
		this.techstack = techstack;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getDeadline() {
		return deadline;
	}

	public void setDeadline(Date deadline) {
		this.deadline = deadline;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public int getEmpid() {
		return empid;
	}

	public void setEmpid(int empid) {
		this.empid = empid;
	}

	public int getClientid() {
		return clientid;
	}

	public void setClientid(int clientid) {
		this.clientid = clientid;
	}

	@Override
	public String toString() {
		return "CreateProject [title=" + title + ", techstack=" + techstack + ", description=" + description
				+ ", deadline=" + deadline + ", status=" + status + ", comments=" + comments + ", empid=" + empid
				+ ", clientid=" + clientid + "]";
	}
	 
}
