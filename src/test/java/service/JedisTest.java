package service;/**
 * Created by VLoye on 2018/9/11.
 */

import com.team6.service.JedisAdapter;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Set;

/**
 * @author VLoye
 * @ClassName JedisTest
 * @Description
 * @Date 16:15  2018/9/11
 * @Version 1.0
 **/
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-service.xml","classpath:spring/spring-dao.xml"})
public class JedisTest {
    @Autowired
    JedisAdapter jedisAdapter;


    @Test
    public void set(){
        String key="hh";
        String value = "hh";
        int second = 60;
        jedisAdapter.setKV(key,value,second);
    }

    @Test
    public void keys(){
        Set<String> set = jedisAdapter.Keys("*");
        for(String s:set){
            System.out.println(s);
        }
    }


}
