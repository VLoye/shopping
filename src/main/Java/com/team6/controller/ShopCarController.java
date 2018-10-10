package com.team6.controller;

import com.sun.org.apache.bcel.internal.generic.NEW;
import com.team6.service.login.LoginService;
import com.team6.service.shopcar.ShopCarService;
import org.noggit.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Controller
public class ShopCarController {

  @Autowired
  ShopCarService shopCarService;
    @Autowired
    LoginService loginService;


    @RequestMapping(value = "/shopCar")
    public Object toBuyerCenterPage(){
        return "ProductAndCart/Shoppingcart";
    }


    @ResponseBody
    @RequestMapping(value = "/shopCarData",produces = "text/json;charset=UTF-8")
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
    @RequestMapping(value = "/shopCar/add/{goodsId}",method = RequestMethod.POST)
    public Object shopCardAdd(HttpServletRequest request,@PathVariable("goodsId") int goodsId, @RequestParam("count") int count){

        return shopCarService.addShopCar(goodsId,count,request);
    }

    @ResponseBody
    @RequestMapping(value = "/shopCar/del/{goodsId}",method = RequestMethod.POST)
    public Object shopCardDelById(@PathVariable("goodsId") int goodsId,HttpServletRequest request){
        return shopCarService.delUserGoodsById(goodsId ,request);
    }

    @ResponseBody
    @RequestMapping(value = "/shopCar/delSelect",method = RequestMethod.POST)
    /*@RequestMapping(value = "/shopCar/delSelect",method = RequestMethod.POST)*/
    public Object ShopCarDelSelect(@RequestParam("ids[]") int ids[], HttpServletRequest request){

         
        return shopCarService.delUserGoodsByIdsSelect(ids,request);

    }


    @RequestMapping(value = "/shopCar/detailData"/*,method = RequestMethod.POST*//*, produces = "text/json;charset=UTF-8"*/)
    public ModelAndView shopDetailData(
        /* @RequestParam("ids[]") String[] ids,
            @RequestParam("counts[]") String[] counts,*/
            Model model,
            HttpServletRequest request){
        String[] ids =  request.getParameter("ids").split(",");
        String[] counts = request.getParameter("counts").split(",");

      Map<String,Object> good = (Map<String,Object>)shopCarService.detailData(ids,counts,request);


       return new ModelAndView("ProductAndCart/Shoppingcart");

    }
    @RequestMapping(value = "/shujzu")
    public Object shuzuTest( @RequestParam("idList") String[] idList,
                             @RequestParam("countList") String countList){
        return null;

    }

    @RequestMapping(value = "test/index")
    public Object test(){
        return "test/index";
    }


}
