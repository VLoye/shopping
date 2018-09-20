package com.team6.util.enums;

public enum OrderInfoEnum {
    /**
     * 订单信息的操作结果
     */
    INSERT_ORDERINFO_SUCCESS("添加订单信息成功"),
    INSERT_ORDERINFO_ERROR("添加订单信息失败"),
    DELETE_ORDERINFO_SUCCESS("删除订单信息成功"),
    DELETE_ORDERINFO_ERROR("删除订单信息失败"),
    UPDATE_ORDERINFO_SUCCESS("更新订单信息成功"),
    UPDATE_ORDERINFO_ERROR("更新订单信息失败");

    private String Info;
    OrderInfoEnum(String info){Info=info;}
}
