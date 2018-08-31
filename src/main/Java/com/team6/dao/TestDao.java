package com.team6.dao;/**
 * Created by VLoye on 2018/8/27.
 */

import com.team6.entity.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

/**
 * @author VLoye
 * @ClassName TestDao
 * @Description
 * @Date 11:20  2018/8/27
 * @Version 1.0
 **/
@Mapper
public interface TestDao {

    @Insert("insert into test(a) ")
    public int insert(User user);
}
