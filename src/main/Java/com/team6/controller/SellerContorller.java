package com.team6.controller;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author: zwk
 * @time: 2018/10/8
 * 描述
 */
@Controller
public class SellerContorller {
    /**
     * 返回卖家中心需要跳转的请求页面
     * @param url
     * @return
     */
    @RequestMapping(value="sellerCenter/{url}")
    public Object SellerSendMessage(@PathVariable("url")String url){
        return "Personality/Seller/"+url;
    }
}
