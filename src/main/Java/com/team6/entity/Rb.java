package com.team6.entity;

public class Rb {
    /**
     * 轮播图id
     */
    private int id;

    /**
     * 轮播图名字
     */
    private String name;

    /**
     * 轮播图地址
     */
    private String imgUrl;

    private int shopId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public int getShopId() {
        return shopId;
    }

    public void setShopId(int shopId) {
        this.shopId = shopId;
    }
}
