package com.example.demo.entities;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

@Entity
@Table(name="login")
public class Login {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int login_id;
	
	@Column(name="username")
	String uid;
	
	@Column(name="password")
	String pwd;
	
	@ManyToOne
	@JoinColumn(name="role_id")
	Role role;
	
	@Column(name="status")
	boolean active;

	@Override
	public String toString() {
		return "User [id=" + login_id + ", uid=" + uid + ", pwd=" + pwd + ", role=" + role + ", active=" + active + "]";
	}

	public Login(String uid, String pwd, Role role, boolean active) {
		super();
		this.uid = uid;
		this.pwd = pwd;
		this.role = role;
		this.active = active;
	}
	
	public Login(Role role) {
		super();
		this.role = role;
	}
	
	public Role getRole() {
		
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
}
