package com.team6.service.Goods;

import com.team6.dao.GoodsMapper;
import com.team6.entity.Goods;
import com.team6.util.enums.GoodsEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * 商品
 */
@Service
public class GoodsServiceImpl implements GoodsService {
    private final int LIMIT = 8;
    private final int[] floors ={
            10018,
            GoodsEnum.TYPE_ENGINE_SYSTEM.getType(),
            GoodsEnum.TYPE_TRADITION_SYSTEM.getType(),
            GoodsEnum.TYPE_WALK_SYSTEM.getType(),
            GoodsEnum.TYPE_ELECTRICAL_SYSTEM.getType(),
            GoodsEnum.TYPE_BODYD_RIVER.getType(),
            GoodsEnum.TYPE_CARFACIAL.getType(),
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
    public Goods queryGoodsById(int id) {
        Goods goods=goodsMapper.queryGoodsById(id);
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
            floorsList.add(floorList);
        }
        return floorsList;
    }

}
