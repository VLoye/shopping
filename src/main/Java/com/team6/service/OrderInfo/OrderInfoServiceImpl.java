package com.team6.service.OrderInfo;
import com.team6.entity.OrderDetails;
import com.team6.util.WebTime;
import com.team6.dao.OrderDetailsMapper;
import com.team6.dao.OrderInfoMapper;
import com.team6.entity.OrderInfo;
import com.team6.util.enums.OrderInfoEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
//哈哈哈哈哈标志大法
@Service
public class OrderInfoServiceImpl implements OrderInfoService{
    @Autowired
    private OrderInfoMapper orderInfoMapper;
    @Autowired
    private WebTime webTime;
    @Autowired
    private OrderDetailsMapper orderDetailsMapper;

    @Transactional(propagation = Propagation.REQUIRED,readOnly = false)
    public OrderInfoEnum insertOrderInfo(int[] goodsId,int [] counts,int[] sellerId,
                                         int userId,int addressId) {
        //初始化订单固定参数
        OrderInfo orderInfo = new OrderInfo();
        orderInfo.setUserId(userId);
        orderInfo.setStartTime(webTime.getNetworkTime());
        orderInfo.setPayTime(null);//默认只下单，未支付
        orderInfo.setStatus(0);//将订单状态设置为0，表示订单未支付
        orderInfo.setAddressId(addressId);
        //将SellerId和对应的下标位置记录到Map
        Map<Integer, ArrayList<Integer>> SellerIdAndLocation=getSellerIdAndLocation(sellerId);
        //获取saveMap中的key值，即有多少个卖家id
        Set<Integer> sellerIds=SellerIdAndLocation.keySet();
        //循环遍历卖家id
        for(int id:sellerIds) {
            orderInfo.setSellerId(id);//将订单的卖家Id赋值
            //将初始化完的orderInfo插入数据库表orderInfo
            orderInfoMapper.insert(orderInfo);
            //int error=1/0;//模拟出现错误状况
            //通过key获取其value，循环遍历value，得到对应的goods和count
            for(int j=0;j<SellerIdAndLocation.get(id).size();j++){
                //循环初始化该订单的详细信息 包括goods和count
                OrderDetails orderDetails=new OrderDetails();
                //订单的id
                orderDetails.setOrderId(orderInfo.getId());
                //商品的id
                orderDetails.setGoodsId(goodsId[SellerIdAndLocation.get(id).get(j)]);
                //对应的数量
                orderDetails.setCount(counts[SellerIdAndLocation.get(id).get(j)]);
                orderDetailsMapper.insert(orderDetails);
            }
        }
        return OrderInfoEnum.INSERT_ORDERINFO_SUCCESS;
    }

    @Transactional(propagation = Propagation.REQUIRED,readOnly = false)
    public OrderInfoEnum delOrderInfo(int id) {
        int delNumOnOrderInfo=orderInfoMapper.deleteByPrimaryKey(id);
        int delNumOnOrderDetails=orderDetailsMapper.deleterByOrderId(id);
        if(delNumOnOrderInfo>0&&delNumOnOrderDetails>0)
            return OrderInfoEnum.DELETE_ORDERINFO_SUCCESS;
        else
            return OrderInfoEnum.DELETE_ORDERINFO_ERROR;
    }

    public void queryOrderByUserid(int userId) {
        //返回查询订单结果之前先更新订单的状态
        orderInfoMapper.updateOrderStatus(userId);
        List<OrderInfo> list=orderInfoMapper.queryOrderByUserid(userId);
        System.out.println(list.size());
        for(OrderInfo o:list){
            System.out.println("当前订单信息"+o.getStartTime());
        }
    }


    /**
     * 使用linkedhashmap
     * 存储卖家Id，还要存储卖家Id出现在数组中的下标位置
     * 使用Integer记录卖家Id
     * 使用ArrayList<Integer>存储该卖家Id出现在数组中的下标位置
     * 	key->value，可以直接获取到数字->所在下标位置
     * 	结果返回Map<Integer, ArrayList<Integer>> 即卖家Id和出现在数组中的下标位置
     * @param sellerId 卖家id数组
     * @return
     */
    private Map<Integer, ArrayList<Integer>> getSellerIdAndLocation(int [] sellerId){
        Map<Integer,ArrayList<Integer>> SellerIdAndLocation=new LinkedHashMap<Integer, ArrayList<Integer>>();
        for(int i=0;i<sellerId.length-1;i++){
            if(sellerId[i]!=-1) //设置我一个数组中不可能出现的值
            {
                //记录该卖家id
                int id=sellerId[i];
                //创建list，用于存放该卖家id在数组中出现的位置下标
                ArrayList<Integer> list=new ArrayList<Integer>();
                list.add(i);//记录该数字第一次出现的位置
                for(int j=i+1;j<sellerId.length;j++){
                    //遍历数组，查找与seller[i]相同的值并记录下标位置
                    if(sellerId[i]==sellerId[j])
                    {
                        list.add(j);//记录下标位置
                        sellerId[j]=-1;//同上，设置一个不可能出现的值，要与前面设置的保持一致
                    }
                }
                //通过key-value将卖家id和出现的位置put进Map
                SellerIdAndLocation.put(id,list);
            }
        }
        return SellerIdAndLocation;
    }
}
