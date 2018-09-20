package com.team6.service.shopcar;

import com.team6.dao.GoodsMapper;
import com.team6.dao.ShoppingCarMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-dao.xml",
        "classpath:spring/spring-service.xml"})
public class ShopCarServiceImpTest {
    @Autowired
    ShopCarService shopCarService;
    @Test
    public void shopCar() {

        List list =(List)shopCarService.shopCar(101);
        System.out.println(list);
    }
}