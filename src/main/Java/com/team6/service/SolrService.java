package com.team6.service;/**
 * Created by VLoye on 2018/8/22.
 */

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author VLoye
 * @ClassName SolrService
 * @Description
 * @Date 9:17  2018/8/22
 * @Version 1.0
 **/
@Service
public class SolrService implements InitializingBean{
    final String url = "http://localhost:8983/solr/newcoretest";
    private SolrClient solrClient = null;


    @Override
    public void afterPropertiesSet() throws Exception {
        solrClient = new HttpSolrClient.Builder("http://localhost:8983/solr/newcoretest")
                .withConnectionTimeout(10000)
                .withSocketTimeout(60000)
                .build();
    }

    public List<Integer> solrTest(String key){
        List<Integer> list = new ArrayList<Integer>();
        SolrQuery solrQuery = new SolrQuery("name:"+key);
        solrQuery.setStart(0)
        .setRows(30);

        QueryResponse queryResponse = null;
        try{
            queryResponse = solrClient.query(solrQuery);

        }catch (IOException | SolrServerException e){
            e.printStackTrace();
        }
        SolrDocumentList documents = queryResponse.getResults();
        for(SolrDocument document :documents){
            list.add(Integer.valueOf((String)document.get("id")));
        }

        return list;
    }


}
