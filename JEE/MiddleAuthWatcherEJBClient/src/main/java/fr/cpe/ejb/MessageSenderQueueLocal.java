package fr.cpe.ejb;

import fr.cpe.common.UserModel;

public interface MessageSenderQueueLocal {

	public void sendMessage(String message);
	public void sendMessage(UserModel user);
}
