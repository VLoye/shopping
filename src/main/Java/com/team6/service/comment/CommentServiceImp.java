package com.team6.service.comment;

import com.team6.dao.CommentMapper;
import com.team6.entity.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CommentServiceImp implements CommentService {

    @Autowired
    CommentMapper commentMapper;
    @Override
    public List<Map<String,Object>> queryByGoodId(int id) {

        List<Map<String,Object>> list = queryByGoodId(id);
        return list;
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
    public List<Map> okComment() {
        return null;
    }

    @Override
    public List<Map> noComment() {
        return null;
    }
}
