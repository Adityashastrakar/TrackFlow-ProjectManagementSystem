package com.example.demo.entities;
import java.sql.Date;

import jakarta.persistence.*;

@Entity
@Table(name="teams")
public class Team {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int teamid;
	
	@Column
	String comments;
	
	@Column(name="assignedDate")
	Date assigneddate;
	
	@Column
	boolean status;
	
	@Column
	Date releasedate;
	
	@OneToOne
	@JoinColumn(name = "empid")
	Employee empid;
	
	@ManyToOne
	@JoinColumn(name="pid")
	Project pid;

	public Team() {
		
	}
	
	public Team(String comments, Date assigneddate, boolean status, Employee empid,
			Project pid) {
		this.empid = empid;
		this.pid = pid;
		this.comments = comments;
		this.assigneddate = assigneddate;
		this.status = status;
	}

	public int getTeamid() {
		return teamid;
	}

	public void setTeamid(int teamid) {
		this.teamid = teamid;
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

	public boolean getStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public Date getReleasedate() {
		return releasedate;
	}

	public void setReleasedate(Date releasedate) {
		this.releasedate = releasedate;
	}

	public Employee getEid() {
		return empid;
	}

	public void setEid(Employee eid) {
		this.empid = eid;
	}

	public Project getPid() {
		return pid;
	}

	public void setPid(Project pid) {
		this.pid = pid;
	}

	@Override
	public String toString() {
		return "Team [teamid=" + teamid + ", comments=" + comments + ", assigneddate=" + assigneddate + ", status="
				+ status + ", releasedate=" + releasedate + ", empid=" + empid + ", pid=" + pid + "]";
	}
	
}
