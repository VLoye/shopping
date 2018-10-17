package com.team6.service;/**
 * Created by VLoye on 2018/8/22.
 */

import com.team6.dto.SolrGoods;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.StringUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


/**
 * @author VLoye
 * @ClassName SolrService
 * @Description
 * @Date 9:17  2018/8/22
 * @Version 1.0
 **/
@Service
public class SolrAdapter implements InitializingBean{
    final String url = "http://39.108.66.72:8983/solr/goods_core";
    private SolrClient solrClient = null;


    @Override
    public void afterPropertiesSet() throws Exception {
        solrClient = new HttpSolrClient.Builder("http://39.108.66.72:8983/solr/goods_core")
                .withConnectionTimeout(10000)
                .withSocketTimeout(60000)
                .build();
    }




    public List<SolrGoods> SolrQueryByGoodsName(String key, String value, int rows, Map<String,Integer> conditions, String sortField, SolrQuery.ORDER order){
        List<SolrGoods> list = new ArrayList<SolrGoods>();
        StringBuilder sb = new StringBuilder();
        sb.append(key+":"+value);
        if(conditions!=null && conditions.size()>0){
            for(String s : conditions.keySet()){
                int val = conditions.get(s);
                sb.append(" AND "+s+":"+val);
            }
        }
        SolrQuery solrQuery = new SolrQuery(sb.toString());
        solrQuery.setStart(0)
                .setRows(rows);
        if(!StringUtils.isEmpty(sortField))
            solrQuery.setSort(sortField, order);



        QueryResponse queryResponse = null;
        try{
            queryResponse = solrClient.query(solrQuery);
        }catch (IOException | SolrServerException e){
            e.printStackTrace();
        }
        SolrDocumentList documents = queryResponse.getResults();
        for(SolrDocument document:documents){
            SolrGoods solrGoods = toBean(document);
            list.add(solrGoods);
        }
        return list;
    }


    private SolrGoods toBean(SolrDocument document){
        SolrGoods solrGoods = new SolrGoods();
        solrGoods.setgId(Integer.valueOf((String)document.get("g_id")));
        solrGoods.setGoodsName((String)document.get("g_name"));
        solrGoods.setPrice(Long.valueOf((String)document.get("price")));
        solrGoods.setImgUrl((String)document.get("img_url"));
        solrGoods.setsId((Integer) document.get("s_id"));
        solrGoods.setbId((Integer) document.get("b_id"));
        solrGoods.settId((Integer) document.get("t_id"));
        solrGoods.setShopName((String)document.get("s_name"));
        solrGoods.setBrandName((String)document.get("b_name"));
        solrGoods.setTypeName((String)document.get("t_name"));
        return solrGoods;
    }

}
