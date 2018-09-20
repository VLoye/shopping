package com.team6.service.comment;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CommentServiceImp implements CommentService {

    @Override
    public List<Map<String,Object>> queryByGoodId(int id) {

        List<Map<String,Object>> list = queryByGoodId(id);
        return list;
    }

    @Override
    public int addComment(Map map) {
        return 0;
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
