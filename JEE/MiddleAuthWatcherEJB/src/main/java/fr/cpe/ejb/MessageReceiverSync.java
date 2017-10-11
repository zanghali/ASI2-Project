package fr.cpe.ejb;

import java.util.logging.Logger;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.ObjectMessage;
import javax.jms.Queue;
import javax.jms.TextMessage;

import fr.cpe.common.UserModel;

public class MessageReceiverSync implements MessageReceiverSyncLocal {

    private static Logger logger = Logger.getLogger(MessageReceiverSync.class.getName());
    
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
