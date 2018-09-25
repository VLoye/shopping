package com.team6.service;/**
 * Created by VLoye on 2018/7/12.
 */

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

import java.util.Set;

/**
 * @author VLoye
 * @ClassName JedisAdapter
 * @Description
 * @Date 12:04  2018/7/12
 * @Version 1.0
 **/
@Service
@ComponentScan("com.team6.config")
public class JedisAdapter{
    private static final Logger logger = LoggerFactory.getLogger(JedisAdapter.class);

    @Autowired
    private JedisPoolConfig jedisPoolConfig;

    @Autowired
    private JedisPool jedisPool;


    /**
    *@author VLoye
    *@Description  存储键值对
    *@Date 17:30 2018/9/12
    *@Param [key, value, second]
    *@return boolean
    **/
    public boolean setKV(String key,String value,int second){
        Jedis jedis = null;
        try{
            jedis = jedisPool.getResource();
            jedis.set(key,value);
            jedis.expire(key,second);
            return true;
        }catch (Exception e){
            logger.error(JedisAdapter.class.getName()+ " setKV error");
            e.printStackTrace();
        }finally {
            if(jedis != null){
                jedis.close();
            }
        }
        return false;
    }

    /**
    *@author VLoye
    *@Description  通过键获取值
    *@Date 17:31 2018/9/12
    *@Param [key]
    *@return java.lang.String
    **/
    public String getKV(String key){
        Jedis jedis = null;
        try{
            jedis = jedisPool.getResource();

            //刷新过期时间
//            jedis.expire(key,3600*24*3);
            return jedis.get(key);
        }catch (Exception e){
            logger.error(JedisAdapter.class.getName()+ " getKV error");
            e.printStackTrace();
        }finally {
            if(jedis != null){
                jedis.close();
            }
        }
        return null;
    }

    /**
    *@author VLoye
    *@Description  列出所有的键
    *@Date 17:32 2018/9/12
    *@Param [pattern]
    *@return java.util.Set<java.lang.String>
    **/
    public Set<String> Keys(String pattern){
        Jedis jedis = null;
        try{
            jedis = jedisPool.getResource();
            return jedis.keys(pattern);
        }catch (Exception e){
            logger.error(JedisAdapter.class.getName()+ " Keys error");
            e.printStackTrace();
        }finally {
            if(jedis != null){
                jedis.close();
            }
        }
        return null;
    }

    /**
    *@author VLoye
    *@Description  set 向key集合中添加value元素
    *@Date 17:32 2018/9/12
    *@Param [key, value]
    *@return long
    **/
    public long sadd(String key,String value){
        Jedis jedis = null;
        try{
            jedis = jedisPool.getResource();
            return jedis.sadd(key,value);
        }catch (Exception e){
            logger.error(JedisAdapter.class.getName()+ " sadd error");
            e.printStackTrace();
        }finally {
            if(jedis != null){
                jedis.close();
            }
        }
        return 0;
    }

    /**
    *@author VLoye
    *@Description  set 删除集合中的元素
    *@Date 17:33 2018/9/12
    *@Param [key, value]
    *@return long
    **/
    public long srem(String key,String value){
        Jedis jedis = null;
        try{
            jedis = jedisPool.getResource();
            return jedis.srem(key,value);
        }catch (Exception e){
            logger.error(JedisAdapter.class.getName()+ " srem error");
            e.printStackTrace();
        }finally {
            if(jedis != null){
                jedis.close();
            }
        }
        return 0;
    }
    /**
    *@author VLoye
    *@Description  set 返回集合中的元素个数
    *@Date 17:34 2018/9/12
    *@Param [key, value]
    *@return long
    **/
    public long scard(String key){
        Jedis jedis = null;
        try{
            jedis = jedisPool.getResource();
            return jedis.scard(key);
        }catch (Exception e){
            logger.error(JedisAdapter.class.getName()+ " scard error");
            e.printStackTrace();
        }finally {
            if(jedis != null){
                jedis.close();
            }
        }
        return 0;
    }

    /**
    *@author VLoye
    *@Description  set 判断value元素是否在key集合中
    *@Date 17:35 2018/9/12
    *@Param [key, value]
    *@return boolean
    **/
    public boolean sismember(String key,String value){
        Jedis jedis = null;
        try{
            jedis = jedisPool.getResource();
            return jedis.sismember(key,value);
        }catch (Exception e){
            logger.error(JedisAdapter.class.getName()+ " sismember error");
            e.printStackTrace();
        }finally {
            if(jedis != null){
                jedis.close();
            }
        }
        return false;
    }

    public Set smember(String key){
        Jedis jedis = null;
        try{
            jedis = jedisPool.getResource();
            return jedis.smembers(key);
        }catch (Exception e){
            logger.error(JedisAdapter.class.getName()+ " smember error");
            e.printStackTrace();
        }finally {
            if(jedis != null){
                jedis.close();
            }
        }
        return null;
    }

}
