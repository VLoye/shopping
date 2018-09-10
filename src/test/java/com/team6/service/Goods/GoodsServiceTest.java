package com.team6.service.Goods;

import com.team6.entity.Goods;
import com.team6.util.enums.GoodsEnum;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.*;
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-dao.xml",
                        "classpath:spring/spring-service.xml"})

public class GoodsServiceTest {
    @Autowired
    private GoodsService goodsService;

    @Test
    @Transactional
    @Rollback(true)
    public void testInsertGoods(){
        Goods goods=new Goods();
        goods.setId(1111111);
        goods.setSellerId(1);
        goods.setBrandId(1);
        goods.setPrice(100L);
        goods.setTypeId(1);
        goods.setStock(1);
        goods.setImgUrl("imgurl");
        goods.setName("李文浩");
        GoodsEnum anEnum=goodsService.insertGoods(goods);
        System.out.println(anEnum);
    }
    @Test
    @Transactional
    @Rollback(true)
    public void testQueryGoodsById(){
        Goods goods= goodsService.queryGoodsById(2146);
        System.out.println(goods.getId());
        System.out.println(goods.getName());
    }

    @Test
    public void testUpdate(){
        Goods goods=goodsService.queryGoodsById(100004);
        goods.setName("文浩是大柴浪");
        GoodsEnum an=goodsService.updateGoods(goods);
        System.out.println(an);
    }
}