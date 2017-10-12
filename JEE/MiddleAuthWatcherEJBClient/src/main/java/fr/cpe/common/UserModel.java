package fr.cpe.common;

import java.io.Serializable;

public class UserModel implements Serializable{
	
	private static final long serialVersionUID = -8666021772284848686L;
	
	private String lastName;
	private String surName;
	private String login;
	private String pwd;
	private Role role;

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

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "UserModel [login=" + login + ", pwd=" + pwd + ", role=" + role + "]";
	}
}
