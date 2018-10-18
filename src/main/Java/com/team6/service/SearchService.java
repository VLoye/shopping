package com.team6.service;/**
 * Created by VLoye on 2018/10/17.
 */

import com.team6.dto.SolrGoods;
import com.team6.util.HostHolder;
import org.apache.solr.client.solrj.SolrQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author VLoye
 * @ClassName SearchService
 * @Description
 * @Date 15:41  2018/10/17
 * @Version 1.0
 **/
@Service
public class SearchService {
    @Autowired
    SolrAdapter solrAdapter;
    @Autowired
    HostHolder hostHolder;

    public Map searchData(String key,Map conditions){
        HashMap<String,Object> map = new HashMap<String,Object>();
        List<SolrGoods> glist =  solrAdapter.SolrQueryByGoodsName("g_name",key,10,conditions,null,null);
        List<SolrGoods> jplist =  solrAdapter.SolrQueryByGoodsName("g_name",key,4,null,"price", SolrQuery.ORDER.asc);
        map.put("user",hostHolder.getCurrentUserInfo());
        map.put("glist",glist);
        map.put("jplist",jplist);
        return map;
    }

}
