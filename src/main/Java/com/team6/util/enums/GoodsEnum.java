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
    UPDATE_GOODS_ERROR("更新商品信息失败"),
    /*
    商品的大分类
     */
    TYPE_ENGINE_SYSTEM(10001,"发动机系统"),
    TYPE_TRADITION_SYSTEM(10002,"传统系统"),
    TYPE_WALK_SYSTEM(10003,"行走系统"),
    TYPE_BRAKING_SYSTEM(10004,"制动系统"),
    TYPE_STEERING_SYSTEM(10005,"转向系统"),
    TYPE_ELECTRICAL_SYSTEM(10006,"电器系统"),
    TYPE_BODYD_RIVER(10007,"车身及驾驶室"),
    TYPE_AUTOMOBILE(10008,"汽车用品"),
    TYPE_CARFACIAL(10009,"美容养护"),
    TYPE_PROTECT_TOOL(10008,"汽保工具");



    private String Info;
    private int type;
    GoodsEnum(String info){
        Info=info;
    }
    GoodsEnum(int type,String info){
        this.type=type;
        this.Info=info;
    }
    public String getInfo() {
        return Info;
    }
    public void setInfo(String info) {
        Info = info;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }
}
