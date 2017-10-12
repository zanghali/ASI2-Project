package fr.cpe.ejb;

import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.ObjectMessage;
import javax.jms.Queue;
import fr.cpe.common.UserModel;

@Stateless
public class MessageReceiverSync implements MessageReceiverSyncLocal {

	@Inject
	JMSContext context;
	
	@Resource(mappedName = "java:/jms/queue/watcherQueue")
	Queue queue;
	
	@Override
	public UserModel receiveMessage() {
		
		Message received = context.createConsumer(queue).receive(1000);
		UserModel message = null;
		
        try {
            if (received instanceof ObjectMessage) {
            	
                message = (UserModel)(((ObjectMessage) received).getObject());
            }
        }
        catch (JMSException e) {
            e.printStackTrace();
        }

		return message;
	}
}
