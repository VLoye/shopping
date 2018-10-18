package com.team6.util;

import java.io.FileWriter;
import java.io.IOException;

public class AlipayConfig {
    //↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

    // 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
    public static String app_id = "2016092200566766";

    // 商户私钥，您的PKCS8格式RSA2私钥
    public static String merchant_private_key = "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCzTuwOpEVvDqZMs2zhm9aODQU3GYWjVNTNZk65lOWRU0YUwqK5O4m7foK2on1F7jCpkO7ZguA2FT+txKP8Obxyn/JhiY+B1xnAIFWnv0YorZkagdI0G1xS7aay06WxoNLK2pf2BpkkVtDUqumrxEeKG7WIT5scobgaW8F9dCm+lF/s36KbIXbnTbLPmP+GKYzc/dBwjuLkQROh2cXa2M6+zZ4sJdquv2/vMHjWs5oTRfQ9nx+OwDEWrHE5SsXsedkNGT51Ccf1LKGawHvr+W5NaYuvG1AJ0Rt2g3uX5tAeKue5bBIC5vFa7bxE9B2mg6ad2cVQAj1ASWRV5vEgGx+HAgMBAAECggEBAJtubH38tBujDVErr9SZ7BDTBJRQ0WFWJemvJ8sDYUTqdLOGTNxY2fnnnpOGoyU9Zn12nzV5l7YKEVsmPChmPA74y3j1b6rTtQSwgs+YpM6aPT+XDYoRtaRFUd1uThF+IXuqpVOlQJcZkojnZwt4Z7M2ddQlfYYCQb7HjyCa05zZOSw31smhmM1hjTX34IpLqFTQ7ouvBVpvnAOKinfHciIRVRqDajyKGfYqJqZFYY6sZ1m+7YsfKH0/hW304O55o/uTZAy1j127kyIkSTBClXJiyxR0pnNQu3Qu4YytwTsgQN/mJq1pt7Z9mKBlOAbhWG+z98ygpbcjCwFGuXQfWdECgYEA5kg3tp5oYIvaAxJtSxtchEZwDPyhLc1j+/aF6F0i574rHhJIiIHV5sTQHl8bX+k4cLTL4NzhixQDq748cEj7YPeMGIik7RVQoZsHfV6jxC6lkOL24JzHXzeThqox6EzRPJJSgB7N/b3gjurlooJgxyPnOIjP3h4JsxCJDrp0yasCgYEAx1VcA5fjskvLrD6H/Y2GceEEsf4sVu3e1r8+ItKgb1rQ9FzqSV7UuUOXxH9PJ5baEgMrJ/AiR68KkB67Byt0OEUtHNafHIZQ42BiYNS28l52/QJFyVNkY3pGK+ghjTYO6O7Gsob4NEJaUbCxxH5Rb0HMOyPltbMl+FwwBoY8PZUCgYEA2R9+aFEzWNSD2iGlqwtBT/aZ76TC08y0WP03hL9MCfTj8paKjSrd45fuIrTJusTK0nmlQX8BqYBVdbkIg1ZMrkC5duhfmKpgO/9QMITrJC5XLSTSYTVxRfXAw1f1dnH3VoUgBG0HDBfbguU3XuJPHXRcrpFQbL0lqBAPKjPjqcECgYBDpNP05DaA6vfTG+VKRhy5yIKvZHHnjhFxDrUnXBLVtxvx0RYwj93ggO+f3xQdezPFqQ2cIAGCEgSjo8oURMrLza3he3PDWlFY1/yKn6T12tjGQ18rUwFeQMBPZhb8tLuakG0daHASS/IahrvM0pEQEGQeLbBmWMUp4x7pF+SZgQKBgFKvDP7YLM5ocXJb1GeT3LGGBhgAGS1pnKZUsC/yE7JhazcvRoF63zqRXf3ZFtQ4IsJy5x/7dL+EiGCUOiHxSVSy6/8xrVJXkBQV6NN6Z8XkFQQSI/1Dq9l6AmeWiVePUw3q8nYfTkI875HGPmy5C8aWAiLk3U485a2WNi0gwXJj";

    // 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAphwnFg9eeEi0Zg8X5cpH34WFY01UeW8SacZkMCznlymDg0pnHtvZYhtXkKkluBnmNGCvpCDoOSteeD/nhCf21/Q8vSNaWOATW3rWoxbHv/xW2IkXO0FbtJTlzDw/5kndQOzVJ8ip6SOVwAfebwlr6pu6gVbBCRPFSPJhPVuilrKQUBm1wUih0862ZS+ylZqvCxOjWfB9JJUC4jTB5XZgHcI9i0vsQsqIBuK1CYXF10ZBdisok3TnKmd4AivaKea0WGzabHKGkLAEEZ1+YuIKRxr4AbA9tA3QyoyB7GZDtoNiVM6eliPqDk+qGn4qP6X3FzW+z6hZrH+/6ODbnv9lnQIDAQAB";

    // 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    public static String notify_url = "http://localhost:8080/order/pay";

    // 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    public static String return_url = "http://localhost:8080/order/pay";

    // 签名方式
    public static String sign_type = "RSA2";

    // 字符编码格式
    public static String charset = "utf-8";

    // 支付宝网关
    public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";

    // 支付宝网关
    public static String log_path = "https://openapi.alipaydev.com/gateway.do";


//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    /**
     * 写日志，方便测试（看网站需求，也可以改成把记录存入数据库）
     * @param sWord 要写入日志里的文本内容
     */
    public static void logResult(String sWord) {
        FileWriter writer = null;
        try {
            writer = new FileWriter(log_path + "alipay_log_" + System.currentTimeMillis()+".txt");
            writer.write(sWord);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
