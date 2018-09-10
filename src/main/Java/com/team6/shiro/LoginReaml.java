package com.team6.shiro;

import com.auth0.jwt.interfaces.Claim;
import com.team6.entity.User;
import com.team6.service.login.LoginService;
import com.team6.util.enums.LoginEnum;
import com.team6.util.jwtUtil;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authc.pam.UnsupportedTokenException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.Array;
import java.util.*;

import static com.alibaba.druid.util.Utils.md5;

/**
 * 验证用户登陆信息和授权
 */

@Component
public class LoginReaml extends AuthorizingRealm {
    private org.slf4j.Logger logger= LoggerFactory.getLogger(LoginReaml.class);
    private final String PERMISSIONS = "permissions";
    @Autowired
    private LoginService loginService;
    /*
       9.6将权限信息存储起来 不用每次都要去解释
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        Set<String> permissions;
        //如果session有权限信息就不用解释token;
        if(SecurityUtils.getSubject().getSession().getAttribute(PERMISSIONS)!=null){
            permissions= (Set<String>)SecurityUtils.getSubject()
                    .getSession().getAttribute(PERMISSIONS);
            info.addStringPermissions(permissions);
            return info;
        }



        //取得token并且解释
        try {
            Map<String, Claim> map = jwtUtil.verifyToken((String)principalCollection.getPrimaryPrincipal());
            List permissionList= map.get(PERMISSIONS).asList(String.class);
             permissions= new HashSet((List<String>)permissionList);
            //验证权限
            info.addStringPermissions(permissions);
            //把权限信息存到session
            SecurityUtils.getSubject().getSession().setAttribute(PERMISSIONS,permissions);
        }catch (Exception e){
            logger.info("授权解释token失败"+e.getMessage());
        }
        return info;
    }




    /**
     * 验证登陆
     * @param authenticationToken
     * @return
     * @throws AuthenticationException
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken)
            throws AuthenticationException {
        Logger logger = Logger.getLogger(this.getClass());
        logger.debug("进入验证身份"+this.getName());

        UsernamePasswordToken token = (UsernamePasswordToken) authenticationToken;
        //根据用户名取得用户
        String name = token.getUsername();
        User user = loginService.queryByName(name);

        //验证用户是否合法
        if(user!=null) {
            Set<String> permission = loginService.getPermissionByRole(user.getRole());

            /**
             * 如果用户存在 就将用户输入的密码经过加密存到token中 替换原来的密码
             * 1.SimpleAuthenticationInfo("这里存放token",user.getPassword(),this.getName()); 会把token的密码与数据库的密码进行对比
             *2.subject.getPrincipal()会取得token
             */

            String md5_password = md5(new String(token.getPassword()) + user.getSalt());
            token.setPassword(md5_password.toCharArray());
            //定义自定义的token jwt得来的
            String mytoken= jwtUtil.createToken(user,permission);

            return new SimpleAuthenticationInfo(mytoken,user.getPassword(),this.getName());
        }else {
            //登陆失败
            throw new UnsupportedTokenException(LoginEnum.Login_ERROR.getInfo());
        }



    }


}
