package com.team6.util;/**
 * Created by VLoye on 2018/9/13.
 */

import com.team6.entity.User;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * @author VLoye
 * @ClassName HostHolder
 * @Description
 * @Date 10:01  2018/9/13
 * @Version 1.0
 **/
@Component
public class HostHolder {
    private static ThreadLocal<Map<String,Object>> userInfos = new ThreadLocal<Map<String,Object>>();

    public Map getCurrentUserInfo(){
        return userInfos.get();
    }
    public void setCurrentUserInfo(Map userInfo){
        userInfos.set(userInfo);
    }
    
    public void clear(){
        userInfos.remove();
    }

    public int getCurrentUserId(){
        Map map = userInfos.get();
        return (int)map.get("userid");
    }

}
