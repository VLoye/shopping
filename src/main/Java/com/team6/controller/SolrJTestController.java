package com.team6.controller;/**
 * Created by VLoye on 2018/8/22.
 */

import com.team6.service.SolrService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.noggit.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @author VLoye
 * @ClassName SolrJTestController
 * @Description
 * @Date 9:14  2018/8/22
 * @Version 1.0
 **/
@Controller
@RequestMapping("/solr")
@Api(value = "solr",description = "solr")
public class SolrJTestController {
    @Autowired
    private SolrService solrService;

    @RequestMapping(value = "/test",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "solrTest",httpMethod = "GET")
    public  String test(@RequestParam("key")String key){
        List<Integer> list = solrService.solrTest(key);
        return JSONUtil.toJSON(list);
    }

}
