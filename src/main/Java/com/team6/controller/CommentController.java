package com.team6.controller;

import com.team6.entity.Comment;
import com.team6.service.comment.CommentService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@Controller
public class CommentController {

    @Autowired
    CommentService commentService;
    @RequestMapping(value = "/commnets/{goodsId}",method = RequestMethod.POST)
    @ResponseBody
    public Model getCommentList(@PathVariable("goodsId" ) int goodsId,
                                @RequestParam("currNum") int currNum,
                                HttpServletRequest request,
                                Model model){

        List list = commentService.queryByGoodId(goodsId,currNum);
        int pageNum = commentService.queryPageNumByGoodId(goodsId);
        model.addAttribute("data",list);
        model.addAttribute("pageNum",pageNum);
        return model;
    }

    @RequestMapping(value = "/comment/add/{goodsId}",method = RequestMethod.POST)
    @ResponseBody
    public Object addComment(HttpServletRequest request,
                             @RequestBody Map<String,String> map,
                             Model model){
        boolean result = commentService.addComment(map);
        model.addAttribute("msg",result);
        return model;
    }
}
