package com.team6.service.OrderInfo;
import com.team6.util.WebTime;
import com.team6.dao.OrderDetailsMapper;
import com.team6.dao.OrderInfoMapper;
import com.team6.entity.OrderInfo;
import com.team6.util.enums.OrderInfoEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderInfoServiceImpl implements OrderInfoService{
    @Autowired
    private OrderInfoMapper orderInfoMapper;
    @Autowired
    private OrderDetailsMapper orderDetailsMapper;

    public OrderInfoEnum insertOrderInfo(OrderInfo orderInfo) {
        int result=orderInfoMapper.insert(orderInfo);
        //如果插入订单信息成功，则返回order_id，否则返回0
        if(result>0)
           return OrderInfoEnum.INSERT_ORDERINFO_SUCCESS;
        else
            return OrderInfoEnum.DELETE_ORDERINFO_ERROR;
    }

    public OrderInfoEnum delOrderInfo(int id) {
        int delNumOnOrderInfo=orderInfoMapper.deleteByPrimaryKey(id);
        int delNumOnOrderDetails=orderDetailsMapper.deleterByOrderId(id);
        if(delNumOnOrderInfo>0&&delNumOnOrderDetails>0)
            return OrderInfoEnum.DELETE_ORDERINFO_SUCCESS;
        else
            return OrderInfoEnum.DELETE_ORDERINFO_ERROR;
    }
}
