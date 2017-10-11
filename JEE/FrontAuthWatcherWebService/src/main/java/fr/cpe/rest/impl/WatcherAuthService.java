package fr.cpe.rest.impl;

import java.util.logging.Logger;

import fr.cpe.common.UserModel;
import fr.cpe.rest.IWatcherAuthService;

public class WatcherAuthService implements IWatcherAuthService {
	
	Logger logger = Logger.getLogger(WatcherAuthService.class.getName());

	@Override
	public void authenticate (String login, String pwd) {
		UserModel user = new UserModel(login, pwd);
		
		System.out.println(user);
	}
}
