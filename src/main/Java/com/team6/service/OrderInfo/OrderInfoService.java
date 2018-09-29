package com.team6.service.OrderInfo;

import javax.servlet.http.HttpServletRequest;

//测试测试
public interface OrderInfoService {
    public Object insertOrderInfo(int[] goodsId,int [] counts,int[] sellerId,
                                         Integer userId,int addressId);
    /**
     * 删除订单信息
     * 接收orderInfo的id
     * 删除orderInfo表中的信息以及orderDetail中相关信息
     */

    public Object delOrderInfo(int id, HttpServletRequest request);

    /**
     *查询用户订单信息
     */
    public Object queryOrderByUserid(Integer key,HttpServletRequest request);



}
