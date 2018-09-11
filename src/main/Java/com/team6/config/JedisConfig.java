package com.team6.config;/**
 * Created by VLoye on 2018/7/14.
 */

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

    @Bean(name = "jedis.pool")
    public JedisPool jedisPool(@Qualifier("jedis.pool.config")JedisPoolConfig jedisPoolConfig,
                               @Value("${jedis.host}") String host,
                               @Value("${jedis.port}")int port,
                               @Value("${jedis.password}")String password){

        return new JedisPool(jedisPoolConfig,host,port,30000,password);
    }

    @Bean(name = "jedis.pool.config")
    public JedisPoolConfig jedisPoolConfig(@Value("${jedis.pool.max-active}")int maxTotal,
                                           @Value("${jedis.pool.max-idle}")int maxIdle,
                                           @Value("${jedis.pool.max-wait}")int maxWaitMills,
                                           @Value("${jedis.pool.min-idle}")int minIdle){
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        jedisPoolConfig.setMaxIdle(maxIdle);
        jedisPoolConfig.setMinIdle(minIdle);
        jedisPoolConfig.setMaxTotal(maxTotal);
        jedisPoolConfig.setMaxWaitMillis(maxWaitMills);
        return jedisPoolConfig;
    }


}
