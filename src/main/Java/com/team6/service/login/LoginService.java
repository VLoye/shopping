package com.team6.service.login;

import com.team6.entity.User;
import com.team6.util.enums.LoginEnum;

import java.util.HashSet;
import java.util.Set;

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
    public LoginEnum regiest(User user);

    public LoginEnum updatePassword(String name, String prePassword, String newPassword);

    /**
     * 通过角色名获取权限
     * @param role
     * @return
     */
    public Set<String> getPermissionByRole(int role);




}
