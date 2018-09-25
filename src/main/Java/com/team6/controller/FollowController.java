package com.team6.controller;/**
 * Created by VLoye on 2018/9/12.
 */

import com.team6.service.FollowService;
import com.team6.service.JedisAdapter;
import com.team6.service.login.LoginService;
import com.team6.util.HostHolder;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.noggit.JSONUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * @author VLoye
 * @ClassName FollowController
 * @Description
 * @Date 17:06  2018/9/12
 * @Version 1.0
 * 关注收藏
 **/
@Api(value = "/follow",tags = "follow",description = "收藏")
@Controller
public class FollowController {
    private static final Logger logger = LoggerFactory.getLogger(FollowController.class);

    @Autowired
    JedisAdapter jedisAdapter;
    @Autowired
    LoginService loginService;
    @Autowired
    HostHolder hostHolder;
    @Autowired
    FollowService followService;


    @ApiOperation(value = "关注商品/商家",httpMethod = "Post",notes = "关注商品/商家")
    @RequestMapping(value = "follow/{id}/{type}" ,method = RequestMethod.POST)
    @ResponseBody
    public String follow(@PathVariable("id")int id,@PathVariable("type")int type){
        Map map = followService.follow(id,type);
        return JSONUtil.toJSON(map);
    }

    @ApiOperation(value = "取关",httpMethod = "Post")
    @RequestMapping(value = "unfollow/{id}/{type}" ,method = RequestMethod.POST)
    @ResponseBody
    public String unfollow(@PathVariable("id")int id,@PathVariable("type")int type){
        Map map = followService.unfollow(id,type);
        return JSONUtil.toJSON(map);
    }

    @ApiOperation(value = "返回所有关注",httpMethod = "Get")
    @RequestMapping(value = "follows/{type}",method = RequestMethod.GET)
    @ResponseBody
    public String follows(@PathVariable("type")int type){
        List list = followService.follows(type);
        return JSONUtil.toJSON(list);
    }

}
