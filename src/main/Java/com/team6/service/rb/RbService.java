package com.team6.service.rb;

import java.util.List;

public interface RbService {
    /**
     * 查找所有信息
     * @return
     */
    public Object queryAllInfo();

    /**
     * 根据轮播图id查找信息
     * @param id
     * @return
     */
    public Object queryById(int id);

    /**
     * 根据id集合查找信息
     * @param ids
     * @return
     */
    public Object queryByIds(int[] ids);

    /**
     * 根据shopid查找轮播图信息
     * @param shopid
     * @return
     */
    public Object queryByShopId(int shopid);

    /**
     * 根据shopid集查找轮播图信息
     * @param shopids
     * @return
     */
    public Object queryByShopIds(int[] shopids);
}
