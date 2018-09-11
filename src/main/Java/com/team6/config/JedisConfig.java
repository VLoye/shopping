package com.team6.config;/**
 * Created by VLoye on 2018/7/14.
 */

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;


/**
 * @author VLoye
 * @ClassName JedisPoolConfig
 * @Description
 * @Date 19:59  2018/7/14
 * @Version 1.0
 **/
@Configuration
public class JedisConfig{
    private static final Logger logger = LoggerFactory.getLogger(JedisConfig.class);

    /*@Bean(name = "jedis.pool")
    public JedisPool jedisPool(@Qualifier("jedis.pool.config")JedisPoolConfig jedisPoolConfig,
                               @Value("${jedis.host}") String host,
                               @Value("${jedis.port}")int port,
                               @Value("${jedis.password}")String password){

        return new JedisPool(jedisPoolConfig,host,port,30000,password);
    }*/

    @Bean
    public JedisPoolConfig jedisPoolConfig(@Value("#{redisConfig['jedis.pool.max-active']}")int maxTotal,
                                           @Value("#{redisConfig['jedis.pool.max-idle']}")int maxIdle,
                                           @Value("#{redisConfig['jedis.pool.max-wait']}")int maxWaitMills,
                                           @Value("#{redisConfig['jedis.pool.min-idle']}")int minIdle){
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        jedisPoolConfig.setMaxIdle(maxIdle);
        jedisPoolConfig.setMinIdle(minIdle);
        jedisPoolConfig.setMaxTotal(maxTotal);
        jedisPoolConfig.setMaxWaitMillis(maxWaitMills);
        logger.info("jedisPoolConfig Bean 注册成功");
        return jedisPoolConfig;
    }

/*    public JedisPool jedisPool(@Autowired){
        return new JedisPool()
    }*/


}
