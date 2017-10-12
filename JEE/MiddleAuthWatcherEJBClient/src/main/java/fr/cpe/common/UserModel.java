package fr.cpe.common;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "users")

@NamedQuery(name = "Users.list", query = "select u from UserModel u")
public class UserModel implements Serializable{
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    
    @NotNull
    @Column(name = "lastName")
	private String lastName;
    
    @NotNull
    @Column(name = "surName")
	private String surName;
	
    @NotNull
    @Column(name = "login", unique = true)
	private String login;
    
    @NotNull
    @Column(name = "pwd", unique = true)
	private String pwd;
	
    @NotNull
    @Column(name = "role")
	private String role;

	public UserModel() {
		super();
	}

	public UserModel(String login, String pwd) {
		this.lastName = "";
		this.surName = "";
		this.login = login;
		this.pwd = pwd;
		this.role = null;
	}
	
	// Getters & Setters

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getSurName() {
		return surName;
	}

	public void setSurName(String surName) {
		this.surName = surName;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "UserModel [login=" + login + ", pwd=" + pwd + ", role=" + role + "]";
	}
}
