package com.team6.dao;

import com.team6.entity.OrderInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface OrderInfoMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table order_info
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table order_info
     *
     * @mbggenerated
     */
    int insert(OrderInfo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table order_info
     *
     * @mbggenerated
     */
    int insertSelective(OrderInfo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table order_info
     *
     * @mbggenerated
     */
    OrderInfo selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table order_info
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(OrderInfo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table order_info
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(OrderInfo record);

    /**
     * 用户查询自己的订单之前，先更新他所有订单的状态
     * 如：下单24小时之后还未支付，则将其订单状态更改为2表示订单过期
     * @param userId
     */
    void updateOrderStatus(int userId);

    /**
     * 查找用户的订单信息
     * 根据订单的状态，分别有1-待付款 2-待发货  3-待收货  4-订单过时  null-所有
     * @param userId
     * @param status
     * @return
     */
    List<Map<String, Object>> queryOrderByUserId(@Param("user_id") int userId, @Param("status") Integer status);

}