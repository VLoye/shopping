package com.team6.util;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.Date;

@Component
public class WebTime {
    /*
     * 获取当前网络时间
     */
    public java.sql.Timestamp getNetworkTime() {
        String webUrl="http://www.baidu.com";//百度时间
        try {
            URL url=new URL(webUrl);
            URLConnection conn=url.openConnection();
            conn.connect();
            long dateL=conn.getDate();
            Date date=new Date(dateL);
            java.sql.Timestamp sqlDate=new java.sql.Timestamp(date.getTime());//年  月 日  时  分   秒 毫秒
            return sqlDate;
        }catch (MalformedURLException e) {
            e.printStackTrace();
        }catch (IOException e) {
            e.printStackTrace();
        }
            return null;
    }
}
