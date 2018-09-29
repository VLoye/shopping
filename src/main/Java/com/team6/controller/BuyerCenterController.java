package com.team6.controller;

import com.team6.service.FollowService;
import com.team6.service.OrderInfo.OrderInfoService;
import com.team6.service.comment.CommentService;
import com.team6.service.login.LoginService;
import org.apache.ibatis.annotations.Param;
import org.noggit.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
//TODO 设置权限
public class BuyerCenterController {

    @Autowired
    CommentService commentService;

    @Autowired
    LoginService loginService;

    @Autowired
    FollowService followService;

    @Autowired
    OrderInfoService orderInfoService;
    //跳转到买家个人中心
    @RequestMapping(value = "/buyer")
    public Object toBuyerCenterPage(){
        return "Personality/Buyer/Buyer_model";
    }

    //跳转账户安全界面
    @RequestMapping(value="/buyer/AccountSecurity",method = RequestMethod.POST)
    public Object toAccountSecurityDataPage(){
        return "Personality/Buyer/BuyerAccountSecurity";
    }
    //跳转收货地址管理页面
    @RequestMapping(value = "/buyer/Address",method = RequestMethod.POST)
    public Object toBuyerAddressPage(){
        return "Personality/Buyer/BuyerAddress";
    }

    //跳转到修改密码页面
    @RequestMapping(value = "/buyer/ChangePassword",method = RequestMethod.POST)
    public Object toBuyerChangePasswordPage(){
        return "Personality/Buyer/BuyerChangePassword";
    }

    //跳转关注商品页面
    @RequestMapping(value = "/buyer/Concernedgoods",method = RequestMethod.POST)
    public Object toBuyerConcernedGoodsPage(){
        return "Personality/Buyer/BuyerConcernedGoods";
    }

    //跳转关注商店页面
    @RequestMapping(value = "/buyer/Concernedshop",method = RequestMethod.POST)
    public Object toBuyerConcernedShopPage(){
        return "Personality/Buyer/BuyerConcernedShop";
    }

    //跳转关注商店页面
    @RequestMapping(value = "/buyer/Consult",method = RequestMethod.POST)
    public Object toBuyerConsultManagePage(){
        return "Personality/Buyer/BuyerConsultManage";
    }

    //跳转已购商品页面
    @RequestMapping(value = "/buyer/OwnGoods",method = RequestMethod.POST)
    public Object toBuyerOwnGoodsPage(){
        return "Personality/Buyer/BuyerOwnGoods";
    }
    //跳转到




        @RequestMapping(value = "/buyer/Comment")
    public Object toCommentManage(Model model, HttpServletRequest request){
        //获取用户信息
        Map userInfo = loginService.getCurrentUserInfo(request);
        if (userInfo == null) return null;
        int userId = (int) userInfo.get("userid");
        //已评论商品
        List tab1 = commentService.okComment(userId);
        //未评论商品
        List tab2 = commentService.noComment(userId);
        model.addAttribute("tab1",tab1);
        model.addAttribute("tab2",tab2);
        Map<String,Object> map = new HashMap();
        map.put("tab1",tab1);
        map.put("tab2",tab2);
        return new ModelAndView("Personality/Buyer/BuyerCommentManage",map);

    }

    //取得关注的商品
    @RequestMapping(value = "/buyer/ConcernedgoodsData",
            method = RequestMethod.POST,
            produces = "text/json;charset=UTF-8")
    @ResponseBody
    public Object getConcernedGoodsData(HttpServletRequest request){
        //关注类型为goods
        final int TYPE=1;
        List list = followService.follows(TYPE);
        return JSONUtil.toJSON(list);
    }

    //取得关注的商家
    @RequestMapping(value = "/buyer/ConcernedshopData",
            method = RequestMethod.POST,
            produces = "text/json;charset=UTF-8")
    @ResponseBody
    public Object getConcernedshopData(HttpServletRequest request){
        //关注类型为shops
        final int TYPE=2;
        List list = followService.follows(TYPE);
        return JSONUtil.toJSON(list);
    }


    @ResponseBody
    @RequestMapping(value="/buyer/OwnGoodsData")
    public Object OwnGoodsData(@Param("key") Integer key, HttpServletRequest request){
        return orderInfoService.queryOrderByUserid(key,request);
    }
}
