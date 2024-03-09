package com.example.demo.entities;

public class UpdateCompany {
	double basicSal, incentives;
	int empid,role_id, designationID;
	
	public UpdateCompany() {
		
	}
	
	public UpdateCompany(int empid, double basicSal, double incentives, int role_id, int designationID) {
		super();
		this.empid = empid;
		this.basicSal = basicSal;
		this.incentives = incentives;
		this.role_id = role_id;
		this.designationID = designationID;
	}
	
	public int getEmpid() {
		return empid;
	}

	public void setEmpid(int empid) {
		this.empid = empid;
	}

	public double getBasicSal() {
		return basicSal;
	}
	public void setBasicSal(double basicSal) {
		this.basicSal = basicSal;
	}
	public double getIncentives() {
		return incentives;
	}
	public void setIncentives(double incentives) {
		this.incentives = incentives;
	}
	public int getRole_id() {
		return role_id;
	}
	public void setRole_id(int role_id) {
		this.role_id = role_id;
	}
	public int getDesignationID() {
		return designationID;
	}
	public void setDesignationID(int designationID) {
		this.designationID = designationID;
	}
	
	@Override
	public String toString() {
		return "UpdateCompany [basicSal=" + basicSal + ", incentives=" + incentives + ", role_id=" + role_id
				+ ", designationID=" + designationID + "]";
	}
}