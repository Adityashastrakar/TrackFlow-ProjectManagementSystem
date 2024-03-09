package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Client;
import com.example.demo.services.ClientService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ClientController {
	@Autowired
	ClientService cservice;
	
	@GetMapping("/getClients")
	public List<Client> getAllClients()
	{
		return cservice.getAllClient();
	}
	
	@GetMapping("/getClientOfProject/{pid}")
	public List<Client> getClientOfProject(@PathVariable("pid")int pid){
		return cservice.getClientOfProject(pid);
	}
}
