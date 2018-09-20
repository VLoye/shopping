/**
 @Name：hayui.elemtips 【元素提示插件】
 @Author：hallelujah
 */
/****************************************
 **** elem: tips flow element
 **** flag: mark of this tips
 **** cont: tips content
 **** oClass: class name
 **** oStyle: inline style
 **** bgcolor: background color
 **** oCss: object type inline style
 **** size: width and height
 **** postion: left or right or top or bottom //['L','R','T','B']
 **** apart: customer apart
 **** time: auto close time
 ****isShowClose: is show close btn or not
 **** isAutoClose: is auto close or not
 **** isShowArrow:is show arrow or not
 ****************************************/
hayui.define(['jquery','actualsize'], function(exports) {
	"use strict";

	var $ = hayui.$,
		actualsize = hayui.actualsize,
		MOD_NAME = 'elemtips';

	var share = {};

	//get parent position element
	share.getParentPositionElement = function(n){
		var ele = (function(n) {
			while (!n.css('position')  || n.css('position') == 'static') {
				n = n.parent();
			}
			return n;
		})(n);
		return ele;
	};

	//get element location
	share.getEleLocation = function(n) {
		var b = [];
		b.x = n.offset().left;
		b.y = n.offset().top;
		for (b.y = n.offset().top; n = n.offset().parent;){
			b.x += n.offset().left;
			b.y += n.offset().top;
		}
		return b;
	};

	//get hidden element parent on visibled
	share.getVisibledElement = function(n) {
		var ele = (function(n) {
			while (n.is(':hidden')) {
				n = n.parent();
			}
			return n;
		})(n);
		return ele;
	};

	//get element relative location
	share.getElemRelativeLocation = function(n){
		var p = share.getParentPositionElement(n);
		var pb = share.getEleLocation(p);
		var nb = share.getEleLocation(n);
		var b = [];
		b.x = nb.x - pb.x;
		b.y = nb.y - pb.y;
		return b;
	};

	//get last element tipsbox idx
	share.getLastElemTipsIdx = function(){
		var tipsBox = $('[isFlowElemTips="true"]');
		var idx = 0;
		if(tipsBox.length){
			$.each(tipsBox, function(ix, item) {
				var last = $(item).attr('data-elemtips-last');
				last = parseInt(last, 10);
				if(last > idx){
					idx = last;
				}
			});
		}
		return idx;
	};

	//get tip box position
	share.getTipPosition = function(n, t, o) {

		var b = share.getElemRelativeLocation(share.getVisibledElement(n));
		var nH = n.outerHeight(true);
		var nW = n.outerWidth(true);
		var tH = t.outerHeight(true);
		var tW = t.outerWidth(true);

		var aT = nH > tH ? (nH - tH) : (tH - nH);
		var aL = nW > tW ? (nW - tW) : (tW - nW);

		if(t.parents().is(n) && o.isRepos){
			b.x -= 1;
			b.y -= 1;
		}

		var pos = {};
		switch (o.postion) {
			case 'RC':
				pos.top = b.y + aT / 2 + o.apart.y;
				pos.left = b.x + nW + o.apart.x;
				break;
			case 'RT':
				pos.top = b.y + o.apart.y;
				pos.left = b.x + nW + o.apart.x;
				break;
			case 'RB':
				pos.top = b.y + aT + o.apart.y;
				pos.left = b.x + nW + o.apart.x;
				break;
			case 'LC':
				pos.top = b.y + aT / 2 + o.apart.y;
				pos.left = b.x - tW + o.apart.x;
				break;
			case 'LT':
				pos.top = b.y + o.apart.y;
				pos.left = b.x - tW + o.apart.x;
				break;
			case 'LB':
				pos.top = b.y + aT + o.apart.y;
				pos.left = b.x - tW + o.apart.x;
				break;
			case 'TC':
				pos.top = b.y - tH + o.apart.y;
				pos.left = b.x + aL / 2 + o.apart.x;
				break;
			case 'TL':
				pos.top = b.y - tH + o.apart.y;
				pos.left = b.x + o.apart.x;
				break;
			case 'TR':
				pos.top = b.y - tH + o.apart.y;
				pos.left = b.x + aL + o.apart.x;
				break;
			case 'BC':
				pos.top = b.y + nH + o.apart.y;
				pos.left = b.x + aL / 2 + o.apart.x;
				break;
			case 'BL':
				pos.top = b.y + nH + o.apart.y;
				pos.left = b.x + o.apart.x;
				break;
			case 'BR':
				pos.top = b.y + nH + o.apart.y;
				pos.left = b.x + aL + o.apart.x;
				break;
			default:
				break;
		}
		return pos;
	};

	//get arrow html
	share.getArrow = function(t, o) {
		var box = $('<div></div>');
		var arrow = $('<i></i>');
		arrow.css({
			display: 'inline-block',
			width: 0,
			height: 0,
			'border-width': '5px',
			'border-style': 'solid',
			'border-color': 'transparent',
			overflow: 'hidden',
			'position': 'absolute'
		});
		var c = {};
		switch (o.postion.substring(0, 1)) {
			case 'R':
				c = {
					'border-left': 0,
					'border-right-color': o.bgcolor,
					'left': '-5px',
					'top': (t.outerHeight(true) - 10) / 2
				};
				break;
			case 'L':
				c = {
					'border-right': 0,
					'border-left-color': o.bgcolor,
					'right': '-5px',
					'top': (t.outerHeight(true) - 10) / 2
				};
				break;
			case 'T':
				c = {
					'border-bottom': 0,
					'border-top-color': o.bgcolor,
					'bottom': '-5px',
					'left': (t.outerWidth(true) - 10) / 2
				};
				break;
			case 'B':
				c = {
					'border-top': 0,
					'border-bottom-color': o.bgcolor,
					'top': '-5px',
					'left': (t.outerWidth(true) - 10) / 2
				};
				break;
			default:
				break;
		}
		box.html(arrow.css(c));
		return box.html();
	};

	//get tips html
	share.getTipsHtml = function(o, n) {
		var tipsBox = $('[isFlowElemTips="true"]');
		var i = share.getLastElemTipsIdx();
		var ei = n.attr('data-elemtips');
		if (ei == undefined) {
			ei = i;
			n.attr({
				'data-elemtips': ei
			});
			var np = share.getParentPositionElement(n);
			np.attr({
				'data-elemtips-box': ei
			});
			$('[data-elemtips-box="'+ ei +'"]').append('<div isFlowElemTips="true" id="elemTips_' + o.flag + '_' + i + '" data-elemtips-last="' + (parseInt(i, 10) + 1) + '"></div>');
		}
		var tip = $('#elemTips_' + o.flag + '_' + ei);
		return [parseInt(ei, 10), tip];
	};

	share.show = function(n, t, o){
		t.addClass(o.oClass).attr({
			style: o.oStyle
		}).css({
			display: 'none',
			background: o.bgcolor,
			padding: '1px 10px',
			position: 'absolute'
		}).css(o.oCss);

		var pos = share.getTipPosition(n, t, o);
		t.css({
			top: pos.top + 'px',
			left: pos.left + 'px'
		});
		t.html(o.cont);

		var size = [];
		size.w = o.size.w > 0 ? o.size.w : actualsize.actual('outerWidth', {elem:t}) + 0.5;
		size.h = o.size.h > 0 ? o.size.h :  actualsize.actual('outerHeight', {elem:t});

		t.css({
			width: size.w > 0 ? size.w : 'auto',
			height: size.h > 0 ? size.h : 'auto'
		});

		if (o.isShowArrow) {
			t.append(share.getArrow(t, o));
		}

		if (o.isShowClose) {
			var close = $('<span isFTClose="true">x</span>');
			close.css({
				'margin-left': '10px',
				'cursor': 'pointer',
				'font-size': '14px'
			});
			t.append(close);
		}

		var bool = o.beforeShow(n, t);
		if (bool) {
			t.css({
				'display': 'inline-block'
			});
		}

		if (o.isShowClose) {
			$('[isFTClose="true"]', t).bind({
				click: function() {
					t.remove();
					o.afterClose(n, t);
				}
			});
		}

		if (o.isAutoClose) {
			var time = [];
			time[i] && window.top.clearTimeout(time[i]);
			time[i] = window.top.setTimeout(function() {
				t.remove();
				o.afterClose(n, t);
			}, o.time);
		}

		$(window).on('scroll', function() {

			pos = share.getTipPosition(n, t, o);
			t.css({
				'top': pos.top + 'px',
				'left': pos.left + 'px'
			});

		}).resize(function() {

			pos = share.getTipPosition(n, t, o);
			t.css({
				'top': pos.top + 'px',
				'left': pos.left + 'px'
			});

		});
	};

	var elemtips = {
		config: {},
		set: function(options) {
			var that = this;
			that.config = $.extend({}, that.config, options);
			return that;
		}
	};

	//Class struct
	var Class = function(options) {
		var that = this;
		that.config = $.extend({}, that.config, elemtips.config, options);
	};

	//global set
	Class.prototype.set = function(options) {
		var that = this;
		$.extend(true, that.config, options);
		return that;
	};

	//config
	Class.prototype.config = {
		elem: '',
		flag: 'hay-xj',
		cont: '这是一个提示语!',
		oClass: 'hayui-elemtips',
		oStyle: '',
		bgcolor: '#16960E',
		oCss: {
			color: '#FFF',
			'z-index': 99
		},
		size: {
			w: 0,
			h: 0
		},
		postion: 'B',
		apart: {
			x: 0,
			y: 0
		},
		time: 3000,
		isShowClose: false,
		isAutoClose: false,
		isShowArrow: false,
		isRepos:false,
		beforeShow: function(n, tip) {
			return true;
		},
		afterClose: function(n, tip) {}
	};

	Class.prototype.remove = function() {
		var that = this,
			o = that.config,
			n = o.elem;

		var tipinfo = share.getTipsHtml(o, n);
		var tip = tipinfo[1];
		tip.remove();
		n.removeAttr('data-elemtips');

		var np = share.getParentPositionElement(n);
		np.removeAttr('data-elemtips-box');
		return that;
	};

	Class.prototype.render = function() {
		var that = this,
			o = that.config,
			n = o.elem;

		var tipinfo = share.getTipsHtml(o, n);
		var doc = [];

		var i = tipinfo[0];
		doc[i] = tipinfo[1];
		share.show(n, doc[i], o);
		return that;
	};

	//core enter
	elemtips.tips = function(options) {
		var inst = new Class(options);
		return inst.render();
	};

	elemtips.removetips = function(options) {
		var inst = new Class(options);
		return inst.remove();
	};

	exports(MOD_NAME, elemtips);
});