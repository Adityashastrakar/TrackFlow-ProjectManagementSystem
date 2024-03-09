package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Designation;
import com.example.demo.repositories.DesignationRepository;

@Service
public class DesignationService {
	@Autowired
	DesignationRepository drepo;
	
	public List<Designation> getAll(){
		return drepo.findAll();
	}
	
	public Designation getById(int id) {
//		return drepo.findById(id).get();
		Optional<Designation> or = drepo.findById(id);
		Designation d;
		try {
			d = or.get();
		}catch(Exception e) {
			d = null;
		}
		return d;
	}
}