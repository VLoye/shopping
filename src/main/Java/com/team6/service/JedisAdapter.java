package com.team6.service;/**
 * Created by VLoye on 2018/7/12.
 */

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

/**
 * @author VLoye
 * @ClassName JedisAdapter
 * @Description
 * @Date 12:04  2018/7/12
 * @Version 1.0
 **/
@Service
@ComponentScan("com.team6.config")
public class JedisAdapter implements InitializingBean {

    @Value("#{redisConfig['jedis.host']}")
    private String host;

    @Value("#{redisConfig['jedis.port']}")
    private int port;

    @Value("#{redisConfig['jedis.timeout']}")
    private int timeout;

    @Value("#{redisConfig['jedis.password']}")
    private String password;

    @Value("#{redisConfig['jedis.database']}")
    private int database;


    @Autowired
    private JedisPoolConfig jedisPoolConfig;

    private JedisPool jedisPool;

    @Override
    public void afterPropertiesSet() throws Exception {
//        jedisPool = new JedisPool("redis://localhost:6379/2");
        jedisPool = new JedisPool(jedisPoolConfig, host,port,timeout,password,database);
    }
    public boolean setKV(String key,String value,int second){
        Jedis jedis = null;
        try{
            jedis = jedisPool.getResource();
            jedis.set(key,value);
            jedis.expire(key,second);
            return true;
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            if(jedis != null){
                jedis.close();
            }
        }
        return false;
    }

    public String getKV(String key){
        Jedis jedis = null;
        try{
            jedis = jedisPool.getResource();

            //刷新过期时间
//            jedis.expire(key,3600*24*3);
            return jedis.get(key);
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            if(jedis != null){
                jedis.close();
            }
        }
        return null;
    }


}
