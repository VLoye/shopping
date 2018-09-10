$(function() {
	registerbtnmethods.init();
});


registerbtnmethods = {
	init: function() {
		var that = this;
		that.stepone();
		that.steptwo();
	},
	stepone: function() {
		var isajaxed = false;
		$("#steponeBtn").click(function() {
			var result = verifysteponemethods.checkall();
			if (result && !isajaxed) {
				var data = verifysteponemethods.getfiled();
				data = $.extend(data, {
					smsscene:1006
				});
				isajaxed = true;

				$.ajax({
					type: 'post',
					url: '/Register/CheckMobileCodeByMobile',
					data: data,
					success: function(ret) {
						if (ret.success) {
							stepgonextmethods.stepone();
						}else{
							verifysteponemethods.settips(verifysteponemethods.backerrid, ret.msg);
						}
					},
					complete:function(){
						isajaxed = false;
					}
				});
			}
		});

		steponecaptch.init();
		mobilecodemethods.init();
		verifysteponemethods.init();
	},
	steptwo: function() {
		var isajaxed = false;
		$("#steptwoBtn").click(function() {
			var result = verifysteptwomethods.checkall();
			if (result && !isajaxed) {
				var data = verifysteptwomethods.getfiled();
				data = $.extend(data, {
					type:0
				});
				isajaxed = true;
				$.ajax({
					type: 'post',
					url: '/Register/RegisterQuick',
					data: data,
					success: function(ret) {
						if (ret.success) {
							stepgonextmethods.steptwo();
						}else{
							verifysteptwomethods.settips(verifysteptwomethods.backerrid, ret.msg);
						}
					},
					complete:function(){
						isajaxed = false;
					}
				});
			}
		});

		verifysteptwomethods.init();
	}
};


var stepgonextmethods = {
	stepone:function(){
		$('#steponebox').hide();
		$('#steptwobox').show();
		$('#stepheadbox [head-item="2"]').addClass('cursor');
	},
	steptwo:function(){
		window.location.href = '/Register/Register_Success';
	}
};

