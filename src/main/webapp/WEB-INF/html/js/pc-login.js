$(function() {
	tabmethods.init();
	loginbtnmethods.init();
});

//tab
var tabmethods = {
	init: function() {
		$("#account").click(function() {
			$(this).addClass("cursor").siblings(".tab-item").removeClass("cursor");
			$("#account-login").show().siblings(".tab-box").hide();
		});
		$("#quick").click(function() {
			$(this).addClass("cursor").siblings(".tab-item").removeClass("cursor");
			$("#quick-login").show().siblings(".tab-box").hide();
		});
	}
};

// btn submit
var loginbtnmethods = {
	init: function() {
		var that = this;
		that.initlogin();
		that.initfastlogin();
	},
	initlogin: function() {
		var isajaxed = false;
		$("#account-submit").click(function() {
			var result = verifyloginmethods.checkall();
			if (result && !isajaxed) {
				var data = verifyloginmethods.getfiled();
				data = $.extend(data, logincaptch.param, {
					type: 0
				});
				isajaxed = true;
				$.ajax({
					type: 'post',
					url: '/Login/Api_Login',
					data: data,
					success: function(ret) {
						if (ret.success) {
							var dialoged = ('undefined' != typeof isDialog) && isDialog;
							ret.recalltype = dialoged ? 1 : 0; //调用类型：1弹框登录，0正常登录
							ret.logintype = 0; //登录类型：0正常登录，1手机号快捷登录
							if (dialoged) {
								window.top.dialogLogin.callBack(ret);
								window.top.dialogLogin.closed();
							} else {
								window.location.href = ret.url;
							}
						} else {
							if (ret.errorTimes >= ret.minTimesWithoutCheckCode) {
								if (logincaptch.isinited()) {
									logincaptch.reload();
								} else {
									logincaptch.init();
								}
							}
							verifyloginmethods.settips(ret.msg);
						}
					},
					complete: function() {
						isajaxed = false;
					}
				});
			}
		});
	},
	initfastlogin: function() {
		var isajaxed = false;
		$("#quickLogin").click(function() {
			var result = verifyfastloginmethods.checkall();
			if (result && !isajaxed) {
				var data = verifyfastloginmethods.getfiled();
				isajaxed = true;
				$.ajax({
					type: 'post',
					url: '/Login/LoginQuick',
					data: data,
					success: function(ret) {
						if (ret.success) {
							var dialoged = ('undefined' != typeof isDialog) && isDialog;
							ret.recalltype = dialoged ? 1 : 0; //调用类型：1弹框登录，0正常登录
							ret.logintype = 1; //登录类型：0正常登录，1手机号快捷登录
							if (dialoged) {
								window.top.dialogLogin.callBack(ret);
								window.top.dialogLogin.closed();
							} else {
								window.location.href = ret.url;
							}
						} else {
							verifyfastloginmethods.settips(ret.msg);
						}
					},
					complete: function() {
						isajaxed = false;
					}
				});
			}
		});

		fastlogincaptch.init();
		mobilecodemethods.init();

		$("#sendCodeBtn").click(function() {
			var result = verifyfastloginmethods.checktogetcode();
			if (result) {
				mobilecodemethods.start();
			}
		});
	}
};

// login verify
var verifyloginmethods = {
	errElem: $('#account-error'),
	errElemCont: $('#account-error span'),
	checkusername: function() {
		var that = this;
		var username = $('#accountname').val();
		if (username && $.trim(username).length) {
			that.removetips();
			return true;
		}

		that.settips('请输入用户名');
		return false;
	},
	checkpwd: function() {
		var that = this;
		var password = $('#accountpwd').val();
		if (password && $.trim(password).length) {
			that.removetips();
			return true;
		}
		that.settips('请输入密码');
		return false;
	},
	checkcaptcha: function() {
		var that = this;
		if (!logincaptch.isinited() || (logincaptch.isinited() && logincaptch.iscaptched)) {
			that.removetips();
			return true;
		}
		that.settips('请滑动滑块完成验证');
		return false;
	},
	checkall: function() {
		var that = this;
		return that.checkusername() && that.checkpwd() && that.checkcaptcha();
	},
	getfiled: function() {
		var username = $('#accountname').val();
		var password = $('#accountpwd').val();
		var isremind = $('#autoLogin').is(':checked');

		return {
			username: username,
			password: password,
			keep: isremind
		};
	},
	removetips: function() {
		var that = this;
		that.errElem.hide();
	},
	settips: function(tiptxt) {
		var that = this;
		that.errElemCont.html(tiptxt);
		that.errElem.show();
	}
};
// fast login verify
var verifyfastloginmethods = {
	errElem: $('#quick-error'),
	errElemCont: $('#quick-error span'),
	checkmobile: function() {
		var that = this;
		var mobile = $('#ComMobile').val();
		var reg = /^1\d{10}$/;

		if (reg.test($.trim(mobile))) {
			that.removetips();
			return true;
		}

		that.settips('请输入正确的手机号码');
		return false;
	},
	checkmobilecode: function() {
		var that = this;
		var checkCode = $('#MobileCode').val();
		if (checkCode && $.trim(checkCode).length) {
			that.removetips();
			return true;
		}
		that.settips('请输入短信验证码');
		return false;
	},
	checkcaptcha: function() {
		var that = this;
		if (!fastlogincaptch.isinited() || (fastlogincaptch.isinited() && fastlogincaptch.iscaptched)) {
			that.removetips();
			return true;
		}
		that.settips('请滑动滑块完成验证');
		return false;
	},
	checktogetcode: function() {
		var that = this;
		return that.checkmobile() && that.checkcaptcha();
	},
	checkall: function() {
		var that = this;
		return that.checkmobile() && that.checkmobilecode();
	},
	getfiled: function() {
		var mobile = $('#ComMobile').val();
		var mobilecode = $('#MobileCode').val();
		var isremind = $('#autoLogin').is(':checked');

		return {
			mobile: mobile,
			mobilecode: mobilecode,
			keep: isremind
		};
	},
	removetips: function() {
		var that = this;
		that.errElem.hide();
	},
	settips: function(tiptxt) {
		var that = this;
		that.errElemCont.html(tiptxt);
		that.errElem.show();
	}
};

