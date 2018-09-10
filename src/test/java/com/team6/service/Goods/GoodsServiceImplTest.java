package com.team6.service.Goods;

import com.team6.dao.GoodsMapper;
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
public class GoodsServiceImplTest {

    @Autowired
    GoodsService service;
    @Autowired
    GoodsMapper goodsMapper;
    @Test
    public void querySaleByGoodType() {
        List list1 =goodsMapper.querySaleByGoodType(10018,8);
        System.out.println(list1);
        List list = service.querySaleByGoodType();
        System.out.println(list);
    }
}