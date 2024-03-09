package com.example.demo.entities;

public class DashboardDataByEmp {
	int passigned,empguided, pworkedon;

	public DashboardDataByEmp() {
		
	}
	
	public DashboardDataByEmp(int passigned, int empguided, int pworkedon) {
		super();
		this.passigned = passigned;
		this.empguided = empguided;
		this.pworkedon = pworkedon;
	}

	public int getPassigned() {
		return passigned;
	}

	public void setPassigned(int passigned) {
		this.passigned = passigned;
	}

	public int getEmpguided() {
		return empguided;
	}

	public void setEmpguided(int empguided) {
		this.empguided = empguided;
	}

	public int getPworkedon() {
		return pworkedon;
	}

	public void setPworkedon(int pworkedon) {
		this.pworkedon = pworkedon;
	}

	@Override
	public String toString() {
		return "DashboardDataByEmp [passigned=" + passigned + ", empguided=" + empguided + ", pworkedon=" + pworkedon
				+ "]";
	}
	
	
}
