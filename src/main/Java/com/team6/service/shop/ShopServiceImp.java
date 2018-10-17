package com.team6.service.shop;

import com.team6.dao.ShopMapper;
import com.team6.service.login.LoginService;
import com.team6.service.rb.RbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ShopServiceImp implements ShopService {

    @Autowired
    private ShopMapper shopMapper;
    @Autowired
    LoginService loginService;
    @Autowired
    RbService rbService;
    @Override
    public Object getShopData(int shopId, HttpServletRequest request) {
        //取得用户信息
       Map user=loginService.getCurrentUserInfo(request);
        if(user!=null) {
            user.put("isLogin",true);

        }


        //取得轮播图
        Object rbList = rbService.queryByShopId(shopId);

        //取得商店所有物品信息
        Object gList = shopMapper.getShopData(shopId);
        for(Map map:(List<Map>)gList){
            String imgurl=(String)map.get("imgUrl");
            map.put("imgUrl",imgurl.split(",")[0]);
        }

        Map<String,Object> map = new HashMap();

        map.put("user",user);
        map.put("rbList",rbList);
        map.put("cList",gList);

        return map;
    }
}
