package com.team6.service.comment;

import java.util.List;
import java.util.Map;

public interface CommentService {
    /**
     * 查询商品的评论
     * @return
     */
    public List<Map<String,Object>> queryByGoodId(int id);

    /**
     * 添加评论
     * @param map
     * @return
     */
    public int addComment(Map map);

    /**
     * 专家回复
     * @param map
     * @return
     */

    public int reply(Map map);

    /**
     * 已评价商品
     * @return
     */
    public List<Map> okComment();

    /**
     * 未评价的商品
     * @return
     */
    public List<Map> noComment();


}
