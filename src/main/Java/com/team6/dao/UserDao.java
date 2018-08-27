package com.team6.dao;

import com.team6.entity.User;

import java.util.List;

//用户信息接口
public interface UserDao {
    /**
     * 根据id获取用户信息
     * @param id
     * @return
     */
    public User queryById(long id);

    /**
     * 根据用户名获取用户信息
     * @param name
     * @return
     */
    public User queryByName(String name);


    /**
     * 获取所用用户信息
     * @return
     */
    public List<User> queryAll();
}
