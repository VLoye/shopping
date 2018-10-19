package com.team6.util.enums;/**
 * Created by VLoye on 2018/10/9.
 */

/**
 * @author VLoye
 * @ClassName GoodsQueueEnum
 * @Description
 * @Date 16:06  2018/10/9
 * @Version 1.0
 **/
public enum GoodsQueueEnum {
    ADD("ADD_Queue"),
    UPDATE("UPDATE_Queue"),
    DELETE("DELETE_Queue");


    private String queue;

    GoodsQueueEnum(String queue) {
        this.queue = queue;
    }

    public String getQueue() {
        return queue;
    }

    public void setQueue(String queue) {
        this.queue = queue;
    }
}
