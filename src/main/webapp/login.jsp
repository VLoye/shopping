<%--
  Created by IntelliJ IDEA.
  User: happynewyear
  Date: 2018/8/29
  Time: 9:55
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>测试2</title>
</head>
<body>
<form id="login_form" action="" method="post">
    <br />用户帐号： <input type="text" name="name" id="username" value=""/>
    <br />登录密码： <input type="password" name="password" id="password"/><br/>
    <input type="text" name="vcode">  <img id="vcode"  src="/vcode" onclick="changecode()">
    <input type="checkbox" name="rememberMe"
           value="true" />

    <button type="button" id="login">登陆</button>
</form>


<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
<script type="text/javascript">
    //更新验证码
    function changecode(){
        document.getElementById('vcode').src="/vcode?c="+Math.random();
    }
$(document).ready(function () {
    var list=new Array();
    var count=new Array();
    for(var i=0;i<20;i++){
       list.push(i+10);
       if(i%2==1) count.push(1) ;
       else count.push(2);
    }
       var obj ={};
        obj['goodsId']="1";
        obj['content']="sdfasd"

    $("#login").click(function(){

        var name=$("#name").val();
      /*  $.post("/shopCar/detailData",{"idList":JSON.stringify(list),"countList":JSON.stringify(count)});*/
        $.ajax({
            //提交数据的类型 POST GET
            type:"POST",
            contentType: 'application/json',
            //提交的网址
            url:"/comment/add/1",
            async:true,
            //提交的数据
            data:/*JSON.stringify(obj)*/{"listid":list},
            //返回数据的格式
            datatype: "json",
            //成功返回之后调用的函数
            success:function (data){
                //登陆失败更换验证码
                if (data.status!="success"){
                    changecode();
                }
                else{
                    var prevLink = document.referrer;
                    alert(prevLink.trim());
                    if($.trim(prevLink)==''){

                        location.href = 'http://localhost:8080/index.jsp';
                    }else{
                        if(prevLink.indexOf('http://localhost:8080')==-1){	//来自其它站点
                            location.href = 'http://localhost:8080/index.jsp';
                        }
                        if(prevLink.indexOf('register.jsp')!=-1){		//来自注册页面
                            location.href = 'http://localhost:8080/index.jsp';
                        }
                        location.href = prevLink;
                    }

                }
               alert(data.status);
            },
            //调用出错执行的函数
            error: function(error){
                alert("ajax error : "+error);
            }
        });
    });
})
</script>

</body>
</html>
