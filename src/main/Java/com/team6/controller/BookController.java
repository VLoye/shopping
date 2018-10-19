package com.team6.controller;/**
 * Created by VLoye on 2018/4/28.
 */


import com.team6.service.rabbitMQ.SolrProducer;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

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

    @Autowired
    SolrProducer solrProducer;

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

    @RequestMapping(value = "solrTest",method = RequestMethod.GET)
    public String solrTest(){
        Thread thread = new Thread(new Runnable() {
            int i=0;
            @Override
            public void run() {
                while(i<50) {
                    try {
                        HashMap map = new HashMap();
                        map.put("name", "object" + ++i);
                        logger.info("添加消息"+i);
                        solrProducer.sendDateToQueue("solr", map);
                    }catch (Exception e){
                        e.printStackTrace();
                    }
                }
            }
        });
        thread.start();
        return null;
    }
}
