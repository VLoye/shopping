package com.team6.controller;

import com.team6.entity.Comment;
import com.team6.service.comment.CommentService;
import com.team6.service.login.LoginService;
import org.apache.ibatis.annotations.Param;
import org.noggit.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import sun.security.provider.MD2;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@Controller
public class CommentController {

    @Autowired
    CommentService commentService;
    @Autowired
    LoginService loginService;
    @RequestMapping(value = "/commnets/{goodsId}",method = RequestMethod.POST,produces = "text/json;charset=UTF-8")
    @ResponseBody
    public Object getCommentList(@PathVariable("goodsId" ) int goodsId,
                                @RequestParam("currNum") int currNum,
                                HttpServletRequest request,
                                Model model){

        List list = commentService.queryByGoodId(goodsId,currNum);
        int pageNum = commentService.queryPageNumByGoodId(goodsId);
        model.addAttribute("data",list);
        model.addAttribute("pageNum",pageNum);
        return JSONUtil.toJSON(model);
    }

    @RequestMapping(value = "/comment/add/{goodsId}",method = RequestMethod.POST,produces = "text/json;charset=UTF-8")
    @ResponseBody
    public Object addComment(HttpServletRequest request,
                             @RequestBody Map<String,String> map,
                             Model model){
        boolean result = commentService.addComment(map);
        model.addAttribute("msg",result);
        return JSONUtil.toJSON(model);
    }

    /**
     * 获取用户的已评价商品
     * @param request
     * @param model
     * @return
     */
    @RequestMapping(value = "/comments/goods/ok",method = RequestMethod.POST,produces = "text/json;charset=UTF-8")
    @ResponseBody
    public Object getUserComment(HttpServletRequest request,Model model){
        Map userInfo = loginService.getCurrentUserInfo(request);
        if(userInfo==null) return null;
        int userId = (int)userInfo.get("userid");
        List<Map> okCommentList = commentService.okComment(userId);
        model.addAttribute("data",okCommentList);
    return JSONUtil.toJSON(model);
    }

    /**
     * 获取用户未评价商品
     * @param request
     * @param model
     * @return
     */
    @RequestMapping(value = "/comments/goods/no",method = RequestMethod.POST,produces = "text/json;charset=UTF-8")
    @ResponseBody
    public Object getUserNoComment(HttpServletRequest request,Model model) {
        Map userInfo = loginService.getCurrentUserInfo(request);
        if (userInfo == null) return null;
        int userId = (int) userInfo.get("userid");
        List<Map> noCommentList = commentService.noComment(userId);
        model.addAttribute("data", noCommentList);
        return JSONUtil.toJSON(model);
    }
}
