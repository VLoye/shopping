package com.team6.controller;

import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.team6.util.AlipayConfig;
import com.team6.util.AlipayUntil;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;


@Controller
@RequestMapping(value = "/pay")
public class PayContorller {

    @RequestMapping("/toPayPage")
    public Object toPayPage(){
        return "test/pay";
    }

    @ResponseBody
    @RequestMapping(value = "/payPage", produces = "text/html;charset=UTF-8")
    public String PayPage(Model model, HttpServletRequest request){

        String result = AlipayUntil.pay(request);
        return result;
    }
}
