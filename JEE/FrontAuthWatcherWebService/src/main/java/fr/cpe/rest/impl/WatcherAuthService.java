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
		JsonObject response = null;
		
		messageSenderLocal.sendMessage(user);
		UserModel result = messageReceiverSyncLocal.receiveMessage();
		
		System.out.println(result);

		if (result == null) {
			response = Json.createObjectBuilder()
					.add("login", userLogin.getLogin())
					.add("validAuth", false)
					.add("role", "")
					.build();
		}
		else {
			response = Json.createObjectBuilder()
					.add("login", result.getLogin())
					.add("validAuth", result.getRole() != null)
					.add("role", (result.getRole() != null ? result.getRole() : ""))
					.build();
		}
		
		return response.toString();
	}
}
