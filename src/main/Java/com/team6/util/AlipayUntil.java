package com.team6.util;

import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.request.AlipayTradePagePayRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;

public class AlipayUntil {
    private static Logger logger = LoggerFactory.getLogger(AlipayUntil.class);
    public static String pay(HttpServletRequest request,Integer orderId){
        //获得初始化的AlipayClient
        AlipayClient alipayClient = new DefaultAlipayClient(
                AlipayConfig.gatewayUrl,
                AlipayConfig.app_id,
                AlipayConfig.merchant_private_key,
                "json",
                AlipayConfig.charset,
                AlipayConfig.alipay_public_key,
                AlipayConfig.sign_type
        );

        //设置请求参数
        AlipayTradePagePayRequest alipayRequest = new AlipayTradePagePayRequest();
        alipayRequest.setReturnUrl(AlipayConfig.return_url+"/"+orderId);
        alipayRequest.setNotifyUrl(AlipayConfig.notify_url+"/"+orderId);
        //商户订单号，商户网站订单系统中唯一订单号，必填
        String out_trade_no = request.getParameter("orderNum");
        //付款金额，必填
        String total_amount = request.getParameter("money");
        //订单名称，必填
        String subject = request.getParameter("orderName");
        //商品描述，可空
        String body = request.getParameter("intro");

        alipayRequest.setBizContent("{\"out_trade_no\":\""+ out_trade_no +"\","
                + "\"total_amount\":\""+ total_amount +"\","
                + "\"subject\":\""+ subject +"\","
                + "\"body\":\""+ body +"\","
                + "\"product_code\":\"FAST_INSTANT_TRADE_PAY\"}");

        //若想给BizContent增加其他可选请求参数，以增加自定义超时时间参数timeout_express来举例说明
        //alipayRequest.setBizContent("{\"out_trade_no\":\""+ out_trade_no +"\","
        //		+ "\"total_amount\":\""+ total_amount +"\","
        //		+ "\"subject\":\""+ subject +"\","
        //		+ "\"body\":\""+ body +"\","
        //		+ "\"timeout_express\":\"10m\","
        //		+ "\"product_code\":\"FAST_INSTANT_TRADE_PAY\"}");
        //请求参数可查阅【电脑网站支付的API文档-alipay.trade.page.pay-请求参数】章节

        //请求
        String result=null;
        try{
            result = alipayClient.pageExecute(alipayRequest).getBody();
        }catch (Exception e){
            logger.error(e.getMessage());
            e.printStackTrace();
            return result;
        }
        return result;
    }
}
