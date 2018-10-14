package com.team6.service.OrderInfo;

import com.team6.util.WebTime;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

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
        int[] testGoodsId={13};
        int[] testCounts={5};
        int[] testSellerId={2};
        int testUserId=11;
        int testaddressId=2;
        orderInfoService.insertOrderInfo(testGoodsId,testCounts,testSellerId,
                testUserId,testaddressId);
    }

}