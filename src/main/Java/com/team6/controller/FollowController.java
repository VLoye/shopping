package com.team6.controller;/**
 * Created by VLoye on 2018/9/12.
 */

import com.team6.service.JedisAdapter;
import com.team6.service.login.LoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author VLoye
 * @ClassName FollowController
 * @Description
 * @Date 17:06  2018/9/12
 * @Version 1.0
 * 关注收藏
 **/
public class FollowController {
    private static final Logger logger = LoggerFactory.getLogger(FollowController.class);

    @Autowired
    JedisAdapter jedisAdapter;
    @Autowired
    LoginService loginService;

    @RequestMapping("follow/{id}/{type}")
    @ResponseBody
    public String follow(@PathVariable("id")int id,@PathVariable("type")int type){

        return null;
    }


}
