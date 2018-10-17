package com.team6.controller;

import com.team6.service.Goods.GoodsService;
import com.team6.service.comment.CommentService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.aspectj.apache.bcel.generic.ObjectType;
import org.noggit.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import springfox.documentation.spring.web.json.Json;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping(value = "/seller")
public class SellerCenterController {

    @Autowired
    CommentService commentService;
    @Autowired
    GoodsService goodsService;
    //跳转到卖家中心
    @RequestMapping(value = "/center", method = RequestMethod.GET)
    public Object center() {

        return "Personality/Seller/Seller_model";
    }

    @RequestMapping(value = "/addGoods", method = RequestMethod.GET)
    public Object addGoods() {

        return "Personality/Seller/addGoods";
    }

    @RequestMapping(value = "upload",method = RequestMethod.POST)
    @ResponseBody
    public Object upload(@RequestParam("fileName") MultipartFile file, HttpServletRequest request){


        return JSONUtil.toJSON(new String("success"));
    }

    @RequestMapping(value = "error",method = RequestMethod.POST)
    @ResponseBody
    public Object uploaderror(HttpServletRequest request){
        try{
            throw new Exception();
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    //修改密码
    public Object changePassword(){

        return null;
    }

    //返回企业信息
    public Object Cominfo(){

        return null;
    }

    //卖家商品的评论数据
    @RequestMapping(value = "/comment" ,method = RequestMethod.POST)
    public Object comment(Model model, HttpServletRequest request,
                          @RequestParam("shopId") int shopId){

        List commentList = commentService.shopComment(shopId);
        model.addAttribute(commentList);
        return new ModelAndView("Personality/Seller/SellerCommentManage","data",model);
    }

    //商品管理
    @RequestMapping(value = "/goods")
    public Object goods(Model model, HttpServletRequest request,
                        @RequestParam("shopId") int shopId){

        List goodsList = (List)goodsService.queryShopGoodsByShopId(shopId);
        model.addAttribute(goodsList);
        return new ModelAndView("Personality/Seller/SellerGoodManage","data",model);
    }


    //卖家回复的评论
    public Object LeavedMessage(){
        return null;
    }

    //卖家卖出商品页面
    public Object sellerGoods(){
        return null;
    }
    //卖家卖出商品数据
    public Object sellerGoodsData(){
        return null;
    }

}
