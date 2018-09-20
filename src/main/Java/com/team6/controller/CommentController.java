package com.team6.controller;

import com.team6.service.comment.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
public class CommentController {

    @Autowired
    CommentService commentService;
    @RequestMapping(value = "/commnets/{goodsId}",method = RequestMethod.POST)
    @ResponseBody
    public Model getCommentList(@PathVariable("goodsId" ) int goodsId,
                                HttpServletRequest request,
                                Model model){

        List list = commentService.queryByGoodId(goodsId);
        model.addAttribute("data",list);
        return model;
    }
}
