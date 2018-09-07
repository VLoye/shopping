var sysUtils = $.extend({}, sysUtils); //全局对象

sysUtils.message = function(title) {
	$.messager.show({
		msg : title,
		title : '提示'
	});
};

sysUtils.bigmessage = function(title) {
	$.messager.show({
		width:300,
		height:150,
		msg : title,
		timeout:5000,
		title : '提示'
	});
};

sysUtils.alert = function(title, msg, icon, callback) {
	var icontype = ["error","info","question","warning"];
	$.messager.defaults = {ok: "确定",cancel: "取消",width:300,height:"auto",minHeight:150,modal:true,collapsible:false,minimizable:false,maximizable:false,resizable:false,closable:false};
	$.messager.alert(title, msg, icontype[icon], callback);
};

sysUtils.confirm = function(title, msg, callback) {
	$.messager.defaults = {ok: "确定",cancel: "取消",width:300,height:"auto",minHeight:150,modal:true,collapsible:false,minimizable:false,maximizable:false,resizable:false,closable:false};
	$.messager.confirm(title, msg, callback);
};

sysUtils.dialog = function(options) {
	var bodyCls = 'dialog-body';
	if (options.bodyCls != undefined) {
		bodyCls = options.bodyCls;
	}
	var opts = $.extend({
		modal : true,
		cache: false,
	    bodyCls: bodyCls,
	    loadingMessage: '加载中',
		onClose : function() {
			$(this).dialog('destroy');
		}
	}, options);
	return $('<div/>').dialog(opts)
};

sysUtils.imgDialog = function(obj) {
	var dialog = $('<div style="background-image: url('+$(obj)[0].currentSrc+')"></div>').dialog({
		title: '',
	    border: 0,
	    width: $(obj)[0].naturalWidth,
	    height: $(obj)[0].naturalHeight,
	    closed: false,
	    cache: false,
	    //href: $(obj)[0].currentSrc,
	    modal: true
	});
	
	$('.window-mask').click(function() {
		dialog.dialog('close');
	});
};

sysUtils.ajaxPost = function(url, data, callback) {
	$.ajax({
		url : url,
		type:"post",
		data : data,
		cache : false,
		dataType : "json",
		success : function(response) {
			callback(response);
		}
	});
};

sysUtils.TbAjaxPost = function(url, data, callback) {
	$.ajax({
		url : url,
		type:"post",
		data : data,
		cache : false,
		async : false,
		dataType : "json",
		success : function(response) {
			callback(response);
		}
	});
};

sysUtils.ajaxGet = function(url, data, callback) {
	$.ajax({
		url : url,
		type:"get",
		data : data,
		cache : false,
		dataType : "json",
		success : function(response) {
			callback(response);
		}
	});
};

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

var Clock = function() {
	var date = new Date();
	this.year = date.getFullYear();
	this.month = date.getMonth() + 1;
	this.date = date.getDate();
	this.day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];
	this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

	this.toString = function() {
		return "" + this.year + "年" + this.month + "月" + this.date + "日 " + this.hour + ":" + this.minute + ":" + this.second + " " + this.day; 
	};
	
	this.toSimpleDate = function() {
		return this.year + "-" + this.month + "-" + this.date;
	};
	
	this.toDetailDate = function() {
		return this.year + "-" + this.month + "-" + this.date + " " + this.hour + ":" + this.minute + ":" + this.second;
	};
	
	this.display = function(ele) {
		var clock = new Clock();
		ele.innerHTML = clock.toString();
		window.setTimeout(function() {clock.display(ele);}, 1000);
	};
};
