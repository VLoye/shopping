package com.team6.service.OrderInfo;

import com.team6.entity.OrderInfo;
import com.team6.util.WebTime;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Date;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-dao.xml",
        "classpath:spring/spring-service.xml"})
public class OrderInfoServiceImplTest {
       @Autowired
       private OrderInfoService orderInfoService;
        @Autowired
        private WebTime webTime;
       @Test
       public void testOrderInfo() {
           OrderInfo orderInfo = new OrderInfo();
           orderInfo.setUserId(1000811);
           orderInfo.setStartTime(webTime.getNetworkTime());
           orderInfo.setAddressId(123);
           orderInfo.setStatus(0);
           orderInfoService.insertOrderInfo(orderInfo);
           System.out.println("当前时间"+orderInfo.getStartTime());
       }
       @Test
    public void testDel(){
           int id=1;
           orderInfoService.delOrderInfo(id);
       }
}