package com.team6.service.shopcar;

import com.team6.entity.ShoppingCar;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

public interface ShopCarService {

    /**
     * 根据用户id显示用户的购物车
     * @param userid
     * @return
     */
    public Object shopCar(int userid);

    /**
     * 添加good
     * @param goodsId
     * @param count
     * @param request
     * @return
     */
    public Object addShopCar(int goodsId, int count, HttpServletRequest request);

    public Object delUserGoodsById(int goodsId,HttpServletRequest request);

    public Object delUserGoodsByIdsSelect(List<String> list,HttpServletRequest request);

    public Object detailData(int[] ids,int[] counts,HttpServletRequest request);
}
