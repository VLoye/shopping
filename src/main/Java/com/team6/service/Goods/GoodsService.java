package com.team6.service.Goods;
import com.team6.entity.Goods;
import com.team6.util.enums.GoodsEnum;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * 商品逻辑
 */
public interface GoodsService {
    /*
    添加商品信息
     */
    public GoodsEnum insertGoods(Goods goods);

    /*
    根据id查询商品信息
     */
    public Goods queryGoodsById(int id);

    /*
    根据id删除商品信息
     */
    public GoodsEnum deleteGoodsById(int id);
    /*
    更新商品信息
     */
    public GoodsEnum updateGoods(Goods goods);

    /**
     * 每层楼的商品展示
     *
     */
    public List<Object> querySaleByGoodType();

    /**
     * 根据商品id查询到商品详情页所需要的信息
     */
    public Map<String,Object> queryProductInfo( int id);
}
