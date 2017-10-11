package fr.cpe.rest.impl;

import java.util.logging.Logger;

import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;

import fr.cpe.common.UserModel;
import fr.cpe.ejb.MessageReceiverSyncLocal;
import fr.cpe.ejb.MessageSenderLocal;
import fr.cpe.rest.IWatcherAuthService;

public class WatcherAuthService implements IWatcherAuthService {
	
	Logger logger = Logger.getLogger(WatcherAuthService.class.getName());

	@EJB
	MessageSenderLocal messageSenderLocal;
	
	@EJB
	MessageReceiverSyncLocal messageReceiverSyncLocal;
	
	@Override
	public String authenticate (UserModel userLogin) {
		UserModel user = new UserModel(userLogin.getLogin(), userLogin.getPwd());
		
		System.out.println(user);
		
		JsonObject response = Json.createObjectBuilder()
				.add("login", user.getLogin())
				.add("validAuth", "true")
				.add("role", "ADMIN")
				.build();

		messageSenderLocal.sendMessage(user);
		messageReceiverSyncLocal.receiveMessage();
		
		return response.toString();
	}
}
