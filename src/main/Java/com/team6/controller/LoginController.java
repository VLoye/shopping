package com.team6.controller;

import com.alibaba.druid.support.logging.Log;
import com.alibaba.druid.support.logging.LogFactory;
import com.alibaba.fastjson.JSON;
import com.auth0.jwt.interfaces.Claim;
import com.team6.entity.User;
import com.team6.service.login.LoginService;
import com.team6.util.Constants;
import com.team6.util.RandomValidateCode;
import com.team6.util.enums.LoginEnum;
import com.team6.util.jwtUtil;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.ibatis.annotations.Param;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.pam.UnsupportedTokenException;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.session.HttpServletSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import sun.misc.Request;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.net.CookieStore;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Timer;

@Controller
public class LoginController {
    private static final Log log = LogFactory.getLog(LoginController.class);
    @Autowired
    private LoginService loginService;
    @Resource
    RandomValidateCode code;
    @RequestMapping("/vcode")
    public void vcode(HttpServletRequest request,HttpServletResponse response) {
        code.getRandcode(request, response);
    }

    @RequestMapping(value = "/login",method = RequestMethod.GET)
    public ModelAndView login(){
    return new ModelAndView("/LoginAndResigter/Login");
    }

    @RequestMapping(value = "/logout")
    public Object logout(HttpServletRequest request,HttpServletResponse response){
            loginService.logout(request,response);

        return new ModelAndView("redirect:/index");
    }
    //查看是否登陆
    @RequestMapping(value = "/isLogin",method = RequestMethod.POST)
    @ResponseBody
    public Object islogin(Model model,HttpServletRequest request){
        Map<String,Object> info = loginService.getCurrentUserInfo(request);
        //没登陆
        if(info!=null) model.addAttribute("success",true);
        //登陆了
        else model.addAttribute("success",true);
        return JSON.toJSON(model);
    }

    @ResponseBody
    @RequestMapping(value = "/login",method = RequestMethod.POST,produces="application/json;charset=UTF-8" )
    public  Map<String,String> login(@Param("name") String name, @Param("password") String password,@Param("vcode") String vcode,
                                     HttpServletResponse response,HttpServletRequest request){

        Map<String,String> map = new HashMap<>();
        //验证码如果不正确就返回
        if(!this.verifyCode(vcode,response,request)) {
            map.put("status",LoginEnum.LOGIN_VCODE_ERROR.getInfo());
            return map;
        }
        UsernamePasswordToken token = new UsernamePasswordToken(name,password);
        Subject subject = SecurityUtils.getSubject();

        try {
            //触发登陆操作
            token.setRememberMe(true);
            subject.login(token);
            response.addCookie(new Cookie(LoginEnum.USER_COOKIE_TOKEN.getInfo(),
                                (String)subject.getPrincipal()));
        }catch (UnsupportedTokenException e){
            map.put("status",e.toString());
            subject.logout();
            return map;
        }
        //登陆成功
        map.put("status",LoginEnum.LOGIN_SUCCESS.getInfo());
        return map;
    }


    //跳转到注册页面
    @RequestMapping(value = "/toRegister")
    public Object toRegister(){
        return "/LoginAndResigter/Register";
    }

    //发送验证码
    @ResponseBody
    @RequestMapping(value = "/sendCode",method = RequestMethod.POST)
    public Object tre(Model model, @Param("email") String email, HttpServletRequest request){

        boolean success=false;
        if(loginService.sendCode(request,email)){
            success = true;
        }
        model.addAttribute("success",success);
        return JSON.toJSON(model);
    }


    @ResponseBody
    @RequestMapping(value = "/register",method = RequestMethod.POST)
    public Object register(Model model,HttpServletRequest request){
        User user = new User();
        String code = (String)request.getSession().getAttribute("code");

        //数据封装
        String[] data = request.getParameterValues("name");

        //首先检验验证码
        if(!data[4].equals(code)){
            //验证码不正确
            model.addAttribute("msg","验证码不正确");
            return JSON.toJSON(model);
        }

        user.setName(data[0]);
        user.setPassword(data[1]);
        user.setEmail(data[3]);

        //角色默认为普通用户
        user.setRole(LoginEnum.USER_ROLE_USER.getRole());
      LoginEnum anEnum = loginService.regiest(user);

        //注册成功
      if(anEnum.equals(LoginEnum.REGIEST_SUCCESS)){
          //暂时不实现这个注册后自动登陆的的功能
          /*Subject subject = SecurityUtils.getSubject();
          subject.login(new UsernamePasswordToken(user.getName(),user.getPassword()));*/

          model.addAttribute("success",true);

          return JSON.toJSON(model);
      }
      else{
          model.addAttribute("success",false);
          model.addAttribute("msg","注册失败");
          return JSON.toJSON(model);
    }

    }

    /**
     *
     * 如果用户有cookie就请求，没有就显示用户没有登陆
     * ajax请求用户信息
     */
    @ResponseBody
    @RequestMapping("/userInfo")
    public Map<String,String> getUseInfo(HttpServletRequest request, HttpServletResponse response){
        //取得cookies 遍历取得名字为token的cookie
        Cookie[] cookies =request.getCookies();
        Cookie cookie=null;
        for(Cookie c :cookies){
            if(c.getName().equals(LoginEnum.USER_COOKIE_TOKEN.getInfo())){
                cookie = c;
                break;
            }
        }
        //如果登陆信息为空
        if(cookie==null) {
            Map<String,String> map = new HashMap<>();
            map.put("data",null);
        }
        String token = cookie.getValue();
        try {
            Map<String, Claim> map = new HashMap<>();
            map=jwtUtil.verifyToken(token);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 验证验证码是否正确
     * @param vcode
     * @return
     */
   private boolean verifyCode(String vcode,HttpServletResponse response,HttpServletRequest request){
        //从session得到验证码
       String sessionCode=(String)request.getSession().getAttribute(Constants.RANDOM_CODE_KEY);

       /**
        * 将随机生成的验证码和用户输入的验证码统一转化成大写或者小写
        * 如果验证码正确就删了session存的验证码
        */
       vcode=vcode.toLowerCase();
       sessionCode=sessionCode.toLowerCase();

       if(vcode.equals(sessionCode)) {
           request.getSession().removeAttribute(Constants.RANDOM_CODE_KEY);
           return true;
       }
       else{
           return false;
       }
   }


    /**
     * 测试
     * @return
     */
    @RequiresPermissions(value={"add","del"},logical= Logical.OR)
    @RequestMapping(value = "/testor")
    public String testURLOR(){
        System.out.println("111");
        return null;
    }

    @RequiresPermissions(value={"fun2","fun1"},logical= Logical.AND)
    @RequestMapping(value = "/testand")
    public String testURLAND(){
        System.out.println("AND");
        return "regiestError";
    }
    @RequiresPermissions(value={"fun1"},logical= Logical.AND)
    @RequestMapping(value = "/testone")
    public String test1(){
        System.out.println("one");
        return "regiestError";
    }
}