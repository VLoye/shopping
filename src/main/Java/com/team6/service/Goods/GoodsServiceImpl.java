package com.team6.service.Goods;

import com.team6.dao.GoodsMapper;
import com.team6.entity.Goods;
import com.team6.util.enums.GoodsEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 商品
 */
@Service
public class GoodsServiceImpl implements GoodsService {
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


}
