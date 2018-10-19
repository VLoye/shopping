package com.team6.service.rabbitMQ;/**
 * Created by VLoye on 2018/10/9.
 */

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author VLoye
 * @ClassName SolrProducer
 * @Description
 * @Date 13:52  2018/10/9
 * @Version 1.0
 **/
@Service
public class SolrProducer {
    private static final Logger logger = LoggerFactory.getLogger(SolrProducer.class);

    @Autowired
    private AmqpTemplate amqpTemplate;

    public void sendDateToQueue(String queueKey,Object object){
        try {
            amqpTemplate.convertAndSend(queueKey,object);
        }catch (Exception e){
            logger.error(e.toString());
        }
    }

}
