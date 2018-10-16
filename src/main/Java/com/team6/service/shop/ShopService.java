package com.team6.service.shop;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public interface ShopService  {

    //取得商店界面信息
    public Object getShopData(int shopId, HttpServletRequest request);
}
