package com.example.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Clients")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Clientid")
    private int clientid;

    @Column(name = "Clientname")
    private String clientname;

    @Column(name = "Website")
    private String website;

    @Column(name = "Domain")
    private String domain;

    @Column(name = "Address")
    private String address;

    @Column(name = "Contact")
    private String contact;
    
    public Client() {
    	
    }

	public Client(String clientname, String website, String domain, String address, String contact) {
		this.clientname = clientname;
		this.website = website;
		this.domain = domain;
		this.address = address;
		this.contact = contact;
	}

	public int getClientid() {
		return clientid;
	}

	public void setClientid(int clientid) {
		this.clientid = clientid;
	}

	public String getClientname() {
		return clientname;
	}

	public void setClientname(String clientname) {
		this.clientname = clientname;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public String getDomain() {
		return domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	@Override
	public String toString() {
		return "Client [clientid=" + clientid + ", clientname=" + clientname + ", website=" + website + ", domain="
				+ domain + ", address=" + address + ", contact=" + contact + "]";
	}

}