package fr.cpe.ejb;

import java.util.Date;

import javax.ejb.ActivationConfigProperty;
import javax.ejb.EJB;
import javax.ejb.MessageDriven;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.ObjectMessage;
import javax.jms.TextMessage;

import fr.cpe.common.Role;
import fr.cpe.common.UserModel;
import fr.cpe.model.DataContainer;

@MessageDriven(activationConfig = {
		@ActivationConfigProperty(propertyName = "destinationType", propertyValue = "javax.jms.Topic"),
		@ActivationConfigProperty(propertyName = "destination", propertyValue = "java:/jms/watcherAuthJMS")})
public class AuthWatcherMsgDrivenEJB implements MessageListener {

	@EJB
	private DataContainer dataContainer;

	@EJB
	MessageSenderQueueLocal sender;

	public void onMessage(Message message) {
		try {
			if (message instanceof TextMessage) {
				System.out.println("Topic: I received a TextMessage at " + new Date());

				TextMessage msg = (TextMessage) message;

				System.out.println("Message is : " + msg.getText());
			}
			else if (message instanceof ObjectMessage) {
				System.out.println("Topic: I received an ObjectMessage at " + new Date());

				ObjectMessage msg = (ObjectMessage) message;

				if (msg.getObject() instanceof UserModel) {
					UserModel user = (UserModel) msg.getObject();

					System.out.println("User Details: ");
					System.out.println("login:" + user.getLogin());
					System.out.println("pwd:" + user.getPwd());

					Role currentTestRole = dataContainer.checkUser(user);

					if (currentTestRole != null) {
						user.setRole(currentTestRole);
					}
					
					sender.sendMessage(user);
				}
			} else {
				System.out.println("Not valid message for this Queue MDB");
			}
		} catch (JMSException e) {
			e.printStackTrace();
		}
	}
}