package com.team6.service.Goods;
import com.team6.entity.Goods;
import com.team6.util.enums.GoodsEnum;
import org.springframework.stereotype.Service;
import javax.servlet.http.HttpServletRequest;
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
}
