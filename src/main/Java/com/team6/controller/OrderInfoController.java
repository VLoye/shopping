package com.team6.controller;

import com.team6.entity.OrderInfo;
import com.team6.service.OrderInfo.OrderInfoService;
import com.team6.service.login.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller
public class OrderInfoController {
    @Autowired
    OrderInfoService orderInfoService;
    @Autowired
    LoginService loginService;
    @RequestMapping(value="/orders")
    @ResponseBody
    public ModelAndView getUserOrders(HttpServletRequest request){
        return null;
    }


    @RequestMapping(value = "/order/add",method = RequestMethod.POST)
    public boolean insertOrderInfo(HttpServletRequest request,
                                   @RequestParam("addressId") int addressId
                                   ){

        //用户信息
        Map<String,Object> map=loginService.getCurrentUserInfo(request);
        int userid=(Integer)map.get("userid");

        return true;
    }


}
