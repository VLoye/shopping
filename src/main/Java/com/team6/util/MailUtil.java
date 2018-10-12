package com.team6.util;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class MailUtil {

    public static void sendMail(String to,String code) throws Exception{
        //创建连接对象
        Properties properties = new Properties();
        properties.setProperty("mail.transport.protocol","smtp");
        properties.setProperty("mail.smtp.host","smtp.163.com");
        properties.setProperty("mail.smtp.auth","true");
        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("q1002463796@163.com","liwenhao.");
            }
        });
        //创建邮件对象
        Message message = new MimeMessage(session);
        //设置发件人
        message.setFrom(new InternetAddress("q1002463796@163.com"));
        //设置收件人
        message.setRecipient(Message.RecipientType.TO,new InternetAddress(to));
        //邮件主题
        message.setSubject("激活邮件");
        //设置邮件的正文
        message.setContent("<h1>你的激活码是："+code+"</h1>",
                "text/html;charset=UTF-8");
        //发送邮件
        Transport.send(message);
    }
}
