package com.team6.service.OrderInfo;

import javax.servlet.http.HttpServletRequest;


public interface OrderInfoService {
    /**
     * 添加订单信息
     * @param goodsId
     * @param counts
     * @param sellerId
     * @param userId
     * @param addressId
     * @return
     */
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

    public Object OrderPay(Integer orderId,HttpServletRequest request);

    public Object queryOrderByOrderid(Integer orderId,HttpServletRequest request);
}
