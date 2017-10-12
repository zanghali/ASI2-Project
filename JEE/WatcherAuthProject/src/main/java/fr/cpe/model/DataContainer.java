package fr.cpe.model;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.ejb.Startup;

import fr.cpe.common.Role;
import fr.cpe.common.UserModel;

@Singleton
@Startup
public class DataContainer {
	
	private List<UserModel> data = new ArrayList<UserModel>();
	
	@PostConstruct
	public void init()
	{		
		UserModel admin = new UserModel("admin", "admin");
		admin.setRole(Role.ADMIN.name());
		
		UserModel client = new UserModel("jdoe", "jdoe");
		client.setRole(Role.NONE.name());
		
		data.add(admin);
		data.add(client);
	}
	
	public Role checkUser(UserModel user) {
		Role result = null;
		UserModel existingUser = null;
		
		for (Iterator<UserModel> i = data.iterator(); i.hasNext();) {
			UserModel usr = i.next();

			if(usr.getLogin().equals(user.getLogin()) && usr.getPwd().equals(user.getPwd())) {
				existingUser = usr;
				break;
			}
		}
		
		if (existingUser != null) {
			result = Role.valueOf(existingUser.getRole());
		}
		
		return result;
	}

}