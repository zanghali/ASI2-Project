package fr.cpe.ejb;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.jms.Message;
import javax.jms.ObjectMessage;
import javax.jms.Topic;

import fr.cpe.common.UserModel;

@Stateless
@LocalBean
public class MessageSender implements MessageSenderLocal {

	@Inject
	JMSContext context;
	
	@Resource(mappedName = "java:/jms/watcherAuthJMS")
	Topic topic;
	
	@Override
	public void sendMessage(String message) {			
		context.createProducer()
		.send(topic, message);
	}
	
	@Override
	public void sendMessage(UserModel user) {
		context.createProducer()
		.send(topic, user);
	}

}
