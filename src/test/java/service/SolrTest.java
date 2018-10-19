package service;/**
 * Created by VLoye on 2018/9/11.
 */

import com.team6.dto.SolrGoods;
import com.team6.service.SolrAdapter;
import org.apache.solr.client.solrj.SolrQuery;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

/**
 * @author VLoye
 * @ClassName SolrTest
 * @Description
 * @Date 16:15  2018/9/11
 * @Version 1.0
 **/
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-service.xml","classpath:spring/spring-dao.xml"})
public class SolrTest {
    @Autowired
    SolrAdapter solrAdapter;

    @Test
    public void query(){
        List<SolrGoods> list = solrAdapter.SolrQueryByGoodsName("g_name","康明斯",10,null,"price", SolrQuery.ORDER.asc);
        for(SolrGoods goods:list){
            System.out.println(1);
        }
    }


}
