package com.example.demo.entities;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class AddEmployee {

		//Dummy Entity
		String username,password,nationality,fullname,gender,email,phNo,currentAddress,permanentAddress;
		double basicSal,incentives;
		int role_id, designationID;
		@JsonFormat(pattern = "yyyy-MM-dd")
		Date hireDate,dob;
		
		public String getNationality() {
			return nationality;
		}
		public void setNationality(String nationality) {
			this.nationality = nationality;
		}
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public String getGender() {
			return gender;
		}
		public void setGender(String gender) {
			this.gender = gender;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public String getFullname() {
			return fullname;
		}
		public void setFullname(String fullname) {
			this.fullname = fullname;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getPhNo() {
			return phNo;
		}
		public void setPhNo(String phNo) {
			this.phNo = phNo;
		}
		public String getCurrentAddress() {
			return currentAddress;
		}
		public void setCurrentAddress(String currentAddress) {
			this.currentAddress = currentAddress;
		}
		public String getPermanentAddress() {
			return permanentAddress;
		}
		public void setPermanentAddress(String permanentAddress) {
			this.permanentAddress = permanentAddress;
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
		public Date getHireDate() {
			return hireDate;
		}
		public void setHireDate(Date hireDate) {
			this.hireDate = hireDate;
		}
		public Date getDob() {
			return dob;
		}
		public void setDob(Date dob) {
			this.dob = dob;
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
			return "AddEmployee [username=" + username + ", password=" + password + ", nationality=" + nationality
					+ ", fullname=" + fullname + ", gender=" + gender + ", email=" + email + ", phNo=" + phNo
					+ ", currentAddress=" + currentAddress + ", permanentAddress=" + permanentAddress + ", basicSal="
					+ basicSal + ", incentives=" + incentives + ", role_id=" + role_id + ", designationID=" + designationID + ", hireDate="
					+ hireDate + ", dob=" + dob + "]";
		}
		
		
}
