package com.team6.util;/**
 * Created by VLoye on 2018/9/14.
 */

/**
 * @author VLoye
 * @ClassName JedisKeyUtil
 * @Description
 * @Date 9:38  2018/9/14
 * @Version 1.0
 **/
public class JedisKeyUtil {
    public static final String Key_Follower = "FOLLOWER";
    public static final String Key_Followee = "FOLLOWEE";
    public static final String Split = ":";
    public static final String Key_Type = "TYPE";


    /**
    *@author VLoye
    *@Description  用户收藏商品/店铺
    *@Date 12:35 2018/9/14
    *@Param [entityId, entityType]
    *@return java.lang.String
    **/
    public static String getFollower(int entityId,int entityType){
        String key = Key_Follower + Split + String.valueOf(entityId)+ Split + String.valueOf(entityType);
        return key;
    }
    /**
    *@author VLoye
    *@Description  获取这个物品/店铺的收藏者
    *@Date 12:42 2018/9/14
    *@Param [entityId, entityType]
    *@return java.lang.String
    **/
    public static String getFollowee(int entityId,int entityType){
        String key = Key_Followee + Split + String.valueOf(entityId)+ Split + String.valueOf(entityType);
        return key;
    }

}
