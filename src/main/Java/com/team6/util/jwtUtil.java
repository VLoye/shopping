package com.team6.util;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.sun.org.apache.bcel.internal.generic.NEW;
import com.team6.dao.PermissionMapper;
import com.team6.entity.User;
import com.team6.exception.ErrorTokenException;

import java.util.*;

public  class jwtUtil {
    private static final String SecretKey ="createBySix";
    public static boolean isOnline(String token) {
            return false;
    }

    public static Map<String,Claim> verifyToken(String token) throws Exception   {

        Map<String, Claim> map=null;

        try{
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SecretKey)).build();
            DecodedJWT decodedJWT = verifier.verify(token);
            //取得map
           map= decodedJWT.getClaims();

        }catch (Exception e){
                throw new ErrorTokenException("token验证错误");

        }finally {
            return map;
        }


    }

    public static String createToken(User user,Set<String> permission) {
        Map head =new HashMap();
        //签发时间
        Date issTime = new Date();

        //过期时间
        Calendar nowTime = Calendar.getInstance();
        nowTime.add(Calendar.HOUR,6);   //设置为6小时之后
        Date expTime = nowTime.getTime();  //设置6小时后过期
        //头部
        head.put("alg","HS256");
        head.put("typ","jwt");
        String token = JWT.create()
                //头
                .withHeader(head)
                //签发时间
                .withIssuedAt(issTime)
                //过期时间
                .withExpiresAt(expTime)
                .withClaim("name",user.getName())
                .withClaim("id",user.getId())
                .withClaim("role",user.getRole())
                .withArrayClaim("permissions",permission.toArray(new String[permission.size()]))
                .sign(Algorithm.HMAC256(SecretKey));
        return token;
    }


}
