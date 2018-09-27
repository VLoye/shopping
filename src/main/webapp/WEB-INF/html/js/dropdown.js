/**
	 @Name：hayui.ddcheckbox 【下拉树形框】
	 @Author：hallelujah
	 */
hayui.define(['jquery', 'form'], function(exports) {
	"use strict";

	var $ = hayui.$,
		MOD_NAME = 'dropdown',
		form = hayui.form,
		hint = hayui.hint();

	var ddPANEL = 'dropdown-panel';

	var hide = function(e, b) {
		var Cls = 'hayui-dropdowned';
		if ((e && e.target && !$(e.target).parent().hasClass(Cls)) || b) {
			$('.' + Cls).removeClass('hayui-dropdowned');
		}
	};

	//Class struct
	var Dropdown = function(options) {
		var that = this;
		that.config = $.extend({}, that.config, Dropdown.config, options);
	};

	//global set
	Dropdown.prototype.set = function(options) {
		var that = this;
		$.extend(true, that.config, options);
		return that;
	};

	//config
	Dropdown.prototype.config = {
		elem: '',
		readonly: true,
		disabled:false,
		width: '', //宽度不指定则可自适应
		height: '',
		data: {},
		hinge: {
			startkey: 0, //第一层级的key
			showidxs: ['%'], //数组，最后一个参数缺省，则取最后一级，否则取指定级.  ['%', int]:只取指定的层级， ['+', int， int]:取指定的两级，['-', int， int]:取指定的两级之间的所有级包括指定的两级
			residxs: ['+', 0] //同showidxs
		},
		callback: null
	};

	Dropdown.prototype.init = function() {
		var that = this,
			opts = that.config,
			target = $(opts.elem),
			div = null,
			input = null;

		if (target.is('div')) {

			div = target;

			input = target.find(':text:first');

		} else if (target.is(':text')) {

			div = target.parent();

			input = target;

		}

		//添加 hayui-dropdown 类
		div.addClass('hayui-dropdown');

		//设置文本框为只读
		if (opts.readonly) {

			input.attr('readonly', 'readonly');

		}

		//设置文本框禁用
		if (opts.disabled) {

			input.attr('disabled', 'disabled').addClass('hayui-disabled');
			return false;
		}

		function load(bool) {

			// 获取组件对象，通过其长度判断是否已加载
			var box = $('div.hayui-dropdown-box', div);

			if (box.length === 0) { //尚未加载

				// 创建前先隐藏或清除其他组件
				form.hideDDUI();

				// 创建 html标签
				var html = '<div class="hayui-dropdown-box hayui-anim hayui-anim-upbit">' +
					'<div class="options ' + ddPANEL + '">' +
					'<div class="dropdown-cont" hay-filter="ddcont">' +
					'</div>' +
					'</div>' +
					'</div>';
				box = $(html);

				// 添加到文档流中
				div.append(box.on('click', function(e) {
					//阻止事件冒泡
					e.stopPropagation();
				})).css('z-index', 101).addClass('hayui-dropdowned');

				that.setbodyhtml(opts.hinge.startkey);
			} else { //已加载

				if (box.is(':visible')) {

					div.css('z-index', '').removeClass('hayui-dropdowned');

				} else {

					//弹出前先隐藏或清除其他 ui 组件
					form.hideDDUI();
					div.css('z-index', 101).addClass('hayui-dropdowned');
				}
			}
		}

		//组件点击事件
		div.unbind('click').click(function(e) {
			load();
			e.stopPropagation();
		});

		$(document).off('click', hide).on('click', hide);
	};

	Dropdown.prototype.bindevent = function() {
		var that = this,
			opts = that.config,
			target = $(opts.elem);
		$('[hay-filter="ddul"]', target).undelegate().delegate('[hay-filter="ddli"]', 'click', function() {
			var li = $(this);
			var txt = li.data('txt');
			var pcode = li.data('pcode');
			var code = li.data('code');

			li.parents('[hay-filter="ddbox"]').nextAll().remove();

			li.addClass('checked').siblings().removeClass('checked');

			if (that.ishaschild(code)) {
				that.setbodyhtml(code);
			} else {
				that.setresult();
			}

		});
	};

	Dropdown.prototype.bodyhtml = function(keycode) {
		var that = this;
		var data = that.config.data;

		if (data) {
			var items = $.isNumeric(keycode) ? data[keycode] : null;
			if (items) {
				var html = [];
				$.each(items, function(code, txt) {
					html.push('<li data-item="{key:\'' + code + '\', val:\'' + txt + '\'}" data-pcode="' + keycode + '" data-code="' + code + '" data-txt="' + txt + '" hay-filter="ddli"><a>' + txt + '</a>' + (that.ishaschild(code) ? '<i class="icon-r"></i>' : '') + '</li>');
				});
				return '<div class="dd-box" hay-filter="ddbox"><ul class="db-ul" hay-filter="ddul">' + html.join('') + '</ul></div>';
			}
		}
		return [];
	};

	Dropdown.prototype.setbodyhtml = function(keycode) {
		var that = this,
			opts = that.config,
			target = $(opts.elem);

		var html = that.bodyhtml(keycode);
		if (html.length) {
			$('[hay-filter="ddcont"]', target).append(html);

			that.setwidth();
			that.bindevent();
		}
	};


	Dropdown.prototype.setwidth = function() {
		var that = this,
			opts = that.config,
			target = $(opts.elem);

		var panel = $('.' + ddPANEL, target);

		var itembox = $('[hay-filter="ddbox"]', panel);
		var itemwidth = itembox.outerWidth(true);

		panel.css({
			width: opts.width || itemwidth * itembox.length,
			height: opts.height
		});
	};


	Dropdown.prototype.ishaschild = function(keycode) {
		var that = this;
		var data = that.config.data;
		if (data) {
			return $.isNumeric(keycode) ? data[keycode] : null;
		}
		return false;
	};

	Dropdown.prototype.setresult = function(result) {
		var that = this,
			opts = that.config,
			target = $(opts.elem);

		var getresult = function(show) {
			var mark = show[0];
			var start = show[1];
			var end = show[2];

			var text = [];
			var code = [];
			var checked = $('[hay-filter="ddli"].checked', target);
			end = end > -1 ? end : checked.length - 1;

			checked.each(function(ix, el) {
				var chk = $(el);

				if (mark == '-') {
					if (ix >= start && ix <= end) {
						text.push(chk.data('txt'));
						code.push(chk.data('code'));
					}
				} else if (mark == '+') {
					if (ix == start || ix == end) {
						text.push(chk.data('txt'));
						code.push(chk.data('code'));
					}
				} else if (mark == '%') {
					start = start > -1 ? start : checked.length - 1;
					if (ix == start) {
						text.push(chk.data('txt'));
						code.push(chk.data('code'));
					}
				}
			});


			return {
				text: text,
				code: code
			};
		};

		var text = getresult(opts.hinge.showidxs).text;
		var code = getresult(opts.hinge.residxs).code;

		//文本框赋值
		$(':text', target).val(text.join(','));
		$(':hidden', target).val(code.join(','));

		//回调函数
		if (opts.callback && typeof opts.callback === 'function') {
			opts.callback(target, text, code);
		}

		//hide
		hide('', true);
	};

	//暴露接口
	exports(MOD_NAME, function(config) {
		var dropdown = new Dropdown(config = config || {});
		var elem = $(config.elem);
		if (!elem[0]) {
			return hint.error('hayui.dropdown 没有找到' + config.elem + '元素');
		}
		dropdown.init();
	});
}).addcss('modules/dropdown.css', 'skindropdowncss');