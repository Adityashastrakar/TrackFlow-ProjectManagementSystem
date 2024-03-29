package com.example.demo.security;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.SessionManagementConfigurer;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.demo.security.MyLoginDetailsService;

@Configuration
public class AppSecurityConfigurer {
	
	@Autowired
	private AuthEntryPointJwt point;
	
	@Bean
	AuthTokenFilter authTokenFilter() {
		return new AuthTokenFilter();
	};
	/*@Autowired
	AuthTokenFilter authTokenFilter;*/
	
	@Bean
	RestTemplate restTemplate(RestTemplateBuilder builder) {
	 
		return builder
			.setConnectTimeout(Duration.ofMillis(3000))
			.setReadTimeout(Duration.ofMillis(3000))
			.build();
	}
	
	
	@Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
	
	@Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedHeader("*");
        config.addExposedHeader("Authorization");
        config.addAllowedMethod("OPTIONS");
        config.addAllowedMethod("HEAD");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("PATCH");
        source.registerCorsConfiguration("/**", config);
        return source;
    }
	
	@Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        /*http.csrf().disable()
        .authorizeRequests()
        .antMatchers("/").permitAll()
        .antMatchers("/register").permitAll()
        .antMatchers("/user").hasAuthority("USER")
		.antMatchers("/admin").hasAuthority("ADMIN")
		.and()
		.formLogin();*/
		http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
		http.csrf(csrf -> csrf.disable())
		.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		http.addFilterBefore(authTokenFilter(), UsernamePasswordAuthenticationFilter.class);
		http.authorizeHttpRequests(authorize -> {

			authorize.requestMatchers("/").permitAll();
			authorize.requestMatchers("/getDashboardData").permitAll();

			authorize.requestMatchers("/login").permitAll();
			authorize.requestMatchers("/getEmployee/{loginid}").permitAll();

			//for User Registration
			authorize.requestMatchers("/userCheck").permitAll();
			authorize.requestMatchers("/regEmployee").permitAll();
			authorize.requestMatchers("/getAllDesign").hasAuthority("admin");
			authorize.requestMatchers("/getAllRoles").hasAuthority("admin");
			authorize.requestMatchers("/emphistory").permitAll();
			
			//for update Registration
			authorize.requestMatchers("/updateall").permitAll();
			authorize.requestMatchers("/getActiveEmployees").permitAll();
			authorize.requestMatchers("/getallEmp").permitAll();
//			authorize.requestMatchers("/getOneEmp").permitAll();
			authorize.requestMatchers("/getOneEmp/{userid}").permitAll();
			authorize.requestMatchers("/inactiveEmp/{userid}").permitAll();
			authorize.requestMatchers("/updatepersonals").permitAll();

			
			//for team 
			authorize.requestMatchers("/createTeam").permitAll();
			authorize.requestMatchers("/getBenchEmployees").permitAll();
			authorize.requestMatchers("/teamList/{pid}").permitAll();
			authorize.requestMatchers("/removeMember/{empid}").permitAll();
			authorize.requestMatchers("/dasboardDataByEmp/{empid}").permitAll();
			
			//for project
			authorize.requestMatchers("/createProject").permitAll();
			authorize.requestMatchers("/getAllProjects").permitAll();
			authorize.requestMatchers("/getAllActiveProjects").permitAll();
			authorize.requestMatchers("/getProjectByEmpId/{empid}").permitAll();
			authorize.requestMatchers("/getProjectByLoginId/{loginid}").permitAll();
			authorize.requestMatchers("/getManagers").permitAll();
			authorize.requestMatchers("/getClients").permitAll();
			authorize.requestMatchers("/endProject/{pid}").permitAll();
			authorize.requestMatchers("/projecthistory").permitAll();
			authorize.requestMatchers("/getCurrentProject/{empid}").permitAll();

			//client
			authorize.requestMatchers("/getClientOfProject/{pid}").permitAll();
			
			
			//hasAuthority 
			//authorize.requestMatchers("/c").hasAuthority("USER");
			//authorize.requestMatchers("/admin").hasAnyAuthority("ADMIN","USER");
			
		});
		//.exceptionHandling(ex -> ex.authenticationEntryPoint(point))
        
		//http.cors(cors -> cors.configurationSource());
		
		
		return http.build();
    }
	
	@Bean
    DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider  = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
         
        return authProvider;
    }
	
	@Bean
    UserDetailsService userDetailsService() {
        return new MyLoginDetailsService();
    }
	
	/*protected void configure(AuthenticationManagerBuilder auth) {
		auth.authenticationProvider(authenticationProvider());
		
	}*/
	
	@Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
        return builder.getAuthenticationManager();
    }

}
