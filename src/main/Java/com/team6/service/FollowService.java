package com.team6.service;/**
 * Created by VLoye on 2018/9/13.
 */

import com.team6.dao.GoodsMapper;
import com.team6.dao.ShopMapper;
import com.team6.dao.UserMapper;
import com.team6.service.login.LoginService;
import com.team6.util.HostHolder;
import com.team6.util.JedisKeyUtil;
import io.swagger.models.auth.In;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * @author VLoye
 * @ClassName FollowService
 * @Description
 * @Date 9:03  2018/9/13
 * @Version 1.0
 **/
@Service
public class FollowService {
    private static final Logger logger = LoggerFactory.getLogger(FollowService.class);

    @Autowired
    JedisAdapter jedisAdapter;

    @Autowired
    HostHolder hostHolder;
    @Autowired
    GoodsMapper goodsMapper;
    @Autowired
    ShopMapper shopMapper;

    public Map follow(int entityId,int entityType){
        HashMap<String ,Object> map = new HashMap<String ,Object>();
        map.put("success",false);
        Map userMap = hostHolder.getCurrentUserInfo();
        String keyFollower = JedisKeyUtil.getFollower((Integer) userMap.get("userId"),entityType);
        String keyFollowee = JedisKeyUtil.getFollower(entityId,entityType);
        long statuser = jedisAdapter.sadd(keyFollower,String.valueOf(entityId));
        long statusee = jedisAdapter.sadd(keyFollowee,(String) userMap.get("userId"));
        if(statuser == 0 && statusee ==0){
            map.put("msg","已关注");
            return map;
        }
        map.put("success",true);
        return map;
    }

    public Map unfollow(int entityId,int entityType){
        HashMap<String ,Object> map = new HashMap<String ,Object>();
        map.put("success",false);
        String keyFollower = JedisKeyUtil.getFollower(hostHolder.getCurrentUserId(),entityType);
        String keyFollowee = JedisKeyUtil.getFollower(entityId,entityType);

        long statuser = jedisAdapter.srem(keyFollower,String.valueOf(entityId));
        long statusee = jedisAdapter.sadd(keyFollowee,String.valueOf(hostHolder.getCurrentUserId()));

        if(statuser == 0 && statusee ==0){
            map.put("msg","未关注该商品/商家");
            return map;
        }
        map.put("success",true);
        return map;
    }

    public List follows(int entityType){
        List list =null;
        String key = JedisKeyUtil.getFollower(hostHolder.getCurrentUserId(),entityType);
        Set<String> ids = jedisAdapter.smember(key);
        //商品
        if(entityType == 1){
            list = goodsMapper.queryGoodsByIdArray(ids.toArray());
        }else {
            //商家
            list = shopMapper.queryShopByIdArray(ids.toArray());
        }
        return  list;
    }

}
