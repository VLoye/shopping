/*!
 @Title: Hay-ui core
 @Description：【页面固定位置显示块】
 @Site: www.Hay-ui.com
 @Author: hallelujah
 */

hayui.define(['jquery', 'form'], function(exports) {
	"use strict";

	var $ = hayui.$,
		MOD_NAME = 'fixedlocation',
		form = hayui.form,
		hint = hayui.hint();

	//Class struct
	var Fixedlocation = function(options) {
		var that = this;
		that.config = $.extend({}, that.config, Fixedlocation.config, options);
	};

	//global set
	Fixedlocation.prototype.set = function(options) {
		var that = this;
		$.extend(true, that.config, options);
		return that;
	};

	//config
	Fixedlocation.prototype.config = {
		location: 'CR', //定义位置,若要使用cusDefined属性,请设置此属性值为空
		cusDefined: {
			pos: 'lb',
			unFixed: '',
			left: 10,
			bottom: 10
		}, //定义自定义位置{位置属性缩写(lt,lb,rt,rb),位置1,位置2}
		apartTop: 0, //定义距离顶部的距离
		apartBottom: 0, //定义距离底部的距离
		apartLeft: 0, //定义距离左侧的距离
		apartRight: 0, //定义距离右侧的距离
		isTogHide: 'r', //定义是否有显示隐藏
		backFun: null, //完成定位执行的方法
		onScrollFun: null, //定义当窗口滚动时的回调方法
		onResizeFun: null //定义当窗口大小改变时的回调方法

	};


	//判断是否是ie6以下版本
	Fixedlocation.prototype.isIe6 = function() {
		//【jQuery1.8以下版本支持此写法判断ie6】
		return ($.browser.msie && ($.browser.version <= '6.0') && !$.support.style);
	};
	//获取当前窗口距离页面顶部高度
	Fixedlocation.prototype.getScrolltop = function() {
		if (window.pageYOffset) {
			return window.pageYOffset;
		} else if (document.compatMode && document.compatMode != 'BackCompat') {
			return document.documentElement.scrollTop;
		} else if (document.body) {
			return document.body.scrollTop;
		}
		return 0;
	};
	//获取当前窗口距离页面顶部高度
	Fixedlocation.prototype.getScrollleft = function() {
		if (window.pageXOffset) {
			return window.pageXOffset;
		} else if (document.compatMode && document.compatMode != 'BackCompat') {
			return document.documentElement.scrollLeft;
		} else if (document.body) {
			return document.body.scrollLeft;
		}
		return 0;
	};
	//当前浏览器窗口的宽
	Fixedlocation.prototype.getScreenWidth = function() {
		return parseInt($(window).width(), 10);
	};
	//当前屏幕的高
	Fixedlocation.prototype.getScreenHeight = function() {
		return parseInt($(window).height(), 10);
	};
	//计算top
	Fixedlocation.prototype.getObjTopT = function(t) {
		var that = this;
		return that.getScreenHeight() - that.getObjHeight(t);
	};
	//计算top
	Fixedlocation.prototype.getObjTopC = function(t) {
		var that = this;
		return (that.getScreenHeight() - that.getObjHeight(t)) / 2;
	};
	Fixedlocation.prototype.getObjTopL = function(t) {
		var that = this;
		return (that.getScreenWidth() - that.getObjWidth(t)) / 2;
	};
	//当前屏幕的高
	Fixedlocation.prototype.getObjWidth = function(t) {
		return t.width();
	};
	//当前屏幕的高
	Fixedlocation.prototype.getObjHeight = function(t) {
		return t.height();
	};
	//设置定位样式
	Fixedlocation.prototype.setCss = function(t, o) {
		var that = this;
		t.css({
			'position': that.isIe6() ? 'absolute' : 'fixed'
		});
	};
	//设置位置
	Fixedlocation.prototype.setLocation = function(t, o) {
		var that = this;

		that.locationSwitch(t, o);

		//鼠标滚动
		$(window).scroll(function(event) {

			that.locationSwitch(t, o);

			if (o.onScrollFun != null && typeof o.onScrollFun === 'function') {
				o.onScrollFun(t, that.isIe6());
			}

			//改变窗口大小
		}).resize(function() {

			that.locationSwitch(t, o);

			if (o.onResizeFun != null && typeof o.onResizeFun === 'function') {
				o.onResizeFun(t, that.isIe6());
			}

		});
	};
	//set diffent location
	Fixedlocation.prototype.locationSwitch = function(t, o) {
		var that = this;

		var css = {},
			top = 0,
			right = 0,
			left = 0,
			bottom = 0;

		//recorde value
		var tct = t.css('top');
		var tcb = t.css('bottom');
		var tcl = t.css('left');
		var tcr = t.css('right');

		switch (o.location) {

			case 'TR': //top-right
				css.top = (that.isIe6() ? that.getScrolltop() : 0) + o.apartTop;
				css.right = 0 + o.apartRight;
				break;

			case 'CR': //center-right
				css.top = (that.isIe6() ? that.getObjTopC(t) + that.getScrolltop() : that.getObjTopC(t)) + o.apartTop;
				css.right = 0 + o.apartRight;
				break;

			case 'BR': //bottom-right
				css.top = (that.isIe6() ? that.getObjTopT(t) + that.getScrolltop() : that.getObjTopT(t)) + o.apartBottom;
				css.right = 0 + o.apartRight;
				break;

			case 'LT': //left-top
				css.top = (that.isIe6() ? that.getScrolltop() : 0) + o.apartTop;
				css.left = 0 + o.apartLeft;
				break;

			case 'LC': //left-center
				css.top = (that.isIe6() ? that.getObjTopC(t) + that.getScrolltop() : that.getObjTopC(t)) + o.apartTop;
				css.left = 0 + o.apartLeft;
				break;

			case 'LB': //left-bottom
				css.top = (that.isIe6() ? that.getObjTopT(t) + that.getScrolltop() : that.getObjTopT(t)) + o.apartBottom;
				css.left = 0 + o.apartLeft;
				break;

			case 'TC': //top-center
				css.top = (that.isIe6() ? that.getScrolltop() : 0) + o.apartTop;
				css.left = that.getObjTopL(t);
				break;

			case 'BC': //bottom-center
				css.top = (that.isIe6() ? that.getObjTopT(t) + that.getScrolltop() : that.getObjTopT(t)) + o.apartBottom;
				css.left = that.getObjTopL(t);
				break;

			default: //customer-defined
				switch (o.cusDefined.pos) {

					case 'rt': //right-top
						css.right = (o.cusDefined.right != 'undefined' ? o.cusDefined.right + o.apartRight : '');
						css.top = (o.cusDefined.top != 'undefined' ? o.cusDefined.top + o.apartTop : '');
						break;

					case 'rb': //right-bottom
						css.right = (o.cusDefined.right != 'undefined' ? o.cusDefined.right + o.apartRight : '');
						css.top = (o.cusDefined.bottom != 'undefined' ? o.apartBottom + that.getObjTopT(t) - o.cusDefined.bottom : '');
						break;

					case 'lt': //left-top
						css.left = (o.cusDefined.left != 'undefined' ? o.cusDefined.left + o.apartLeft : '');
						css.top = (o.cusDefined.top != 'undefined' ? o.cusDefined.top + o.apartTop : '');
						break;

					case 'lb': //left-bottom
						css.left = (o.cusDefined.left != 'undefined' ? o.cusDefined.left + o.apartLeft : '');
						css.top = (o.cusDefined.bottom != 'undefined' ? o.apartBottom + that.getObjTopT(t) - o.cusDefined.bottom : '');
						break;
					default:
						break;
				}

				switch (o.cusDefined.unFixed) {
					case 't':
						css.top -= that.getScrolltop();
						break;
					case 'r':
						css.right -= that.getScrollleft();
						break;
					case 'b':
						css.top -= that.getScrolltop();
						break;
					case 'l':
						css.left -= that.getScrollleft();
						break;
					default:
						break;
				}

				if (that.isIe6()) { //ie6 add scrolltop
					css.top += ((o.cusDefined.top != 'undefined' || o.cusDefined.bottom != 'undefined') ? that.getScrolltop() : '');
				}
				break;
		};

		//is toggle hide
		if (o.isTogHide) {
			switch (o.isTogHide) {
				case 't':
					css.top = tct;
					break;
				case 'b':
					css.bottom = tcb;
					break;
				case 'l':
					css.left = tcl;
					break;
				case 'r':
					css.right = tcr;
					break;
				default:
					break;
			}
		}

		//set position
		that.setCss(t, o);

		//add css
		t.css(css);
		//add animate
		t.stop().animate(css, 0, function() {
			if (o.backFun != null && typeof o.backFun === 'function') {
				o.backFun(t, that.isIe6());
			}
		});
	};

	Fixedlocation.prototype.init = function() {
		var that = this,
			opts = that.config,
			target = $(opts.elem);

		that.setLocation(target, opts);
		return that;
	};

	//暴露接口
	exports(MOD_NAME, function(config) {
		var fixedlocation = new Fixedlocation(config = config || {});
		var elem = $(config.elem);
		if (!elem[0]) {
			return hint.error('hayui.fixedlocation 没有找到' + config.elem + '元素');
		}
		return fixedlocation.init();
	});
});



!(function($) {
	var f = {

	};

	$.fn.fixedLocation = function(o) {

		o = $.extend({}, {


		}, o);

		return this.each(function() {



		});
	};
})(jQuery);