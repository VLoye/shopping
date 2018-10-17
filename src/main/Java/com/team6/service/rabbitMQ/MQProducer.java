package com.team6.service.rabbitMQ;/**
 * Created by VLoye on 2018/10/9.
 */

import com.team6.util.enums.GoodsQueueEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author VLoye
 * @ClassName MQProducer
 * @Description
 * @Date 16:00  2018/10/9
 * @Version 1.0
 **/
@Service
public class MQProducer {
    private static final Logger logger = LoggerFactory.getLogger(MQProducer.class);
    @Autowired
    private AmqpTemplate amqpTemplate;

    public void sendDateToGoodsUpdateQueue(GoodsQueueEnum goodsQueueEnum, Object object){
        sendDateToQueue(goodsQueueEnum.getQueue(),object);
    }

    private void sendDateToQueue(String queueKey,Object object){
        try {
            amqpTemplate.convertAndSend(queueKey,object);
        }catch (Exception e){
            logger.error(e.toString());
        }
    }
}
