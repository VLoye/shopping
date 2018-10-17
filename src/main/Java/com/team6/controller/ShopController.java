package com.team6.controller;

import com.alibaba.fastjson.JSON;
import com.sun.org.apache.regexp.internal.RE;
import com.team6.service.login.LoginService;
import com.team6.service.shop.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import sun.misc.Request;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/shop")
public class ShopController {

    @Autowired
    ShopService shopService;
    @Autowired
    LoginService loginService;
    //跳转商铺页面
    @RequestMapping(value = "/home/{shopId}")
    public Object toShop(Model model, @PathVariable("shopId") int shopId, HttpServletRequest request){
        Map user = loginService.getCurrentUserInfo(request);
        boolean isLogin = false;
        if(user!=null) isLogin = true;
        model.addAttribute("isLogin",isLogin);
        model.addAttribute("shopId",shopId);
        return new ModelAndView("/ProductAndCart/Shop","pageInfo",model);

    }

    @ResponseBody
    @RequestMapping(value = "/shopData",method = RequestMethod.POST)
    public Object shopData(Model model, HttpServletRequest request
                          ){
        int shopId = Integer.parseInt(request.getParameter("shopId"));
        Object obj = shopService.getShopData(shopId,request);
        /*Map map = new HashMap();
        map.put("data",obj);*/

        return JSON.toJSON(obj);
    }
}
