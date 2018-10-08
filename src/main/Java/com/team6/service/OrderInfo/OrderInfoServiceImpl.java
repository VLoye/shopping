package com.team6.service.OrderInfo;

import com.team6.dao.OrderDetailsMapper;
import com.team6.dao.OrderInfoMapper;
import com.team6.dto.order.UserOrderData;
import com.team6.entity.OrderDetails;
import com.team6.entity.OrderInfo;
import com.team6.service.Goods.GoodsService;
import com.team6.service.login.LoginService;
import com.team6.util.WebTime;
import com.team6.util.enums.LoginEnum;
import com.team6.util.enums.UCRDEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Service
public class OrderInfoServiceImpl implements OrderInfoService{
    @Autowired
    private OrderInfoMapper orderInfoMapper;
    @Autowired
    private WebTime webTime;
    @Autowired
    private OrderDetailsMapper orderDetailsMapper;
    @Autowired
    private LoginService loginService;
    @Autowired
    private GoodsService goodsService;
    @Transactional(propagation = Propagation.REQUIRED,readOnly = false)
    public Object insertOrderInfo(int[] goodsId,int [] counts,int[] sellerId,
                                         Integer userId,int addressId) {
        Map<String,Object> resultMap=new HashMap<>();
        int result=-1;
        if(userId==null){
            resultMap.put("msg", LoginEnum.LOGIN_OFF.getInfo());
            return resultMap;
        }
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
            result=orderInfoMapper.insert(orderInfo);
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
                result=orderDetailsMapper.insert(orderDetails);
            }
        }
        if(result>0) {//添加订单成功
            resultMap.put("msg", UCRDEnum.UCRD_SUCCESS.getInfo());
            return resultMap;
        }else{
            resultMap.put("msg",UCRDEnum.UCRD_ERROR.getInfo());
            return resultMap;
        }
    }

    @Transactional(propagation = Propagation.REQUIRED,readOnly = false)
    public Object delOrderInfo(int id, HttpServletRequest request) {
        Map<String,Object> returnMap=new HashMap<>();
        //用户信息
        Map<String,Object> userInfo = loginService.getCurrentUserInfo(request);
        if(userInfo==null){
            returnMap.put("msg", LoginEnum.LOGIN_OFF.getInfo());
            return returnMap;
        }
        int delNumOnOrderInfo=orderInfoMapper.deleteByPrimaryKey(id);
        int delNumOnOrderDetails=orderDetailsMapper.deleterByOrderId(id);
        if(delNumOnOrderInfo>0&&delNumOnOrderDetails>0) {//删除订单信息成功
            returnMap.put("msg",UCRDEnum.UCRD_SUCCESS.getInfo());
            return returnMap;
        }
        else//删除订单信息失败
        {
            returnMap.put("msg",UCRDEnum.UCRD_ERROR.getInfo());
            return returnMap;
        }
    }

    public Object queryOrderByUserid(Integer key,HttpServletRequest request) {
        Map<String,Object> returnMap=new HashMap<>();
        //订单总价,初始化为运费10元
            long totalPrice=10;
       //用户信息
        Map<String,Object> userInfo = loginService.getCurrentUserInfo(request);
        if(userInfo==null){
            returnMap.put("msg", LoginEnum.LOGIN_OFF.getInfo());
            return returnMap;
        }
       int userId = (Integer) userInfo.get("userid");
        //返回查询订单结果之前先更新订单的状态
        orderInfoMapper.updateOrderStatus(userId);
        //获取用户的订单（根据key的值搜索订单的状态）
        List<Map<String, Object>> list=orderInfoMapper.queryOrderByUserId(userId,key);
        for(Map<String,Object> map:list){
            Integer orderId=map.get("id").hashCode();
            //获取每个订单的详细信息
            List<UserOrderData> glist=orderDetailsMapper.queryOrderDate(orderId);
            for(UserOrderData data:glist){
                totalPrice+=(data.getPrice()*data.getCount());
            }
            map.put("totalPrice",totalPrice);
            map.put("goods",glist);
            totalPrice=10;
        }
        return list;
    }

    @Override
    public Object OrderPay(Integer orderId, HttpServletRequest request) {
        int result=-1;
        Map<String,Object> returnMap=new HashMap<>();
        //用户信息
        Map<String,Object> userInfo=loginService.getCurrentUserInfo(request);
        if(userInfo==null){
            returnMap.put("msg",LoginEnum.LOGIN_OFF);
            return returnMap;
        }
        //获取orderId的订单
        OrderInfo orderInfo=orderInfoMapper.selectByPrimaryKey(orderId);
        //更新订单  状态为已支付和支付时间
        orderInfo.setStatus(1);
        orderInfo.setPayTime(webTime.getNetworkTime());
        result=orderInfoMapper.updateByPrimaryKey(orderInfo);
        if(result>-1){
            returnMap.put("msg",UCRDEnum.UCRD_SUCCESS);
            return returnMap;
        }else{
            returnMap.put("msg",UCRDEnum.UCRD_ERROR);
            return returnMap;
        }
    }

    @Override
    public Object queryOrderByOrderid(Integer orderId, HttpServletRequest request) {
        Map<String,Object> returnMap=new HashMap<>();
        //用户信息
        Map<String,Object> userInfo=loginService.getCurrentUserInfo(request);
        if(userInfo==null){
            returnMap.put("msg",LoginEnum.LOGIN_OFF);
            return returnMap;
        }
        return null;
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
