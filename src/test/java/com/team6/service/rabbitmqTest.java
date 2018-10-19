package com.team6.service;/**
 * Created by VLoye on 2018/10/9.
 */

import com.team6.entity.Goods;
import com.team6.service.rabbitMQ.MQProducer;
import com.team6.service.rabbitMQ.SolrProducer;
import com.team6.util.enums.GoodsQueueEnum;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.HashMap;

/**
 * @author VLoye
 * @ClassName rabbitmqTest
 * @Description
 * @Date 14:41  2018/10/9
 * @Version 1.0
 **/
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-dao.xml",
        "classpath:spring/spring-service.xml"})
public class rabbitmqTest {
    @Autowired
    SolrProducer solrProducer;
    @Autowired
    MQProducer mqProducer;

    @Test
    public void produceTest(){
        Thread thread = new Thread(new Runnable() {
            int i=0;
            @Override
            public void run() {
                while(i<50) {
                    try {
                        HashMap map = new HashMap();
                        map.put("name", "object" + ++i);
                        solrProducer.sendDateToQueue("solr", map);
                    }catch (Exception e){
                        e.printStackTrace();
                    }
                }
            }
        });
        thread.start();

    }

    @Test
    public void addGoodsToMQ(){
        Goods goods = new Goods();
        goods.setId(100000);
        goods.setPrice(12000l);
        goods.setName("aaaa");
        mqProducer.sendDateToGoodsUpdateQueue(GoodsQueueEnum.ADD,goods);
    }

}
