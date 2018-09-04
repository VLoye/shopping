var localHostUrl = 'http://mall.qipeiren.com';;
(function($) {
	var setHtml = function() {
		$('body').append('<div class="alpha hide" id="id_alpha"></div>' +
			'<div class="mimiBox hide" id="id_mimiBox">' +
			'<div class="mimiWrap">' +
			'<div class="mimiTitle">' +
			'<span>您尚未登录</span>' +
			'</div>' +
			'<div class="mimiCon">' +
			'<div class="mimiTitleBox"><span class="mimiCurr">登 录</span><a class="mimiLimk" href="' + localHostUrl + '/register">注 册</a></div>' +
			'<div class="mimiLog">' +
			'<span class="mimiLogTitleMesg">用户名/已验证手机</span>' +
			'<div class="mimiInput"><input class="mimiText" type="text" value=""><i class="i-name"></i><label id="loginname_error" class="mimiError hide">您输入的账户名不存在，请核对后重新输入</label></div>' +
			'<span class="mimiLogTitleMesg">密码</span>' +
			'<div class="mimiInput"><input class="mimiText" type="password" value=""><i class="i-pass"></i><label id="loginname_error" class="mimiError hide">您输入的账户名不存在，请核对后重新输入</label></div>' +
			'<span class="mimiLogTitleMesg hide" id="verification_title">验证码</span>' +
			'<div class="mimiInput hide" id="verification"><input class="mimiText w60 fl" type="text" value="" id="verification_input"><label class="fl" style="line-height: 26px;"><img id="verification_img" class="verification_img" src="" alt="" style="cursor:pointer;width:88px;height:33px;display:block;"></label><label class="ftx23 fr" style="line-height: 26px;"><a class="verification_img" href="javascript:;">&nbsp;看不清？换一张</a></label><div class="clear"></div><label id="verification_error" class="mimiError hide">验证码不正确或验证码已过期</label></div>' +
			'<div class="mimiAutoentry"><label style="font-size:12px;float:left;line-height:26px;cursor:pointer;"><input class="mimiCheckbox" type="checkbox" name="chkRememberMe" style="margin:3px 3px 3px;vertical-align:middle;">自动登录</label></div>' +
			'<div class="mimiBtn"><input id="loginsubmitframe" class="mimi_btn" type="button" tabindex="8" value="登 录"></div>' +
			'<div class="coagent">' +
			'<label class="ftx24">使用其他方式登录商城：<span class="clr"></span>' +
			'<span class="btns"> ' +
			'<a href="https://graph.qq.com/oauth2.0/authorize?response_type=code&amp;client_id=101043707&amp;redirect_uri=' + localHostUrl + '/Login/OauthCallBack?oauthId=qipeiren.Plugin.OAuth.QQ&amp;scope=get_user_info&amp;state=test" title="QQ登录">' +
			'<img class="img1" src="http://img.qipeiren.com/Public/images/qq1.png">' +
			'<img class="img2" src="http://img.qipeiren.com/Public/images/qq2.png"></a>' +
			'</span>' +
			'<span class="btns">' +
			'<a href="https://open.weixin.qq.com/connect/qrconnect?appid=wxb7201de526558c1c&amp;redirect_uri=' + localHostUrl + '/Login/OauthCallBack?oauthId=qipeiren.Plugin.OAuth.WeiXin&amp;response_type=code&amp;scope=snsapi_login&amp;state=hishop" title="微信登录">' +
			'<img class="img1" src="http://img.qipeiren.com/Public/images/weixin1.png">' +
			'<img class="img2" src="http://img.qipeiren.com/Public/images/weixin2.png"></a>' +
			'</span>' +
			'</label>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div class="mimiClose" style="cursor:pointer;">×</div>' +
			'</div>' +
			'</div>');
	};
	$.fn.login = function(selectData, callBack, targetUrl, dataUrl, verifyUrl, domainPath) {
		$('#id_mimiBox').length < 1 ? setHtml() : '';
		domainPath = domainPath ? domainPath : '';
		var that = $('.mimiText'),
			btnDom = $('#loginsubmitframe'),
			uid = 0,
			response = null,
			trigger = function(uid, selectData, callBack, dataUrl, targetUrl) {
				if (!dataUrl || !targetUrl) {
					callBack.call(null, targetUrl);
				}
				postAjax(selectData, callBack, dataUrl, targetUrl);
			},
			postAjax = function(data, fn, url, elem) {
				if (response) {
					response.abort();
				};
				response = $.ajax({
					type: 'post',
					dataType: 'json',
					url: domainPath + url,
					data: data,
					success: function(d) {
						fn.call(d, elem);
					}
				});
			},
			checkCode = function(data) { // 验证码验证
				var data = data || {
						errorTimes: 2,
						minTimesWithoutCheckCode: 1
					},
					a = data.errorTimes,
					b = data.minTimesWithoutCheckCode,
					l,
					ver;
				if (+a - b > 0) {
					$('#verification,#verification_title').removeClass('hide').show();
				}
				$('#verification_input').keyup(function() {
					ver = $(this).val();
					l = ver.length;
					if (l == 4) {
						postAjax({
							checkCode: ver
						}, function(elem) {
							var data = this,
								str;
							if (data.success) {
								uid = 1;
								$('#verification_error').addClass('hide').hide();
							} else {
								uid = 0;
								str = $('#verification_input').val();
								if (str) {
									$('#verification_error').removeClass('hide').show().html('验证码错误!');
								} else {
									$('#verification_error').removeClass('hide').show().html('验证码不能为空!');
								}
							}
							$(elem).bind('focus', function() {
								$(this).val('');
							});
						}, '/login/checkCode', this);
						return false;
					}
				});
				$('.verification_img').bind('click', function() {
					$("#verification_img").attr('src', domainPath + '/Login/GetCheckCode?' + (+new Date()));
				});
			};
		that.each(function(i, e) {
			$(e).bind('focus', function() {
				$(this).addClass('mimiBorder');
				$(this).removeClass('mimiBorder_error').siblings('.mimiError').addClass('hide').hide();
			}).bind('blur', function() {
				$(this).removeClass('mimiBorder');
			});
		});
		btnDom.bind('click', function() {
			var arr = [];
			that.each(function(i, e) {
				var elem = $(e);
				arr.push(elem.val());
			});
			if ($('.mimiCheckbox').attr('checked')) {
				arr.push(true);
			}
			arr = 'username=' + arr[0] + '&password=' + arr[1] + '&checkCode=' + arr[2] + '&keep=' + (arr[3] || false); // 组成需要post的数据
			if ($('#verification').css('display') == 'block') {
				checkCode();
				if (!uid) {
					$('#verification_error').removeClass('hide').show().html('验证码错误!');
					return;
				} else {
					$('#verification_error').addClass('hide').hide();
				}
			}
			postAjax(arr, function(elemList) {
				var data = this,
					list = elemList;
				if (data.success) {
					uid = 1;
				} else {
					uid = 0;
					$(list[data.errorType]).addClass('mimiBorder_error').siblings('.mimiError').removeClass('hide').show(function() {
						$(this).html(data.msg);
					});

					$("#verification_img").attr('src', domainPath + '/Login/GetCheckCode?' + (+new Date()));
				}
				(($('#verification').css('display') == 'block') || data.errorTimes) && (function(data) { // 开始进行验证码验证
					checkCode(data);
				}(data));
				if (uid) {
					$('#id_alpha,#id_mimiBox').addClass('hide').hide();
					trigger(uid, selectData, callBack, dataUrl, targetUrl);
				}
				return false;
			}, verifyUrl, that);
		});
		$('.mimiClose').bind('click', function() {
			$('#id_alpha,#id_mimiBox').addClass('hide').hide();
		});
		$('#id_alpha,#id_mimiBox').removeClass('hide').show();
	};
}(jQuery));
/*
$.fn.login({用户勾选的商品数据},function(url){
	//跳转方法函数
	var data=this;
	if(data.state){
		window.location.href=url;
	}
},'跳转的url','数据url','登陆验证url', '指定域名path');
*/


