package com.team6.service;/**
 * Created by VLoye on 2018/9/13.
 */

import com.team6.service.login.LoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    LoginService loginService;

    public void follow(int entityId,int entityType){

    }


}
