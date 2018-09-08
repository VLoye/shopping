package com.team6.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.Map;

@Controller
public class HomePageController {

    @RequestMapping("/index")
    public String showIndex(Model model){
        /**
         * data=["username":username,"userid":userid,
         * lblist:{"lbitem"（4）:"图片地址"，url跳转},
         * "clist":{["gid":gid,"gname":gname,"gimg":gimg,"gprice":gprice](48)}]
         * (注：clist包含48个子对象，平均每层8个，共6层，
         * 根据goodstype的发动机系统、传动系统、行走系统、电器、车身及驾驶室、美容养护6种中搜索,1到6层顺序添加）
         */
        return "Index";
    }

    /**
     *
     * @return json格式
     */
    @ResponseBody
    @RequestMapping("/search/{key}")
    public Map search(/*TODO*/){

        return null;
    }
}
