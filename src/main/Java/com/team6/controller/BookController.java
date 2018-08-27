package com.team6.controller;/**
 * Created by VLoye on 2018/4/28.
 */


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * @author VLoye
 * @ClassName BookController
 * @Description
 * @Date 11:05  2018/4/28
 * @Version 1.0
 **/
@Controller
@RequestMapping(value = "book")
@Api(value = "book",tags = "/book",description = "book接口")
public class BookController {

    private Logger logger= LoggerFactory.getLogger(BookController.class);

    @RequestMapping(value ="index",method = RequestMethod.GET)
    @ApiOperation(value = "跳转到main主页",httpMethod = "GET",notes = "redirect main")
    public String index(){
        logger.info("index-------");

        return "main";
    }


    @RequestMapping(value ="book/{id}",method = RequestMethod.GET)
    @ApiOperation(value = "跳转到test页面",httpMethod = "GET",notes = "redirect test")
    public String test(){
        logger.info("index-------");
        return "main";
    }

    @RequestMapping(value ="method",method = RequestMethod.GET)
    @ApiOperation(value = "method",httpMethod = "GET")
    public String method(@RequestParam("name")String name){
        logger.info(name);
        logger.info("index-------");
        return "main";
    }
}
