package com.example.demo.entities;

import java.sql.Date;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Table(name="employees")
public class Employee {
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		int empid;
		
		@Column
		String fullname;
		
		@Column
		Date dob;
		
		@Column
		String gender;
		
		@Column
		String nationality;

		@Column
		String email;
			
		@Column
		String contact;
		
		@Column
		String currentaddress;
		
		@Column
		String permanentaddress;
		
		@Column
		double basicsal;
		
		@Column
		Date hiredate;
		
		@Column
		double incentives;
		
		@OneToOne
		@JoinColumn(name = "login_id")
		Login login_id;
		
		@ManyToOne
		@JoinColumn(name="designation_id")
		Designation desg;
		

		public Employee( String fullName, Date dob, String gender, String nationality, String email,
				String phNo, String currentAddress, String permanentAddress, double basicSal,
				double incentives, Date hireDate, Designation desg, Login login_id) {
			super();
			this.fullname = fullName;
			this.dob = dob;
			this.gender = gender;
			this.nationality = nationality;
			this.email = email;
			this.contact = phNo;
			this.currentaddress = currentAddress;
			this.permanentaddress = permanentAddress;
			this.basicsal = basicSal;
			this.incentives = incentives;
			this.hiredate = hireDate;
			this.desg = desg;
			this.login_id = login_id;
		}
		
		public Employee(double basicsal, double incentives, Login login_id, Designation desg) {
			super();
			this.basicsal = basicsal;
			this.incentives = incentives;
			this.login_id = login_id;
			this.desg = desg;
		}

		public int getEmpId() {
			return empid;
		}

		public void setEmpId(int empId) {
			this.empid = empId;
		}

		public String getFullName() {
			return fullname;
		}

		public void setFullName(String fullName) {
			this.fullname = fullName;
		}

		public Date getDob() {
			return dob;
		}

		public void setDob(Date dob) {
			this.dob = dob;
		}

		public String getGender() {
			return gender;
		}

		public void setGender(String gender) {
			this.gender = gender;
		}

		public String getNationality() {
			return nationality;
		}

		public void setNationality(String nationality) {
			this.nationality = nationality;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getPhNo() {
			return contact;
		}

		public void setPhNo(String phNo) {
			this.contact = phNo;
		}

		public String getCurrentAddress() {
			return currentaddress;
		}

		public void setCurrentAddress(String currentAddress) {
			this.currentaddress = currentAddress;
		}

		public String getPermanentAddress() {
			return permanentaddress;
		}

		public void setPermanentAddress(String permanentAddress) {
			this.permanentaddress = permanentAddress;
		}

		public double getBasicSal() {
			return basicsal;
		}

		public void setBasicSal(double basicSal) {
			this.basicsal = basicSal;
		}

		public Date getHireDate() {
			return hiredate;
		}

		public void setHireDate(Date hireDate) {
			this.hiredate = hireDate;
		}

		public double getIncentives() {
			return incentives;
		}

		public void setIncentives(double incentives) {
			this.incentives = incentives;
		}

		public Login getLogin_id() {
			return login_id;
		}

		public void setLogin_id(Login login_id) {
			this.login_id = login_id;
		}

		public Designation getDesg() {
			return desg;
		}

		public void setDesg(Designation desg) {
			this.desg = desg;
		}

		@Override
		public String toString() {
			return "Employee [empid=" + empid + ", fullname=" + fullname + ", dob=" + dob + ", gender=" + gender
					+ ", nationality=" + nationality + ", email=" + email + ", contact=" + contact + ", currentaddress="
					+ currentaddress + ", permanentaddress=" + permanentaddress + ", basicsal=" + basicsal
					+ ", hiredate=" + hiredate + ", incentives=" + incentives + ", login_id=" + login_id + ", desg="
					+ desg + "]";
		}
}
