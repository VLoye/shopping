package com.team6.util.enums;

public enum GoodsEnum {
    /**
     * 商品UCRD操作结果
     */
    INSERT_GOODS_SUCCESS("添加商品信息成功"),
    INSERT_GOODS_ERROR("添加商品信息失败"),

    DELETE_GOODS_SUCCESS("删除商品信息成功"),
    DELETE_GOODS_ERROR("删除商品信息失败"),

    UPDATE_GOOS_SUCCESS("更新商品信息成功"),
    UPDATE_GOODS_ERROR("更新商品信息失败");
    private String Info;
    GoodsEnum(String info){
        Info=info;
    }
    public String getInfo() {
        return Info;
    }

    public void setInfo(String info) {
        Info = info;
    }
}
