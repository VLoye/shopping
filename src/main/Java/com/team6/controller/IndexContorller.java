package com.team6.controller;

import com.team6.service.Goods.GoodsService;
import com.team6.service.login.LoginService;
import com.team6.service.rb.RbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.crypto.Data;
import java.util.List;
import java.util.Map;

@Controller
public class IndexContorller {

    @Autowired
    LoginService loginService;
    @Autowired
    GoodsService goodsService;
    @Autowired
    RbService rbService;

    /**
     * 首页一些需要的信息的信息
     *
     * @param model
     * @param request
     * @param response
     * @return
     */

    @RequestMapping("/index")
    public ModelAndView getIndexPageInfo(Model model,
                                         HttpServletRequest request, HttpServletResponse response){



        //获取轮播图
        List rblist = (List)rbService.queryAllInfo();


        List clist = goodsService.querySaleByGoodType();
        Map<String,Object> map = loginService.getCurrentUserInfo(request);
        //用户userid和username
        model.addAttribute("user",map);
        //展示的商品
        model.addAttribute("clist",clist);
        //展示轮播图
        model.addAttribute("rblist",rblist);
        ModelAndView modelAndView = new ModelAndView("/Main/Index", "data",model);

        return modelAndView;
    }

    /**
     *
     * @return json格式
     */
    @ResponseBody
    @RequestMapping("/search/{key}")
    public Map search(/*TODO*/){

        return null;
    }
}
