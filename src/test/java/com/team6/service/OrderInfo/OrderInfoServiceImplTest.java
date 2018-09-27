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
        int[] testGoodsId={31,32,11,12,22,52,13};
        int[] testCounts={5,5,10,10,10,5,10};
        int[] testSellerId={3,3,3,3,1,1,1};
        int testUserId=1;
        int testaddressId=2;
        orderInfoService.insertOrderInfo(testGoodsId,testCounts,testSellerId,
                testUserId,testaddressId);
    }
    @Test
    public void testDel(){
        int id=24;
        orderInfoService.delOrderInfo(id);
    }

    @Test
    public void testUpdateStatus(){
        int id=1;
        orderInfoService.queryOrderByUserid(id);
    }
}