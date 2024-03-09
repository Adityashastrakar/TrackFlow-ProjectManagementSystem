package com.example.demo.entities;

import java.sql.Date;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonFormat;
@Component
public class TeamDetails {
	String title, fullname, comments;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	Date assigned_date;
	
	public TeamDetails() {
		
	}
	
	public TeamDetails(String title, String fullname, String comments, Date assigned_date) {
		super();
		this.title = title;
		this.fullname = fullname;
		this.comments = comments;
		this.assigned_date = assigned_date;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public Date getAssigned_date() {
		return assigned_date;
	}

	public void setAssigned_date(Date assigned_date) {
		this.assigned_date = assigned_date;
	}
}
