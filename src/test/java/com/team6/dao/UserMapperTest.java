package com.team6.dao;

import com.team6.entity.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-dao.xml"})
public class UserMapperTest {

    @Autowired
    private UserMapper userMapper;
    @Test
    public void queryById() {
        int id = 10001;
        User user = userMapper.queryById(id);
        System.out.println(user);
    }

    @Test
    public void queryByName() {
        String name = "郑伟坑";
        User user = userMapper.queryByName(name);
        System.out.println(user);
    }

    @Test
    public void queryAll() {
        List<User> list = userMapper.queryAll();
        for (User user:list){
            System.out.println(user);
        }
    }
}