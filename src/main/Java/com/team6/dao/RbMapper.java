package com.team6.dao;

import java.util.List;
import java.util.Map;

public interface RbMapper {
    public List queryAllInfo();

    public Object queryById(int id);

    public Object queryByShopId(int shopid);
}
