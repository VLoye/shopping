package com.team6.service.Goods;

import com.team6.service.rb.RbService;
import com.team6.service.shop.ShopService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static org.junit.Assert.*;
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-dao.xml",
        "classpath:spring/spring-service.xml"})
public class GoodsServiceImplTest {

    @Autowired
    GoodsService service;
    @Autowired
    ShopService shopService;
    @Autowired
    RbService rbService;
    @Autowired
    @Test
    public void querySaleByGoodType() {
        List list = service.querySaleByGoodType();
        System.out.println(list);
    }

    @Test
    public void getShopData(){


        Object o = shopService.getShopData(2,null);
        int  i =1;
    }
}