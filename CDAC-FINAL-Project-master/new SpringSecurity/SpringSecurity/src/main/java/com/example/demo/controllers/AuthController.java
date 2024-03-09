package com.example.demo.controllers;

import java.util.*;
import java.util.stream.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import com.example.demo.entities.LoginCheck;
import com.example.demo.entities.MessageResponse;
import com.example.demo.entities.Role;
import com.example.demo.entities.SignupRequest;
import com.example.demo.entities.Login;
import com.example.demo.entities.UserInfoResponse;
import com.example.demo.repositories.LoginRepository;
import com.example.demo.security.JwtUtils;
import com.example.demo.security.MyUserDetails;

import com.example.demo.services.RoleService;
import com.example.demo.services.LoginService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
	
	  @Autowired
	  AuthenticationManager authManager;
	  
	  //@Autowired
	  //AuthenticationProvider authenticationProvider;

	  @Autowired
	  LoginRepository loginRepository;	 

	  @Autowired
	  PasswordEncoder encoder;

	  @Autowired
	  JwtUtils jwtUtils;
	  
	  @Autowired
	  RoleService rservice;
	  
	  @Autowired
	  LoginService lservice;
	  
//	  @Autowired
//	  DoctorService dservice;

	  @PostMapping("/login")
	  public ResponseEntity<?> authenticateUser(@RequestBody LoginCheck loginCheck) {

		  System.out.println(loginCheck.getUsername()+" : "+loginCheck.getPassword());
		  
		 //authenticationProvider.au
		  
	    Authentication authentication = authManager.
	        authenticate(new UsernamePasswordAuthenticationToken(loginCheck.getUsername(), loginCheck.getPassword()));

	    SecurityContextHolder.getContext().setAuthentication(authentication);

	    MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();
        System.out.println(userDetails);
        
        
	    
	    /*String jwtCookie = jwtUtils.generateTokenFromUsername(loginCheck.getUsername());
	    System.out.println(jwtCookie);*/
        
        String jwtToken = jwtUtils.generateTokenFromUsername(loginCheck.getUsername());
        
        //ResponseCookie res_cookie = jwtUtils.generateJwtCookie(userDetails);
        //System.out.println(res_cookie.getName()+ " : "+res_cookie.getValue());
	    List<String> roles = userDetails.getAuthorities().stream()
	        .map(item -> item.getAuthority())
	        .collect(Collectors.toList());

	    /*return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie)
	        .body(new UserInfoResponse(userDetails.getId(),
	                                   userDetails.getUsername(),	                                   
	                                   roles));*/
	    /*return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, res_cookie.toString())
		        .body(new UserInfoResponse(userDetails.getId(),
		                                   userDetails.getUsername(),	                                   
		                                   roles)); */
	    return ResponseEntity.ok()
	            //.header("Authorization", "Bearer " + jwtToken)
	            .body(new UserInfoResponse(userDetails.getId(),
                       userDetails.getUsername(),	                                   
                       roles,jwtToken));
	  }
	  
	  @PostMapping("/userCheck")
	  public int userCheck(@RequestBody LoginCheck l) {
		  System.out.println(l);
		  int res = lservice.userCheck(l.getUsername());
		  return res;
	  }
	  
//	  @PostMapping("/regDoctor")
//	   public Doctor regDoctor(@RequestBody DoctorReg dr)
//	   {
//		     System.out.println(encoder.encode("Admin@123"));
//		  
//				Role r = rservice.getById(2);		
//				Login l = new Login(dr.getUid(), encoder.encode(dr.getPwd()), r ,false);
//				Login saved = uservice.save(l);
//			
//				
//				System.out.println(saved.getId());
//				System.out.println(dr.getExperience());
//				
//				Doctor d = new Doctor(dr.getFname(), dr.getMname(), dr.getLname(), dr.getEmail(), dr.getContact(), dr.getSpecialization(), dr.getExperience(), saved);
//				System.out.println(d.getExperience());
//				return dservice.saveDoctor(d);	
//			
//		}
	  
	  
	  

	  /*@PostMapping("/register")
	  public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
	    	   

	    // Create new user's account
	    User user = new User(signUpRequest.getUsername(),
	                         encoder.encode(signUpRequest.getPassword()),"USER",true);

	   
	    /*if (strRoles == null) {
	      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
	          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
	      roles.add(userRole);
	    } else {
	      strRoles.forEach(role -> {
	        switch (role) {
	        case "admin":
	          Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
	              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
	          roles.add(adminRole);

	          break;
	        case "mod":
	          Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
	              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
	          roles.add(modRole);

	          break;
	        default:
	          Role userRole = roleRepository.findByName(ERole.ROLE_USER)
	              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
	          roles.add(userRole);
	        }
	      });
	    }

	    user.setRoles(roles); 
	    userRepository.save(user);
	    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	  }*/
	  
//	 @PostMapping("/signout")
//	  public ResponseEntity<?> logoutUser() {
//	    ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
//	    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
//	        .body(new MessageResponse("You've been signed out!"));
//	  }
}
