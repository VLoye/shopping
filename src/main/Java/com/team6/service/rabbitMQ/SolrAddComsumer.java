package com.team6.service.rabbitMQ;/**
 * Created by VLoye on 2018/10/9.
 */

import com.alibaba.druid.support.json.JSONUtils;
import com.rabbitmq.client.Channel;
import com.team6.dto.SolrGoods;
import com.team6.entity.Goods;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.common.SolrInputDocument;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.core.ChannelAwareMessageListener;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author VLoye
 * @ClassName SolrListener
 * @Description
 * @Date 13:50  2018/10/9
 * @Version 1.0
 **/
@Component
public class SolrAddComsumer implements ChannelAwareMessageListener,InitializingBean{
    private static final String url = "";
    private static final Logger logger = LoggerFactory.getLogger(SolrAddComsumer.class);
    private SolrClient client;

    @Override
    @Transactional
    public void onMessage(Message message, Channel channel) throws Exception {
        logger.info(message.toString());
        SolrGoods solrGoods= (SolrGoods)JSONUtils.parse(message.toString());

        channel.basicAck(message.getMessageProperties().getDeliveryTag(),false);
    }

    @Override
    public void afterPropertiesSet() throws Exception {

    }
}
