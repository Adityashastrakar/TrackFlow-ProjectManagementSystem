package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Project;
import com.example.demo.entities.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {
	
	@Query("SELECT t FROM Team t WHERE t.pid = :pid AND t.status = true")
	public List<Team> teamList(Project pid);
	
	@Modifying
	@Query(value="update teams set status = 0 where empid = ?1",nativeQuery = true)
	public int removeMember(int empid);
	
//	no of employees project manager guided 
	@Query(value = "select count(t.empid) FROM projects p JOIN teams t ON p.pid = t.pid where p.empid = ?1", nativeQuery = true)
	public int countEmployeeForPM(int empid);
	
//	no of project employee worked on 
	@Query(value = "select count(pid) from teams where empid = ?1", nativeQuery = true)
	public int countProjectForEmp(int empid);

}
