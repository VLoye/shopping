package com.team6.service.OrderInfo;

import com.team6.entity.OrderInfo;
import com.team6.util.enums.OrderInfoEnum;

public interface OrderInfoService {
    /**
     * 插入生成订单信息，并返回插入订单结果
     * @param orderInfo
     * @return
     */
    public OrderInfoEnum insertOrderInfo(OrderInfo orderInfo);
    /**
     * 删除订单信息
     * 接收orderInfo的id
     * 删除orderInfo表中的信息以及orderDetail中相关信息
     */
    public OrderInfoEnum delOrderInfo(int id);

    /**
     *
     */
}
