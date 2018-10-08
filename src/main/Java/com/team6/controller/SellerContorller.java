package com.team6.controller;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author: zwk
 * @time: 2018/10/8
 * 描述
 */
@Controller
public class SellerContorller {
    @RequestMapping("/seller")
    public String toPage(@Param("url") String url){
        return "/Personality/Seller/"+url+".html";
    }
}
