package com.team6.service.address;

import com.team6.dao.AddressMapper;
import com.team6.entity.Address;
import com.team6.service.login.LoginService;
import com.team6.util.enums.LoginEnum;
import com.team6.util.enums.UCRDEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AddressServiceImpl implements  AddressService{
    @Autowired
    private LoginService loginService;
    @Autowired
    private AddressMapper addressMapper;
    public Object queryAddressByUserId(HttpServletRequest request) {
        Map<String,Object> returnMap=new HashMap<>();
        //用户信息
        Map<String,Object> userInfo=new HashMap<>();
        userInfo=loginService.getCurrentUserInfo(request);
        if(userInfo==null){
            returnMap.put("msg", LoginEnum.LOGIN_OFF);
            return returnMap;
        }
        Integer userId= (Integer) userInfo.get("userid");
        //获取该用户信息的收货地址
        List<Map<String,Object>> addressList=addressMapper.queryByUserId(userId);
        return addressList;
    }

    public Object delAddressById(Integer addressId, HttpServletRequest request) {
        Map<String,Object> returnMap=new HashMap<>();
        int result=-1;
        //用户信息
        Map<String,Object> userInfo=new HashMap<>();
        userInfo=loginService.getCurrentUserInfo(request);
        if(userInfo==null){
            returnMap.put("msg",LoginEnum.LOGIN_OFF);
            return returnMap;
        }
        result=addressMapper.deleteByPrimaryKey(addressId);
        if(result>-1)
            returnMap.put("msg", UCRDEnum.UCRD_SUCCESS);
        else
            returnMap.put("msg",UCRDEnum.UCRD_ERROR);
        return returnMap;
    }

    public Object saveOrupdateAddress(Address record, HttpServletRequest request) {
        Map<String,Object> returnMap=new HashMap<>();
        int result=-1;
        //用户信息
        Map<String,Object> userInfo=new HashMap<>();
        userInfo=loginService.getCurrentUserInfo(request);
        if(userInfo==null){
            returnMap.put("msg",LoginEnum.LOGIN_OFF);
            return returnMap;
        }
        if(record.getId()==null){//新增收货地址信息
            result=addressMapper.insert(record);

        }else{//更新收货地址信息
            result=addressMapper.updateByPrimaryKey(record);
        }
        if(result>-1)
            returnMap.put("msg",UCRDEnum.UCRD_SUCCESS);
        else
            returnMap.put("msg",UCRDEnum.UCRD_ERROR);
        return returnMap;
    }
}
