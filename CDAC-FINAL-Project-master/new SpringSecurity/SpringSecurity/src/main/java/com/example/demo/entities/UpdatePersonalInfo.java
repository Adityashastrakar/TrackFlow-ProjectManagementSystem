package com.example.demo.entities;


public class UpdatePersonalInfo {

    int empid;
    String fullname,nationality,email,currentAddress,permanentAddress,phNo;
   // String username,password;

    public UpdatePersonalInfo() {}
//
//    public String getUsername() {
//        return username;
//    }
//    public void setUsername(String username) {
//        this.username = username;
//    }
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }

    public int getEmpid() {
        return empid;
    }

    public void setEmpid(int empid) {
        this.empid = empid;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
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

    public String getPhNo() {
        return phNo;
    }

    public void setPhNo(String phNo) {
        this.phNo = phNo;
    }

    public UpdatePersonalInfo(int empid, String fullname, String nationality, String email, String currentAddress, String permanentAddress, String phNo) {
        this.empid = empid;
        this.fullname = fullname;
        this.nationality = nationality;
        this.email = email;
        this.currentAddress = currentAddress;
        this.permanentAddress = permanentAddress;
        this.phNo = phNo;
//        this.username=username;
//        this.password=password;
    }

    @Override
    public String toString() {
        return "UpdatePersonalInfo{" +
                "empid=" + empid +
                ", fullname='" + fullname + '\'' +
                ", nationality='" + nationality + '\'' +
                ", email='" + email + '\'' +
                ", currentAddress='" + currentAddress + '\'' +
                ", permanentAddress='" + permanentAddress + '\'' +
                ", phNo='" + phNo + '\'' +
                '}';
    }
}
