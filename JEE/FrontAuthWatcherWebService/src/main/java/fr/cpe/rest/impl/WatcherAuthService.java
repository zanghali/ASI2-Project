package fr.cpe.rest.impl;

import java.util.logging.Logger;

import javax.json.Json;
import javax.json.JsonObject;

import fr.cpe.common.UserModel;
import fr.cpe.rest.IWatcherAuthService;

public class WatcherAuthService implements IWatcherAuthService {
	
	Logger logger = Logger.getLogger(WatcherAuthService.class.getName());

	@Override
	public String authenticate (String login, String pwd) {
		UserModel user = new UserModel(login, pwd);
		
		System.out.println(user);

		JsonObject response = Json.createObjectBuilder()
				.add("login", user.getLogin())
				.add("validAuth", "true")
				.add("role", "ADMIN")
				.build();
		
		System.out.println(response.toString());
		
		return response.toString();
	}
}
