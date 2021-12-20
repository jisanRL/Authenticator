package com.authenticator.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.authenticator.Repository.UserRepository;
import com.authenticator.model.User;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
	
	@Autowired
	private UserRepository usr;
	
	@GetMapping
	public String getUsers() {
		return "Welcome to backend";
	}
	
	// gets from the database
	@GetMapping("/users")
	public List<User> usrData(){
		return usr.findAll();	
	}
	
	// gets user by name
	@GetMapping("/get/{name}")
	public ResponseEntity<List<User>> getUser(@PathVariable("name") String name) {
		try {
			List<User> user = new ArrayList<>(usr.findByNameLike("%" + name + "%"));
			
			if (user.isEmpty()) {
				return new ResponseEntity<>(user, HttpStatus.NO_CONTENT);	// HTTP -> 204
			}
			return new ResponseEntity<>(null, HttpStatus.OK); 	// HTTP -> 200
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);	// HTTP -> 500
		}
	}
	
	// posts in the database
	@PostMapping("/add")
	public User addUser(@RequestBody User user) {
		return usr.save(user);
	}
	
	// updates the users information
	@PutMapping("/update") 
	public ResponseEntity<User> updateUser(@RequestBody User user) {
		User newUser = usr.save(user);
		return new ResponseEntity<>(newUser, HttpStatus.OK);
	}
	
	// deletes the user information
	@DeleteMapping(path = {"/delete/{id}"})
	public User deleteUser(@PathVariable("id") Long id) {
		User user = usr.findById(id).get();
		usr.deleteById(id);
		return user;
	}
	
	
	// endpoints 
//	@PostMapping("/signin")
//	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
//		
//		return null;
//	}
	
}