// mobilecode
var mobilecodemethods = {
	sendcodebtn: $("#sendCodeBtn"),
	quickloginbtn: $('#quickLogin'),
	mobilecodebox: $('#mobilecodebox'),
	btn: $('#dyMobileButton'),
	init: function() {
		var that = this;
		that.btn.sendCode({
			disClass: 'sendcode-disabled',
			secs: 120,
			run: false,
			runStr: '{%s}秒后重新获取',
			resetStr: '重新获取验证码',
			storageKey: null
		});
		that.bindevt();
	},
	bindevt: function() {
		var that = this;
		that.btn.on('click', function() {
			that.getmobilecode();
		});
	},
	getmobilecode: function() {
		var that = this;
		if (verifyfastloginmethods.checktogetcode()) {

			var data = verifyfastloginmethods.getfiled();
			data = $.extend({
				mobile: data.mobile
			}, fastlogincaptch.param, {
				smsscene: 1005
			});

			$.ajax({
				type: "post",
				url: "/Login/AuthenticateSig",
				data: data,
				success: function(ret) {
					if (ret.success) {
						that.btn.sendCode('start');
						that.mobilecodebox.show();
						that.sendcodebtn.hide();
						that.quickloginbtn.show();
					} else {
						verifyfastloginmethods.settips(ret.msg);
					}
				}
			});
		}
	},
	start: function() {
		var that = this;
		that.getmobilecode();
	}
};


// login captch
var logincaptch = {
	elembox: $('#loginCaptchabox'),
	captchnc: null,
	param: {},
	iscaptched: false,
	isinited: function() {
		var that = this;
		return that.captchnc;
	},
	init: function() {
		var that = this;
		that.param = {};
		that.iscaptched = false;

		var opt = captchamethods.getopt('loginCaptcha', function(param) {
			that.iscaptched = true;
			that.param = param;
		});
		that.captchnc = new noCaptcha(opt);
		captchamethods.setlang(that.captchnc);
		that.elembox.show();
	},
	show: function() {
		var that = this;
		captchamethods.show(that.captchnc);
		that.elembox.show();
	},
	hide: function() {
		var that = this;
		captchamethods.hide(that.captchnc);
		that.elembox.show();
	},
	reload: function() {
		var that = this;
		captchamethods.reload(that.captchnc);
		that.elembox.show();
		that.param = {};
		that.iscaptched = false;
	}
};
// fast login captch
var fastlogincaptch = {
	captchnc: null,
	param: {},
	iscaptched: false,
	isinited: function() {
		var that = this;
		return that.captchnc;
	},
	init: function() {
		var that = this;
		that.param = {};
		that.iscaptched = false;

		var opt = captchamethods.getopt('fastloginCaptcha', function(param) {
			that.iscaptched = true;
			that.param = param;
		});
		that.captchnc = new noCaptcha(opt);
		captchamethods.setlang(that.captchnc);
	},
	reload: function() {
		var that = this;
		captchamethods.reload(that.captchnc);
		that.param = {};
		that.iscaptched = false;
	}
};

// captch center
var captchamethods = {
	getopt: function(id, fun) {
		var nc_token = ["FFFF0N00000000005C26", (new Date()).getTime(), Math.random()].join(':');
		var nc_scene = 'nc_message';
		var NC_Opt = {
			renderTo: '#' + id,
			appkey: "FFFF0N00000000005C26",
			scene: nc_scene,
			token: nc_token,
			trans: {},
			elementID: [''],
			is_Opt: 0,
			language: 'cn',
			isEnabled: true,
			timeout: 3000,
			times: 5,
			apimap: {},
			callback: function(data) {
				fun({
					nc_token: nc_token,
					nc_scene: nc_scene,
					csessionid: data.csessionid,
					sig: data.sig
				});
			}
		};
		return NC_Opt;
	},
	setlang: function(nc) {
		nc.upLang('cn', {
			_startTEXT: "请按住滑块，拖动到最右边",
			_yesTEXT: "验证通过",
			_error300: "哎呀，出错了，点击<a href=\"javascript:__nc.reset()\">刷新</a>再来一次",
			_errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\">点击刷新</a>",
		});
	},
	show: function(nc) {
		nc.show();
	},
	hide: function(nc) {
		nc.hide();
	},
	reload: function(nc) {
		nc.reload();
	}
};