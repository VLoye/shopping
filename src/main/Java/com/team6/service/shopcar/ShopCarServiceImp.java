package com.team6.service.shopcar;

import com.team6.dao.GoodsMapper;
import com.team6.dao.GoodsTypeMapper;
import com.team6.dao.ShoppingCarMapper;
import com.team6.entity.Goods;
import com.team6.entity.GoodsType;
import com.team6.entity.ShoppingCar;
import com.team6.service.login.LoginService;
import com.team6.util.TransformUtil;
import com.team6.util.enums.LoginEnum;
import com.team6.util.enums.UCRDEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ShopCarServiceImp implements ShopCarService {

    @Autowired
    GoodsMapper goodsMapper;
    @Autowired
    ShoppingCarMapper shoppingCarMapper;
    @Autowired
    GoodsTypeMapper goodsTypeMapper;
    @Autowired
    LoginService loginService;

    @Override
    public Object shopCar(int userid) {
        List<Map> glist = new ArrayList<>();

        //得到购物车所有商品得id和数量
       Object object = shoppingCarMapper.queryGidCountByUserid(userid);
        List<Map> list = (List) object;
        //根据商品id和数量封装一个商品到map
        for(Map map:list){
            int gid = (int)map.get("gid");
            int count = (int)map.get("count");
            Goods goods=goodsMapper.queryGoodsById(gid);
            Map<String,Object> gMap = TransformUtil.beanToMap(goods);
            gMap.put("count",count);

            //根据typeid查找goodtype
            Integer gtypeid = goods.getTypeId();
            GoodsType goodsType =null;
            if (gtypeid!=null) {
                //根据id查找goodstype
                goodsType = goodsTypeMapper.selectByPrimaryKey(gtypeid);
                gMap.put("gtype",goodsType.getName());
            }else gMap.put("gtype","无");

            glist.add(gMap);
        }

        return glist;
    }



    @Override
    public Object addShopCar(int goodsId, int count, HttpServletRequest request){
        Map<String,Object> returnMap = new HashMap<>();
        int result = -1;

        //用户信息
        Map<String,Object> userInfo = loginService.getCurrentUserInfo(request);
        if(userInfo==null){
            returnMap.put("msg", LoginEnum.LOGIN_OFF.getInfo());
            return returnMap;
        }
        //用户id
        int userId = (int) userInfo.get("userid");
        //判断用户的购物车是否存在商品
        ShoppingCar record = shoppingCarMapper.queryByUserIdAndGoodsId(goodsId,userId);
        if(record!=null){
            record.setCount(record.getCount()+count); //更新数量
            result = shoppingCarMapper.updateByPrimaryKey(record);
        }else{
            record = new ShoppingCar();
            //添加到购物车
            record.setCount(count);
            record.setGoodsId(goodsId);
            record.setUserId(userId);
            result = shoppingCarMapper.insert(record);
        }

        if(result>0) {
            //添加成功
            returnMap.put("msg", UCRDEnum.UCRD_SUCCESS.getInfo());
            return returnMap;
        }else {
            //添加失败
            returnMap.put("msg", UCRDEnum.UCRD_ERROR.getInfo());
            return returnMap;
        }
    }

    @Override
    public Object delUserGoodsById(int goodsId,HttpServletRequest request){
        int result=-1;
        Map<String,Object> returnMap = new HashMap<>();
        //用户信息
        Map<String,Object> userInfo = loginService.getCurrentUserInfo(request);
        if(userInfo==null){
            returnMap.put("msg", LoginEnum.LOGIN_OFF.getInfo());
            return returnMap;
        }
         result = shoppingCarMapper.delUserGoodsById( goodsId,(int)userInfo.get("userid"));

        if(result>0) {
            //删除成功
            returnMap.put("msg", UCRDEnum.UCRD_SUCCESS.getInfo());
            return returnMap;
        }else {
            //删除失败
            returnMap.put("msg", UCRDEnum.UCRD_ERROR.getInfo());
            return returnMap;
        }
    }

    @Override
    public Object delUserGoodsByIdsSelect(int[] ids, HttpServletRequest request) {
        int result=-1;
        Map<String,Object> returnMap = new HashMap<>();
        //用户信息
        Map<String,Object> userInfo = loginService.getCurrentUserInfo(request);
        if(userInfo==null){
            returnMap.put("msg", LoginEnum.LOGIN_OFF.getInfo());
            return returnMap;
        }

        int userId = (Integer) userInfo.get("userid");

        //成功删除的数量
        int count=0;
        for(int i:ids){

            if(shoppingCarMapper.delUserGoodsById(Integer.valueOf(i),userId)>0){
              count++;
            }
        }
        returnMap.put("msg","成功删除"+count+"项");

        return returnMap;
    }

    @Override
    public Object detailData(String[] ids, String[] counts, HttpServletRequest request) {
        Map<String,Object> good = new HashMap<>();
        long totalprice = 0;
        long totalcount = 0;
        Map<String,Object> usermap = loginService.getCurrentUserInfo(request);
        Map<String,Object> total = new HashMap<>();
        List<Object> gList = new ArrayList<>();
        for(int i = 0;i<ids.length;i++){

            Goods goods =goodsMapper.queryGoodsById(Integer.parseInt(ids[i]));
            //计算总数和价格
            totalprice +=goods.getPrice()*Integer.parseInt(counts[i]);
            totalcount +=Integer.parseInt(counts[i]);
            Map<String,Object> gMap = TransformUtil.beanToMap(goods);
            gMap.put("count",counts[i]);
            gList.add(gMap);
        }
        total.put("totalprice",totalprice);
        total.put("totalcount",totalcount);
        good.put("goods",gList);
        good.put("total",total);
        good.put("user",usermap);
        return good;
    }
}
