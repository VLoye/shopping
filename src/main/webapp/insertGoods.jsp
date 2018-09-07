<%--
  Created by IntelliJ IDEA.
  User: zhengwk
  Date: 2018/9/3
  Time: 9:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>添加商品信息</title>
</head>
<body>
    <div style="margin: 0 auto; margin-top:50px">
        <form action="/goods/add" method="post" enctype="multipart/form-data">
            商品id:
            <input type="text" name="id"/><br/>
            商品名称：
            <input type="text" name="name"/><br/>
            商品价格:
            <input type="text" name="price"/><br/>
            商品数量：
            <input type="text" name="stock"/><br/>
            seller_id:
            <input type="text" name="sellerId"/><br/>
            type_id:
            <input type="text" name="typeId"/><br/>
            brand_id:
            <input type="text" name="brandId"/><br/>
            上传图片：
            <input type="file" name="imageFile"/><br/>
            <br/>
            <input type="submit" value="提交">
        </form>
    </div>
</body>
</html>
