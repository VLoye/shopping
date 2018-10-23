package com.team6.service.comment;

import java.util.List;
import java.util.Map;

public interface CommentService {
    /**
     * 查询商品的评论
     * @return
     */
    public List<Map<String,Object>> queryByGoodId(int goodsId,int currNum);

    //查询商品评论总数
    public int queryPageNumByGoodId(int goodsId);

    /**
     * 添加评论
     * @param map
     * @return
     */
    public boolean addComment(Map map);

    /**
     * 专家回复
     * @param map
     * @return
     */

    public int reply(Map map);

    /**
     * 已评价商品（用户）
     * @return
     */
    public List<Map> okComment(int userId);

    /**
     * 未评价的商品（用户）
     * @return
     */
    public List<Map> noComment(int userId);

    /**
     * 商家评论数据
     * @param shopId
     * @return
     */
    public List shopComment(int shopId);


}
