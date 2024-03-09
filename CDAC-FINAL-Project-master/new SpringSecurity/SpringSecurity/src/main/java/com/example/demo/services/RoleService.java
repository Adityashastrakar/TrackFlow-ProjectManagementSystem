package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Designation;
import com.example.demo.entities.Role;
import com.example.demo.repositories.RoleRepository;

@Service
public class RoleService {

	@Autowired
	RoleRepository rrepo;
	
	public List<Role> getAll(){
		return rrepo.getAll();
	}
	
	public Role getById(int id)
	{
		Optional<Role> or = rrepo.findById(id);
		Role r;
		try
		{
			r = or.get();
		}
		catch(Exception e)
		{
			r=null;
		}
		return r;
	}
	
}