// stepone verify
var verifysteponemethods = {
	backerrid:'backverify-error',
	init:function(){
		var that = this;
		$('#mobile').on('blur', function(){
			that.checkmobile();
		});
	},
	checkmobile: function() {
		var that = this;
		var errtipid = 'mobile-error';

		var cellPhone = $('#mobile').val();
		var reg = /^1\d{10}$/;

		if(reg.test($.trim(cellPhone))) {
			that.removetips(errtipid);
			return true;
		}
		that.settips(errtipid, '请输入正确的手机号码');
		return false;
	},
	checkmobilecode: function() {
		var that = this;
		var errtipid = 'mobilecode-error';

		var mcode = $('#mobilecode').val();
		if (mcode && $.trim(mcode).length) {
			that.removetips(errtipid);
			return true;
		}
		that.settips(errtipid, '请输入短信验证码');
		return false;
	},
	checkcaptcha: function() {
		var that = this;
		var errtipid = 'captch-error';

		if (!steponecaptch.isinited() || (steponecaptch.isinited() && steponecaptch.iscaptched)) {
			that.removetips(errtipid);
			return true;
		}
		that.settips(errtipid, '请滑动滑块完成验证');
		return false;
	},
	checktogetcode: function() {
		var that = this;
		return that.checkmobile() && that.checkcaptcha();
	},
	checkall: function() {
		var that = this;
		return that.checkmobile() && that.checkcaptcha() && that.checkmobilecode();
	},
	getfiled: function() {
		var mobile = $('#mobile').val();
		var mobilecode = $('#mobilecode').val();

		return {
			mobile: mobile,
			mobilecode: mobilecode
		};
	},
	removetips: function(id) {
		var elembox = $('#'+ id);
		var elemcont = $('span', elembox);
		elemcont.html('');
		elembox.hide();
		$('#' + id + 'not').show();
	},
	settips: function(id, tiptxt) {
		var elembox = $('#'+ id);
		var elemcont = $('span', elembox);
		elemcont.html(tiptxt);
		elembox.show();
		$('#' + id + 'not').hide();
	}
};
// mobilecode
var mobilecodemethods = {
	btn: $('#getmobilecode'),
	init: function() {
		var that = this;
		if(that.btn && that.btn.length){
			that.btn.sendCode({
				disClass: 'sendcode-disabled',
				secs: 120,
				run: false,
				runStr: '{%s}秒后重新获取',
				resetStr: '重新获取验证码',
				storageKey: 'getmobilecode'
			});
			that.bindevt();
		}
	},
	bindevt: function() {
		var that = this;
		that.btn.on('click', function() {
			that.getmobilecode();
		});
	},
	getmobilecode: function() {
		var that = this;
		if (verifysteponemethods.checktogetcode()) {

			var data = verifysteponemethods.getfiled();
			data = $.extend({ mobile:data.mobile }, steponecaptch.param, {
				smsscene:1006
			});
			$.ajax({
				type: "post",
				url: "/Login/AuthenticateSig",
				data:data,
				success: function(ret) {
					if (ret.success) {
						that.btn.sendCode('start');
					} else {
						verifysteponemethods.settips(verifysteponemethods.backerrid, ret.msg);
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
// stepone captch
var steponecaptch = {
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

		if(typeof noCaptcha != 'undefined'){
			var opt = captchamethods.getopt('registerCaptch', function(param) {
				that.iscaptched = true;
				that.param = param;
			});
			that.captchnc = new noCaptcha(opt);
			captchamethods.setlang(that.captchnc);
		}
	},
	show: function() {
		var that = this;
		captchamethods.show(that.captchnc);
	},
	hide: function() {
		var that = this;
		captchamethods.hide(that.captchnc);
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
		var nc_scene = 'nc_register';
		var NC_Opt = {
			renderTo: '#' + id,
			appkey: "FFFF0N00000000005C26",
			scene: nc_scene,
			token: nc_token,
			trans: {
			},
			elementID: [''],
			is_Opt: 0,
			language: 'cn',
			isEnabled: true,
			timeout: 3000,
			times: 5,
			apimap: {},
			callback: function(data) {
					console.log(data)
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

// steptwo verify
var verifysteptwomethods = {
	backerrid:'backverify-error',
	init:function(){
		var that = this;
		$('#username').on('blur', function(){
			that.checkusername();
		});
		$('#pwd').on('blur', function(){
			that.checkpwd();
		});
		$('#pwdRepeat').on('blur', function(){
			that.checkpwdrepeat();
		});
	},
	checkusername: function() {
		var that = this;
		var errtipid = 'username-error';

		var username = $('#username').val();
		var reg = /^[A-Za-z0-9\_\-]{4,20}$/;

		if(reg.test($.trim(username))) {
			that.removetips(errtipid);
			return true;
		}
		that.settips(errtipid, '4-20位字符，支持英文、数字及“—”、“_”的组合，注册成功不能修改');
		return false;
	},
	checkpwd: function() {
		var that = this;
		var errtipid = 'pwd-error';

		var username = $('#username').val();
		var pwd = $('#pwd').val();
		var reg = /^(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{6,20}$/;
		if(reg.test($.trim(pwd)) && $.trim(pwd) != $.trim(username)) {
			that.removetips(errtipid);
			return true;
		}
		that.settips(errtipid, '6-20位字符，必须同时包含数字和字母，且不能和登录名相同');
		return false;
	},
	checkpwdrepeat: function() {
		var that = this;
		var errtipid = 'pwdrepeat-error';

		var pwd = $('#pwd').val();
		var pwdrepeat = $('#pwdRepeat').val();

		if($.trim(pwd).length && $.trim(pwd) == $.trim(pwdrepeat)) {
			that.removetips(errtipid);
			return true;
		}
		that.settips(errtipid, '确认密码输入不正确，请重新输入');
		return false;
	},
	checkagreement:function(){
		var that = this;
		var errtipid = 'agreement-error';

		var isagreement = $('#agreement').is(':checked');
		if(isagreement) {
			that.removetips(errtipid);
			return true;
		}
		that.settips(errtipid, '请仔细阅读并同意汽配人网会员注册协议');
		return false;
	},
	checkall: function() {
		var that = this;
		return that.checkusername() && that.checkpwd() && that.checkpwdrepeat() && that.checkagreement();
	},
	getfiled: function() {
		var username = $('#username').val();
		var pwd = $('#pwd').val();
		var mobile = $('#mobile').val();
		var mobilecode = $('#mobilecode').val();

		return {
			mobile:mobile,
			mobilecode:mobilecode,
			username: username,
			password: pwd
		};
	},
	removetips: function(id) {
		var elembox = $('#'+ id);
		var elemcont = $('span', elembox);
		elemcont.html('');
		elembox.hide();
		$('#' + id + 'not').show();
	},
	settips: function(id, tiptxt) {
		var elembox = $('#'+ id);
		var elemcont = $('span', elembox);
		elemcont.html(tiptxt);
		elembox.show();
		$('#' + id + 'not').hide();
	}
};