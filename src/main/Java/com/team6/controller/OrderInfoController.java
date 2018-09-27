package com.team6.controller;

import com.team6.entity.OrderInfo;
import com.team6.service.OrderInfo.OrderInfoService;
import com.team6.service.login.LoginService;
import com.team6.util.enums.OrderInfoEnum;
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

    /**
     * 插入订单信息
     * @param request
     * @param goodsId  商品的id数组
     * @param count    对应商品id的数量数组
     * @param sellerId 对应商品id所属卖家的id数组
     * @param addressId 收货地址id
     * @return
     */
    @RequestMapping(value = "/order/add",method = RequestMethod.POST)
    public boolean insertOrderInfo(HttpServletRequest request,
                                   @RequestParam("goodsId[]") int[] goodsId,
                                   @RequestParam("count[]") int[] count,
                                   @RequestParam("sellerId[]") int[] sellerId,
                                   @RequestParam("addressId") int addressId
                                   ){
        //用户信息
        Map<String,Object> map=loginService.getCurrentUserInfo(request);
        int userid=(Integer)map.get("userid");//获取下单的用户id
        OrderInfoEnum result=orderInfoService.insertOrderInfo(goodsId,count,sellerId,userid,addressId);
        if(result.equals(OrderInfoEnum.INSERT_ORDERINFO_SUCCESS))
            return true;
        else return false;
    }


}
