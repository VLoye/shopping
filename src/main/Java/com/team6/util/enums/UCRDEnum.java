package com.team6.util.enums;

public enum  UCRDEnum {
    UCRD_SUCCESS("SUCCESS"),
    UCRD_ERROR("ERROR");
    private String info;

    UCRDEnum(String info) {
        this.info = info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getInfo() {
        return info;
    }
}
