package com.example.demo.entities;

public class DashboardData {
    int empdata, projectdata, clientdata;

    public DashboardData() {

    }

    public DashboardData(int empdata, int projectdata, int clientdata) {
        this.empdata = empdata;
        this.projectdata = projectdata;
        this.clientdata = clientdata;
    }

    public int getEmpdata() {
        return empdata;
    }

    public void setEmpdata(int empdata) {
        this.empdata = empdata;
    }

    public int getProjectdata() {
        return projectdata;
    }

    public void setProjectdata(int projectdata) {
        this.projectdata = projectdata;
    }

    public int getClientdata() {
        return clientdata;
    }

    public void setClientdata(int clientdata) {
        this.clientdata = clientdata;
    }

    @Override
    public String toString() {
        return "DashboardData{" +
                "empdata=" + empdata +
                ", projectdata=" + projectdata +
                ", clientdata=" + clientdata +
                '}';
    }
}