/***login dialog by iframe
/***xj @2016.11.21 for cross site
****/
;(function($) {

	if (("undefined" == typeof ignoredomain) || !ignoredomain) {
		document.domain = 'qipeiren.com';
	}

	$.fn.dialogLogin = function(o) {
		o = $.extend({}, {
			dialogUrl:'http://mall.qipeiren.com/Login',
			callBack: function(data) {}
		}, o);
		return this.each(function(i) {
			o.dialogUrl += (o.dialogUrl.indexOf('?') == -1 ? '?' : '&') + 'isDialog=true';
			var html = '<div class="alpha hide" id="id_alpha"></div>' +
				'<div class="mimiBox hide" id="js_dialogLoginBox">' +
				'<div class="mimiWrap">' +
				'<div class="mimiTitle">' +
				'<span>您尚未登录汽配人账号</span>' +
				'</div>' +
				'<div class="mimiCon">' +
				'<iframe style="height:400px; width:100%;" id="js_login_iframe" frameborder="0" scrolling="no" src="' + o.dialogUrl + '"></iframe>' +
				'</div>' +
				'<div class="mimiClose" style="cursor:pointer;">×</div>' +
				'</div>' +
				'</div>';

			var dlbox = $('#js_dialogLoginBox');
			var aplhaBg = $('#id_alpha');

			dlbox.length ?  '' : ($('body').append(html), dlbox = $('#js_dialogLoginBox'), aplhaBg = $('#id_alpha'));

			window.top.dialogLogin = {
				callBack: o.callBack,
				closed: function() {
					var wp = window.parent.document.body;
					$('#js_dialogLoginBox', wp).addClass('hide').hide();
					$('#id_alpha', wp).addClass('hide').hide();
				}
			};
			aplhaBg.removeClass('hide').show();
			dlbox.removeClass('hide').show();

			$('.mimiClose', dlbox).bind('click', function() {
				aplhaBg.addClass('hide').hide();
				dlbox.addClass('hide').hide();
			});
		});
	};
}(jQuery));