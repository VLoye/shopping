package com.team6.dao;

import com.team6.entity.Goods;
import com.team6.entity.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;
import springfox.documentation.service.ApiListing;

import java.util.List;

//用户信息接口
public interface UserMapper {
    /**
     * 根据id获取用户信息
     * @param id
     * @return
     */
    public User queryById(int id);

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

    /**
     * 插入用户信息
     * @param user
     */
    public int insert( User user);

    /**
     * 修改密码
     * @param name
     * @param password
     * @return
     */
    public int updatePassword(@Param("name") String name,@Param("password") String password,@Param("salt")String salt);

    /**
     * 修改用户权限
     * @return
     */
   public int updateRole(@Param("name") String name,@Param("role") int role);

    /**
     * 查询用户权限
     * @param role
     * @return
     */
   public List<String> queryPermissionByRoleId(@Param("role") int role);


}
