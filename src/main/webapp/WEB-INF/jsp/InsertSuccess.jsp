<%@ page import="com.team6.entity.Goods" %>
<%--
  Created by IntelliJ IDEA.
  User: zhengwk
  Date: 2018/9/3
  Time: 17:15
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>返回插入商品成功视图</title>
</head>
<body>
<%
    Goods goods=(Goods) request.getAttribute("goods");
%>
商品名称：<%=goods.getName()%><br/>
商品图片:<img src="<%=goods.getImgUrl()%>" >

</body>
</html>
