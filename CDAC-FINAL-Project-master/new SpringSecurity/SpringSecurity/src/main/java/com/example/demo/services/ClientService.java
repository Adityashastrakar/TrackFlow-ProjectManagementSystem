package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Client;
import com.example.demo.repositories.ClientRepository;

@Service
public class ClientService {
	
	@Autowired
	ClientRepository crepo;
	
	public Client getById(int id) {
		Optional<Client> cr = crepo.findById(id);
		Client c;
		try {
			c = cr.get();
		}catch(Exception e) {
			c= null;
			e.printStackTrace();
		}
		return c;
	}
	
	public List<Client> getAllClient()
	{
		return crepo.findAll();
	}
	
	public List<Client> getClientOfProject(int pid){
		return crepo.getClientOfProject(pid);
	}

	
}
