package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Client;
import com.example.demo.entities.Employee;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {

	
	@Query(value = "select count(*) from clients",nativeQuery = true)
	public int countClients();
	
	@Query(value="SELECT * FROM clients",nativeQuery = true)
	public List<Client> getAllClients();
	
	@Query(value="select c.* from projects p join clients c on p.clientid = c.clientid where p.pid = :empid",nativeQuery = true)
	public List<Client> getClientOfProject(int empid);
	
}
