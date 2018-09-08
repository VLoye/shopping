/**
@Name：hayui.selectcate【会员后台导航 服务 菜单下拉】
@Author：hallelujah
*/
var topservicedata = {
	htmlCont: [{
			text: '纠错管理',
			title: '纠错管理',
			icon: 'qsi-jc',
			url: 'http://mall.qipeiren.com/Complaint/ComplaintListReceive',
			target: '_blank'
		},
		// { text: '投诉管理', title: '投诉管理', icon: 'qsi-ts', url: 'http://s.qipeiren.com/ErrorRecovery/ErrorRecoveryListReceive', target: ''},
		// { text: '旺铺优化建议', title: '旺铺优化建议', icon: 'qsi-zd', url: 'http://data.qipeiren.com/plugins/wangpu', target: ''},
		// { text: '五星产品罗盘', title: '五星产品罗盘', icon: 'qsi-lp', url: 'http://data.qipeiren.com/plugins/prostar', target :''},
		// { text: '店铺分析', title: '店铺分析', icon: 'qsi-fx', url: '', target: ''},
		{
			text: '生意参谋',
			title: '生意参谋',
			icon: 'qsi-cm',
			url: 'http://data.qipeiren.com/flow/flowsummary',
			target: '_blank'
		},
		{
			text: '专场活动',
			title: '专场活动',
			icon: 'qsi-zt',
			url: 'http://mall.qipeiren.com/HuoDong/HuoDongBaoMing',
			target: '_blank'
		},
		{
			text: '优势产品推荐',
			title: '优势产品推荐',
			icon: 'qsi-tj',
			url: 'http://mall.qipeiren.com/Product/ZhudaSupply',
			target: '_blank'
		},
		{
			text: '产品组合营销',
			title: '产品组合营销',
			icon: 'qsi-yx',
			url: 'http://mall.qipeiren.com/Product/GroupSupply',
			target: '_blank'
		},
		{
			text: '图片管家',
			title: '图片管家',
			icon: 'qsi-gj',
			url: 'http://mall.qipeiren.com/image/',
			target: '_blank'
		}
	]
};

hayui.define('jquery', function(exports) {
	"use strict";

	var $ = hayui.$,
		MOD_NAME = 'topservice',
		hint = hayui.hint();

	var STYLE = 'qpr-seller-top-service';

	//selectcate struct
	var Topservice = function(options) {
		var that = this;
		that.config = $.extend({}, that.config, Topservice.config, options);
	};

	//global set
	Topservice.prototype.set = function(options) {
		var that = this;
		$.extend(true, that.config, options);
		return that;
	};

	//config
	Topservice.prototype.config = {
		elem: '[hay-box="service"]', //nav box
		htmlCont: [{
			text: '',
			title: '',
			icon: '',
			url: ''
		}] //show box cont
	};

	Topservice.prototype.init = function() {
		var that = this,
			o = that.config,
			hB = $(o.elem);

		hB.addClass(STYLE);

		//create html
		that.createHtml(hB, o.htmlCont);

		return that;
	};
	Topservice.prototype.createHtml = function(hB) {
		var that = this,
			o = that.config,
			cont = o.htmlCont;

		var scHtml = [];
		$.each(cont, function(idx, item) {
			scHtml.push('<a href="' + item.url + '" title="' + item.title + '"' + (item.target ? ' target="' + item.target + '"' : '') + '>' +
				'<dl class="qi-item">' +
				'<dt><i class="qs-icon ' + item.icon + '"></i></dt>' +
				'<dd><span>' + item.text + '</span></dd>' +
				'</dl>' +
				'</a>');
		});

		var html = '<div class="qsts-in">' +
			'<div class="qi-left">' +
			'<label>我的服务</label>' +
			'</div>' +
			'<div class="qi-right">' + scHtml.join('') + '</div>' +
			'</div>';
		hB.html(html);
		return hB;
	};

	//暴露接口
	exports(MOD_NAME, function(config) {
		var topservice = new Topservice(config = config || {});
		var elem = $(config.elem);
		if (!elem[0]) {
			return hint.error('hayui.topservice 没有找到' + config.elem + '元素');
		}
		return topservice.init();
	});
}).addcss('topservice.css', '', '', 'base', 'leagueradmin/');

//默认自动渲染
hayui.use('topservice', function(topservice) {
	hayui.topservice({
		elem: '[hay-box="service"]',
		htmlCont: topservicedata.htmlCont
	});
});