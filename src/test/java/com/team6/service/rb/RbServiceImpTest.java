package com.team6.service.rb;

import com.team6.dao.RbMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;
import java.util.Map;

import static org.junit.Assert.*;
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-dao.xml",
        "classpath:spring/spring-service.xml"})
public class RbServiceImpTest {
    @Autowired
    private RbService rbService;
    @Autowired
    private RbMapper rbMapper;
    @Test
    public void testquertAll(){
        List list =(List)rbService.queryAllInfo();
        System.out.println(list);
    }
}