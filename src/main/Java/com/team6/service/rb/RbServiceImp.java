package com.team6.service.rb;

import com.team6.dao.RbMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RbServiceImp implements RbService{

    @Autowired
    private RbMapper rbMapper;
    @Override
    public Object queryAllInfo() {

        return rbMapper.queryAllInfo();
    }

    @Override
    public Object queryById(int id) {
        return null;
    }

    @Override
    public Object queryByIds(int[] ids) {
        return null;
    }

    @Override
    public Object queryByShopId(int shopid) {
        return rbMapper.queryByShopId(shopid);
    }

    @Override
    public Object queryByShopIds(int[] shopids) {
        return null;
    }
}
