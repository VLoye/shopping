package com.team6.controller;

import com.team6.service.Goods.GoodsService;
import com.team6.service.login.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

@Controller
public class IndexController {

    @Autowired
    LoginService loginService;
    @Autowired
    GoodsService goodsService;
    /**
     * 首页一些需要的信息的信息
     *
     * @param model
     * @param request
     * @param response
     * @return
     */
    @ResponseBody
    @RequestMapping(value="/index")
    public Model getIndexPageInfo(Model model,
                                  HttpServletRequest request, HttpServletResponse response){

        //获取轮播图
        {
            /*TODO*/
        }

        List clist = goodsService.querySaleByGoodType();
        Map<String,Object> map = loginService.getIndexUserInfo(request);
        //用户userid和username
        model.addAttribute("user",map);
        //展示的商品
        model.addAttribute("clist",clist);
        return model;
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
