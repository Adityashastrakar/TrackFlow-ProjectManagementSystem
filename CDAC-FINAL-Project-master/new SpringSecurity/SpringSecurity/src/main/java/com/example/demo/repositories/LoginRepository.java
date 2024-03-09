package com.example.demo.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entities.Login;

import jakarta.transaction.Transactional;

@Transactional
public interface LoginRepository extends JpaRepository<Login, Integer> {
	@Query("select l from Login l where uid = :uid and pwd =:pwd")
	public Login getLogin(String uid,String pwd);
	
	@Query("select l from Login l where uid = :uid")
	public Login getLogin(String uid);
	
	@Query("select count(*) from Login l where uid=?1")
	public int userCheck(String user_id);
	
//	@Modifying
//	@Query("update User set active = true where id = :id")
//	public int approve(int id);
}
