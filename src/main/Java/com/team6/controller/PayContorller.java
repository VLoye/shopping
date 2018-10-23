package com.team6.controller;

import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.team6.service.OrderInfo.OrderInfoService;
import com.team6.util.AlipayConfig;
import com.team6.util.AlipayUntil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;


@Controller
@RequestMapping(value = "/pay")
public class PayContorller {
    @Autowired
    OrderInfoService orderInfoService;
    @RequestMapping("/toPayPage/{orderId}")
    public ModelAndView toPayPage(@PathVariable("orderId")Integer orderId, HttpServletRequest request){
        ModelAndView modelAndView=new ModelAndView();
        Map<String,Object> orderInfo= (Map<String, Object>) orderInfoService.queryOrderByOrderid(orderId,request);
        modelAndView.setViewName("Personality/Buyer/Buyer_topay");
        modelAndView.addObject("orderInfo",orderInfo);
        return modelAndView;
    }

    @ResponseBody
    @RequestMapping(value = "/payPage/{orderId}", produces = "text/html;charset=UTF-8")
    public String PayPage(Model model, HttpServletRequest request,
                          @PathVariable("orderId")Integer orderId){
        String result = AlipayUntil.pay(request,orderId);
        return result;
    }
}
