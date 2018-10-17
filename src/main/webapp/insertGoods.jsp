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
    <title>添加地址信息</title>
</head>
<body>
    <div style="margin: 0 auto; margin-top:50px">
       <%-- <form queue="/goods/add" method="post" enctype="multipart/form-data">
            地址id:
            <input type="text" name="id"/><br/>
            地址名称：
            <input type="text" name="name"/><br/>
            地址价格:
            <input type="text" name="price"/><br/>
            地址数量：
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
        </form>--%>
           <form queue="/address/saveorupdateaddress" method="post" >
               地址id:
               <input type="text" name="id"/><br/>
               收货人：
               <input type="text" name="linkman"/><br/>
               联系电话:
               <input type="text" name="tel"/><br/>
               procince：
               <input type="text" name="province"/><br/>
               城市:
               <input type="text" name="city"/><br/>
               area:
               <input type="text" name="area"/><br/>
               detailed_address:
               <input type="text" name="detailedAddress"/><br/>
               user_id:
               <input type="text" name="userId">
               <br/>
               <input type="submit" value="提交">
           </form>
    </div>
</body>
</html>
