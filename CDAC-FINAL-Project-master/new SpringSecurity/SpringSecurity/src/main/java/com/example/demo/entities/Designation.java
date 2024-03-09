package com.example.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "designation")
public class Designation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int designationid;
	
	@Column
	String designation_name;	
	
	public int getDesignationID() {
		return designationid;
	}

	public void setDesignationID(int designationid) {
		this.designationid = designationid;
	}

	public String getDesignationName() {
		return designation_name;
	}

	public void setDesignationName(String designation_name) {
		this.designation_name = designation_name;
	}

}
