package com.team6.controller;

import com.team6.service.login.LoginService;
import com.team6.service.shopcar.ShopCarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

@Controller
public class ShopCarController {

  @Autowired
  ShopCarService shopCarService;
    @Autowired
    LoginService loginService;




    @RequestMapping(value = "/shopCarData")
    public ModelAndView shopCarPage(Model model , HttpServletRequest request, HttpServletResponse response){

        //用户信息
        Map<String,Object> map = loginService.getCurrentUserInfo(request);
        int userid = (int) map.get("userid");
        //购物车信息
        List list = (List) shopCarService.shopCar(userid);
         model.addAttribute("user",map);
        model.addAttribute("goods",list);
        ModelAndView modelAndView = new ModelAndView("", "data",model);

return modelAndView;

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
    @RequestMapping(value = "/shopCar/delSelect")
    public Object ShopCarDelSelect(@RequestParam(value = "list[]") List<Integer> list,HttpServletRequest request){
        return shopCarService.delUserGoodsByIdsSelect(list,request);
    }
}
