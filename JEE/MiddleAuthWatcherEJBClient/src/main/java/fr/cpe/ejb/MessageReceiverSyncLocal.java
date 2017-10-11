package fr.cpe.ejb;

import javax.ejb.Local;

import fr.cpe.common.UserModel;

@Local
public interface MessageReceiverSyncLocal {
	
	public UserModel receiveMessage();
}
