package com.authenticator.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


@Entity(name = "users")
//	https://www.baeldung.com/jpa-unique-constraints
public class User {
	
	@Id
	@Column(name="id")
	@GeneratedValue(strategy = GenerationType.AUTO)  // gonna be an auto incremental generation of the ID
	private Long id;
	
	@NotBlank
	@Column(name="username", unique=true)
	@Size(max=20)
	private String username;		// username
	
	@Column(name="name")
	private String name;			// full name
	
	@NotBlank
	@Size(max=20)
	@Column(name="password")
	private String password;
	
	@Column(name="type")
	private String type;
	
	@Column(name="phone")
	private String phone;
	
	@NotBlank
	@Size(max=25)
	@Email
	@Column(name="email", unique=true)
	private String email;
	
	@Column(name="address")
	private String address;
	
	@Column(name="image")
	@Size(max = 20000000)
	private byte[] image;
	
	@Column(name="imageURL")
	private String imageURL;
	
	//ctr
	public User() {}
	
	public User(String username, String email, String password, byte[] image) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.image = image;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}

	public String getImageURL() {
		return imageURL;
	}
	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}

	public byte[] getImage() {
		return image;
	}
	public void setImage(byte[] image) {
		this.image = image;
	}
}
