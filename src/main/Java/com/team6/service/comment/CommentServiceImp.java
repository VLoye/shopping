package com.team6.service.comment;

import com.team6.dao.CommentMapper;
import com.team6.entity.Comment;
import org.aspectj.weaver.ast.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CommentServiceImp implements CommentService {

    @Autowired
    CommentMapper commentMapper;
    @Override
    public List<Map<String,Object>> queryByGoodId(int id,int currNum) {
        //搜索到10条评论
        int num = (currNum-1)*10;
        List<Map<String,Object>> list = commentMapper.queryCommentByGoodsId(id,num);
        for(Map map:list){
            int commentId = (int)map.get("id");
            Map commentMap = commentMapper.quertReplyById(commentId);
            map.put("reply",commentMap);
        }
        return list;
    }



    @Override
    public int queryPageNumByGoodId(int id) {
        int count = commentMapper.queryCommentCountByGoodsId(id);
        int pageNum = 1;
        if(count%10==0) pageNum=count/10;
        else pageNum = count/10+1;
        return pageNum;
    }

    @Override
    public boolean addComment(Map map) {
        Comment comment = new Comment();
        int count = -1;
        int entryid = (int)map.get("entryid");
        int entrytype = (int)  map.get("entrytype");
        int descriptionscore = (int) map.get("descriptionscore");
        int servicescore = (int) map.get("servicescore");
        int logisticsscore = (int) map.get("logisticsscore");
        String content = (String) map.get("content");
        comment.setEntityId(entryid);
        comment.setEntityType(entrytype);
        comment.setLogisticsScore(logisticsscore);
        comment.setServiceScore(servicescore);
        comment.setDescriptionScore(descriptionscore);
        comment.setContent(content);
        count = commentMapper.insert(comment);
        if(count>0) return true;
        return false;
    }

    @Override
    public int reply(Map map) {


        return 0;
    }

    @Override
    public List<Map> okComment(int userId) {
        List<Map> list = commentMapper.queryCommentByUserId(userId);

        return list;
    }

    @Override
    public List<Map> noComment(int userId) {
        List<Map> list = commentMapper.queryNoCommentByUserId(userId);

        return list;
    }

    @Override
    public List shopComment(int shopId) {

        return null;
    }
}
