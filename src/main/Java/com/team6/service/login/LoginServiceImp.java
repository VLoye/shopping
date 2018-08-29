package com.team6.service.login;


import com.team6.dao.UserDao;
import com.team6.entity.User;
import com.team6.util.enums.LoginEnum;
import com.team6.util.jwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

import static com.alibaba.druid.util.Utils.md5;

@Service
public class LoginServiceImp implements LoginService {


    @Autowired
    private UserDao userDao;

    @Override
    public User queryByName(String name) {
        User user = userDao.queryByName(name);
        return user;
    }

    @Override
    public String Login(String name, String password) {
       User user = this.verifyLogin(name,password);
        //登陆失败 返回null
        if(user==null){
            return null;
        }else{
            //登陆验证成功 ，返回令牌和用户信息
            String token = jwtUtil.createToken(user);
            return token;
        }

    }

    @Override
    public User verifyLogin(String name,String password) {

        User user = userDao.queryByName(name);
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

        int count = userDao.insert(user);
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

           int count = userDao.updatePassword(user.getName(),user.getPassword(),user.getSalt());
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


}
