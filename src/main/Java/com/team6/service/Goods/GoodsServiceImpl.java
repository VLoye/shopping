package com.team6.service.Goods;

import com.team6.dao.GoodsMapper;
import com.team6.entity.Goods;
import com.team6.util.enums.GoodsEnum;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * 商品
 */
@Service
public class GoodsServiceImpl implements GoodsService {
    private final int LIMIT = 8;

    final int oneF=GoodsEnum.TYPE_ENGINE_SYSTEM.getType();
    private final  int[] floors ={
            GoodsEnum.TYPE_ENGINE_SYSTEM.getType(),
            GoodsEnum.TYPE_TRADITION_SYSTEM.getType(),
            GoodsEnum.TYPE_WALK_SYSTEM.getType(),
            GoodsEnum.TYPE_ELECTRICAL_SYSTEM.getType(),
            GoodsEnum.TYPE_BODYD_RIVER.getType(),
            GoodsEnum.TYPE_CARFACIAL.getType()
    };

    @Autowired
    private GoodsMapper goodsMapper;
    public GoodsEnum insertGoods(Goods goods) {
        int num=goodsMapper.insert(goods);
        if(num>0) {
            return GoodsEnum.INSERT_GOODS_SUCCESS;
        }
        else
            return GoodsEnum.INSERT_GOODS_ERROR;
    }
    public Goods queryGoodsById(@Param("id") int id) {
        Goods goods=goodsMapper.queryGoodsById(id);
        //取第一张图片为展示
        String[] imgUrl = goods.getImgUrl().split(",");
        goods.setImgUrl(imgUrl[0]);

        return goods;
    }

    public GoodsEnum deleteGoodsById(int id) {
        int result=goodsMapper.deleteGoodsById(id);
        if(result>0)
            return GoodsEnum.DELETE_GOODS_SUCCESS;
        else
            return GoodsEnum.DELETE_GOODS_ERROR;
    }

    @Override
    public GoodsEnum updateGoods(Goods goods) {
        int result=goodsMapper.updateGoods(goods);
        if(result>0)
            return GoodsEnum.UPDATE_GOOS_SUCCESS;
        else
            return GoodsEnum.UPDATE_GOODS_ERROR;
    }

    @Override
    public List<Object> querySaleByGoodType() {

        List<Object> floorsList = new ArrayList<Object>();
        for(int floor:floors) {
            //每层展示的商品
            List<Map<String,Object>> floorList = goodsMapper.querySaleByGoodType(floor, LIMIT);
            for(Map map:floorList){
                //只取一个图片连接用于展示
                String img = ((String)map.get("img_url")).split(",")[0];
                map.put("img_url",img);
            }
            floorsList.add(floorList);
        }
        return floorsList;
    }

    @Override
    public Map<String,Object> queryProductInfo( int id){
        Map<String,Object> map = goodsMapper.queryProductInfo(id);
        //处理图片数据
        String [] imgUrl = ((String) map.get("imgUrl")).split(",");
        List<String> list = Arrays.asList(imgUrl);
        map.put("imgUrl",list);
        return map;
    }

    @Override
    public Object queryShopGoodsByShopId(int shopId) {

        List<Map> list =  goodsMapper.queryShopGoodsByShopId(shopId);
        for(Map map:list){
            //只取一个图片连接用于展示
            String img = ((String)map.get("imgUrl")).split(",")[0];
            map.put("imgUrl",img);
        }

        return list;
    }
}
