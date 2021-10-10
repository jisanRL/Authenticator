package com.authenticator.comtroller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class AuthController {
	
	@GetMapping
	public String getUsers() {
		return "Welcome to jComrz backend";
	}
	
	@GetMapping("/somestr")
	public String somrStr() {
		return "Have fun";
	}
}
