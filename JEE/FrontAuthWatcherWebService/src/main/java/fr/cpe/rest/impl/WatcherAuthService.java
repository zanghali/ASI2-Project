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
		
		messageSenderLocal.sendMessage(user);
		UserModel result = messageReceiverSyncLocal.receiveMessage();

		System.out.println(result);

		JsonObject response = Json.createObjectBuilder()
				.add("login", result.getLogin())
				.add("validAuth", result.getRole() != null)
				.add("role", (result.getRole() != null ? result.getRole().name() : ""))
				.build();
		
		return response.toString();
	}
}
