package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.entities.Designation;

@Repository
public interface DesignationRepository extends JpaRepository<Designation, Integer> {
	
}