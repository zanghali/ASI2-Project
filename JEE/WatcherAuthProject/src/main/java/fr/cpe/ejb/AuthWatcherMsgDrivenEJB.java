package fr.cpe.ejb;

import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;  
import javax.jms.Message;  
import javax.jms.MessageListener;  

import fr.cpe.model.DataContainer;

@MessageDriven(
		activationConfig = {
				@ActivationConfigProperty(
						propertyName = "destinationType",
						propertyValue = "javax.jms.Topic"),
				@ActivationConfigProperty(
						propertyName = "destination",
						propertyValue = "java:/jms/watcherAuthJMS")
		})
public class AuthWatcherMsgDrivenEJB implements MessageListener {

	private DataContainer dataContainer;
	
	public AuthWatcherMsgDrivenEJB() {
		dataContainer = new DataContainer();
	}
	
	public void onMessage (Message message) {
		
	}
}