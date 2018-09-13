package com.team6.interceptor;/**
 * Created by VLoye on 2018/9/13.
 */

import com.team6.service.login.LoginService;
import com.team6.util.HostHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author VLoye
 * @ClassName UserInfoInterceptor
 * @Description
 * @Date 9:57  2018/9/13
 * @Version 1.0
 **/
public class UserInfoInterceptor implements HandlerInterceptor{

    @Autowired
    HostHolder hostHolder;
    @Autowired
    LoginService loginService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        hostHolder.setCurrentUserInfo(loginService.getCurrentUserInfo(request));
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        if(modelAndView!=null){
            modelAndView.addObject("user",hostHolder.getCurrentUserInfo());
        }
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        hostHolder.clear();
    }
}
