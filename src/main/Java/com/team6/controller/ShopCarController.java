package com.team6.controller;

import com.team6.service.login.LoginService;
import com.team6.service.shopcar.ShopCarService;
import org.apache.commons.math3.analysis.solvers.NewtonRaphsonSolver;
import org.apache.ibatis.annotations.Param;
import org.noggit.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import springfox.documentation.spring.web.json.Json;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Controller
public class ShopCarController {

  @Autowired
  ShopCarService shopCarService;
    @Autowired
    LoginService loginService;


    @RequestMapping(value = "/shopCar")
    public ModelAndView shopCar(){
        return new ModelAndView("");
    }


    @ResponseBody
    @RequestMapping(value = "/shopCarData")
    public Object shopCarPage(Model model , HttpServletRequest request, HttpServletResponse response){

        //用户信息
        Map<String,Object> map = loginService.getCurrentUserInfo(request);
        int userid = (int) map.get("userid");
        //购物车信息
        List list = (List) shopCarService.shopCar(userid);
        model.addAttribute("user",map);
        model.addAttribute("goods",list);
      /*  ModelAndView modelAndView = new ModelAndView("", "data",model);*/

        return JSONUtil.toJSON(model);

    }

    @ResponseBody
    @RequestMapping(value = "/shopCar/add/{goodsId}")
    public Object shopCardAdd(HttpServletRequest request,@PathVariable("goodsId") int goodsId, @RequestParam("count") int count){

        return shopCarService.addShopCar(goodsId,count,request);
    }

    @ResponseBody
    @RequestMapping("/shopCar/del/{goodsId}")
    public Object shopCardDelById(@PathVariable("goodsId") int goodsId,HttpServletRequest request){
        return shopCarService.delUserGoodsById(goodsId ,request);
    }

    @ResponseBody
    @PostMapping("/shopCar/delSelect")
    /*@RequestMapping(value = "/shopCar/delSelect",method = RequestMethod.POST)*/
    public Object ShopCarDelSelect(@RequestParam("ids[]") int ids[], HttpServletRequest request){

         
        return shopCarService.delUserGoodsByIdsSelect(ids,request);

    }


    @PostMapping(value = "/shopCar/detailData")
    public ModelAndView shopDetailData(
         @RequestParam("ids[]") int[] ids,
            @RequestParam("counts[]") int[] counts,
            Model model,
            HttpServletRequest request){

       Map<String,Object> good = (Map<String,Object>)shopCarService.detailData(ids,counts,request);


        return new ModelAndView("detailData","good",good);

    }
    @PostMapping(value = "/shujzu")
    public Object shuzuTest( @RequestParam("idList") String[] idList,
                             @RequestParam("countList") String countList){
        return null;

    }


}
