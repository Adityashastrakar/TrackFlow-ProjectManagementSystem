package com.example.demo.entities;

import java.sql.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int pid;

    @Column
    public String title;

    @Column
    public String techstack;

    @Column
    public String description;

    @Column
    public Date deadline;

    @Column(name = "status")
    public boolean status;

    @Column
    public String comments;

    @ManyToOne
    @JoinColumn(name = "empid")
    public Employee empid;

    @ManyToOne
    @JoinColumn(name = "clientid")
    public Client clientid;

    public Project() {
    	
    }
    
	public Project(String title, String techstack, String description, Date deadline, boolean status, String comments,
			Employee empid, Client clientid) {
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
	
	

	public Project(Employee empid) {
		super();
		this.empid = empid;
	}

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTectstack() {
		return techstack;
	}

	public void setTectstack(String techstack) {
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

	public boolean getStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public Employee getEmpid() {
		return empid;
	}

	public void setEmpid(Employee empid) {
		this.empid = empid;
	}

	public Client getClient() {
		return clientid;
	}

	public void setClient(Client client) {
		this.clientid = client;
	}

	@Override
	public String toString() {
		return "Project [pid=" + pid + ", title=" + title + ", techstack=" + techstack + ", description=" + description
				+ ", deadline=" + deadline + ", status=" + status + ", comments=" + comments + ", empid=" + empid
				+ ", clientid=" + clientid + "]";
	} 
    
}
