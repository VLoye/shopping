package com.team6.service.login;


import com.auth0.jwt.interfaces.Claim;
import com.team6.dao.PermissionMapper;
import com.team6.dao.UserMapper;
import com.team6.entity.User;
import com.team6.util.enums.LoginEnum;
import com.team6.util.jwtUtil;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

import static com.alibaba.druid.util.Utils.md5;

@Service
public class LoginServiceImp implements LoginService {


    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PermissionMapper permissionMapper;

    @Override
    public User queryByName(String name) {
        User user = userMapper.queryByName(name);
        return user;
    }

    /*TODO*/
    @Override
    public String Login(String name, String password) {
       User user = this.verifyLogin(name,password);
        //登陆失败 返回null
        if(user==null){
            return null;
        }else{
            //登陆验证成功 ，返回令牌和用户信息
            String token = jwtUtil.createToken(user,new HashSet<String>());
            return token;
        }

    }

    @Override
    public User verifyLogin(String name,String password) {

        User user = userMapper.queryByName(name);
        //用户不存在
        if(user==null) return null;
        String slat =  user.getSalt();
        String md5_password = user.getPassword();

        //验证密码成功
        if(md5_password.equals(md5(password+slat))){
            return user;
        }
        //验证密码失败
        return null;
    }

    @Override
    public LoginEnum regiest(User user)  {
        if(queryByName(user.getName())!=null) return LoginEnum.REGIEST_COUNT_EXIST;
        //生成盐
        user = this.setPasswordAndsalt(user);

        int count = userMapper.insert(user);
        if (count>0)
         return LoginEnum.REGIEST_SUCCESS;        //注册成功
        return LoginEnum.REGIEST_ERROR;            //注册失败
    }

    @Override
    public LoginEnum updatePassword(String name, String prePassword, String newPassword) {
        User user  = queryByName(name);

        if(user==null) return LoginEnum.UPDATE_CONUT_EMPTY; //用户不存在
        //查看用户的原先的密码是否正确
        String prePasswordMd5 = md5(prePassword+ user.getSalt());

        if(user.getPassword().equals(prePasswordMd5)){

            //密码正确，允许修改用户密码
            user.setPassword(newPassword);
           user = this.setPasswordAndsalt(user);

           int count = userMapper.updatePassword(user.getName(),user.getPassword(),user.getSalt());
           if(count>0)
            return LoginEnum.UPDATE_PASSWORD_SUCCESS;
        }
        return LoginEnum.UPDATE_PASSWORD_ERROR;
    }

    /**
     * 将密码加密
     * @param user
     * @return
     */
    public User setPasswordAndsalt(User user){
        String salt = UUID.randomUUID().toString().substring(0,10);
        user.setSalt(salt);
        user.setPassword(md5(user.getPassword()+salt));
        return user;
    }

    @Override
    public Set<String> getPermissionByRole(int role) {
        //取得权限list
        List<String> list = userMapper.queryPermissionByRoleId(role);

        Set<String> permission = new HashSet(list);

        return permission;
    }

    /**
     * 根据token取得用户信息
     * @param request
     * @return
     */
    public Map<String,Object> getCurrentUserInfo(HttpServletRequest request){
        Cookie cookies[] = request.getCookies();
        //如果用户登陆了 token就存在
        String token =(String) SecurityUtils.getSubject().getPrincipal();

        //如果用户没有实现登陆 就从它的cookie仲得到token
        if(token==null||token.equals("")) {
            //遍历得到保存用户信息的cookie token
            for (Cookie cookie : cookies) {

                if (cookie.getName().equals(LoginEnum.USER_COOKIE_TOKEN.getInfo())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }



        //如果token不存在 返回null
        if(token==null||token.equals("")) return null;

        Map<String, Claim> map;
        //首页用户信息
        Map<String,Object> currentUserInfo=null;
        try {
            map = jwtUtil.verifyToken(token);
            if(map.size()>0){
                currentUserInfo = new HashMap<>();
                currentUserInfo.put("username",map.get("name").asString());
                currentUserInfo.put("userid",map.get("id").asInt());

            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return currentUserInfo;
    }

}
