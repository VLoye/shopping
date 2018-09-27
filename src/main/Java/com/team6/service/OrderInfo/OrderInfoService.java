package com.team6.service.OrderInfo;

import com.team6.entity.OrderInfo;
import com.team6.util.enums.OrderInfoEnum;
//哈哈哈哈哈标志大法2
public interface OrderInfoService {
    public OrderInfoEnum insertOrderInfo(int[] goodsId,int [] counts,int[] sellerId,
                                         int userId,int addressId);
    /**
     * 删除订单信息
     * 接收orderInfo的id
     * 删除orderInfo表中的信息以及orderDetail中相关信息
     */
    public OrderInfoEnum delOrderInfo(int id);

    /**
     *查询用户订单信息
     */
    public void queryOrderByUserid(int userId);


}
