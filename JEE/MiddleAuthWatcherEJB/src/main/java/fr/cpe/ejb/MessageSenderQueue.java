package fr.cpe.ejb;

import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.jms.JMSException;
import javax.jms.ObjectMessage;
import javax.jms.Queue;

import fr.cpe.common.UserModel;

@Stateless
public class MessageSenderQueue implements MessageSenderQueueLocal {

	@Inject
	JMSContext context;

	@Resource(mappedName = "java:/jms/queue/watcherQueue")
	Queue queue;

	@Override
	public void sendMessage(String message) {
		context.createProducer().send(queue, message);
	}

	@Override
	public void sendMessage(UserModel user) {
		try {
			ObjectMessage message = context.createObjectMessage();
			message.setObject(user);
			context.createProducer().send(queue, user);
		} catch (JMSException e) {
			e.printStackTrace();
		}
	}

}
