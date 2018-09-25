package com.team6.dao;/**
 * Created by VLoye on 2018/9/14.
 */

import com.team6.entity.Goods;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.noggit.JSONUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author VLoye
 * @ClassName GoodsTest
 * @Description
 * @Date 10:58  2018/9/14
 * @Version 1.0
 **/
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-dao.xml"})
public class GoodsTest {
    private static final Logger logger = LoggerFactory.getLogger(GoodsTest.class);

    @Autowired
    GoodsMapper goodsMapper;

    @Test
    public void queryGoodsByIdList() {
        List<String> list = new ArrayList<String>();
        list.add("10");
        list.add("12");
        List<Goods> goodsList =goodsMapper.queryGoodsByIdList(list);
//        logger.info(JSONUtil.toJSON(goodsList));
    }

    @Test
    public void queryGoodsByIdArray() {
        Set<String> set = new HashSet<String>();
        set.add("10");
        set.add("12");
        List<Goods> goodsList = goodsMapper.queryGoodsByIdArray(set.toArray());
        logger.info(JSONUtil.toJSON(goodsList));
    }
}
