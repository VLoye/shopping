package com.team6.service;/**
 * Created by VLoye on 2018/10/18.
 */

import com.team6.dao.BrandMapper;
import com.team6.entity.Brand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author VLoye
 * @ClassName BrandService
 * @Description
 * @Date 13:24  2018/10/18
 * @Version 1.0
 **/
@Service
public class BrandService {
    @Autowired
    BrandMapper brandMapper;

    public List<Brand> queryAll(){
        return brandMapper.queryAll();
    }
}
