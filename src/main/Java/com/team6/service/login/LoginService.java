package com.team6.service.login;

import com.team6.dto.login.UserInfo;
import com.team6.entity.User;

/**
 * 登陆逻辑
 */
public interface LoginService {


    /**
     * 根据用户名是否存在
     * @return
     */
    public User queryByName(String name);

    /**
     * 登陆 生成token
     * @param name
     * @param password
     */
    public String Login(String name, String password);

    /**
     * 验证登陆账号密码
     * slat和MD5进行对密码的验证
     * @return
     */
    public User verifyLogin(String name,String password);

    /**
     * 注册
     * @param user
     * @return
     */
    public String regiest(User user);

    public String updatePassword(String name,String prePassword,String newPassword);





}
