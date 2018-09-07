$.extend($.fn.validatebox.defaults.rules, {
	/**  
	* 调用自定义的方法校验模板  
	* 使用方式: validType=call[fn]  
	* @type   
	*/  
	call: {  
	        validator: function(value, param){  
	        // value是被校验的控件的值  
	        // 取出页面传入用来校验的方法  
	            var callback = param[0];  
	            if(callback){  
	        		// 回调  
		            return callback(value);  
	            }  
	            return false;  
	        },  
	        // 显示校验错误信息  
	        message: '该用户账号已存在'   
	},
	//用户账号验证（只能包含 _ 数字 字母） 
    username_pwd: {//param的值为[]中值
        validator: function (value, param) {
        	var str = "";
        	if(param[2]==0){str="用户账号"} else(str="密码")
            if (value.length < param[0] || value.length > param[1]) {
                $.fn.validatebox.defaults.rules.username_pwd.message = str +"长度必须在" + param[0] + "至" + param[1] + "位局限.";
                return false;
            } else {
                if (!/^[\w]+$/.test(value)) {
                    $.fn.validatebox.defaults.rules.username_pwd.message = str +"只能数字、字母、下划线构成.";
                    return false;
                } else {
                    return true;
                }
            }
        }, message: ""
    },
	idcard: {// 验证身份证
        validator: function (value) {
            return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value);
        }, message: '身份证号码格式不正确'
    },
    // 确认两次密码是否相同
    pwdequals: {
		validator: function(value,param){
			return value == $(param[0]).val();
		}, message: "两次密码不一致，请确认后重新输入！"
    },
    phoneRex: {
		validator: function(value){
		var rex=/^1[3-8]+\d{9}$/;
		//var rex=/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
		//区号：前面一个0，后面跟2-3位数字 ： 0\d{2,3}
		//电话号码：7-8位数字： \d{7,8
		//分机号：一般都是3位数字： \d{3,}
		 //这样连接起来就是验证电话的正则表达式了：/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/		 
		var rex2=/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
		if(rex.test(value)||rex2.test(value)) { return true; }else { return false; } 
		}, message: "请输入正确电话或手机格式"
	}
});

/**  
 *  编码唯一性校验  
 *  
*  返回true表示校验通过，返回false表示校验失败  
*/  
function codeValidate(code){ 
	console.log(code);
  var result = true;  
  // 这里做业务逻辑判断, 比如判断是否需要验证等等，我的这里是oldvalue不需要校验  
  // 以下是我的远程唯一校验，ajax一定要同步执行  
  $.ajax({  
      async: false,  
          url : '/admin/yhgl.do?validateUsername',  
          data : {  
        	  username : code  
          },  
          success : function(data) { 
	    	  var res = eval ("(" + data + ")");
	          result = res.success;  
	      }  
  });  
  // 这里的result只有2个值：true / false  
  return result;  
}  