<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>    
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>验证码测试</title>
</head>
<body>
<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>

	<script type="text/javascript">


        function changecode(){
            document.getElementById('vcode').src="/vcode?c="+Math.random();
        }


	</script>

	<div style="margin: 0 auto;margin-top: 100px; ">
	
		<form action="" method="get">
		用户名：<input type="text" name="user"><br/>
		验证码：	<input type="text" name="vcode">
			<img id="vcode"  src="/vcode" onclick="changecode()">
			<input type="submit">
		</form>

		<br/><span style="color:red">${error }</span>
		
	</div>

</body>
</html>