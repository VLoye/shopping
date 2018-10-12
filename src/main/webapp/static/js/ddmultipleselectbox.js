/**
	 @Name：hayui.ddcheckbox 【下拉树形框】
	 @Author：hallelujah
	 */
hayui.define(['jquery', 'form'], function(exports) {
	"use strict";

	var $ = hayui.$,
		MOD_NAME = 'ddmultipleselectbox',
		form = hayui.form,
		hint = hayui.hint();

	var ddPANEL = 'ddmultipleselectbox-panel';

	var hide = function(e, b) {
		var Cls = 'hayui-ddmultipleselectboxed';
		if ((e && e.target && !$(e.target).parent().hasClass(Cls)) || b) {
			$('.' + Cls).removeClass('hayui-ddmultipleselectboxed');
		}
	};

	//Class struct
	var Ddmultipleselectbox = function(options) {
		var that = this;
		that.config = $.extend({}, that.config, Ddmultipleselectbox.config, options);
	};

	//global set
	Ddmultipleselectbox.prototype.set = function(options) {
		var that = this;
		$.extend(true, that.config, options);
		return that;
	};

	//config
	Ddmultipleselectbox.prototype.config = {
		elem: '',
		readonly: true,
		disabled: false,
		width: '', //宽度不指定则可自适应
		height: '',
		data: '',
		resultbox: '#resultbox',
		callback: null
	};

	Ddmultipleselectbox.prototype.initassign = function() {
		var that = this,
			opts = that.config,
			target = $(opts.elem);
		var text = $(':hidden[data-res="text"]', target).val();
		var code = $(':hidden[data-res="code"]', target).val();
		return {
			text: text.length ? text.split(',') : [],
			code: code.length ? code.split(',') : [],
		};
	};

	Ddmultipleselectbox.prototype.isSelected = function(code) {
		var that = this;
		var checked = that.initassign();
		return $.inArray(code, checked.code) != -1;
	};

	Ddmultipleselectbox.prototype.binddelresult = function() {
		var that = this,
			opts = that.config,
			target = $(opts.elem),
			resultbox = target.next(opts.resultbox);

		resultbox.undelegate().delegate('[data-res="del"]', 'click', function() {
			var t = $(this);
			var tp = t.parent();

			var code = tp.data('code');
			var text = tp.data('text');

			that.delresult(text, code);
			tp.remove();
		});
	};

	Ddmultipleselectbox.prototype.delresult = function(text, code) {
		var that = this,
			opts = that.config,
			target = $(opts.elem);
		var checked = that.initassign();

		checked.code.splice($.inArray(code.toString(), checked.code), 1);
		checked.text.splice($.inArray(text.toString(), checked.text), 1);
		that.setresultvalue(checked);
		$('[data-code="' + code + '"]', target).removeClass('selected');
	};


	Ddmultipleselectbox.prototype.init = function() {
		var that = this,
			opts = that.config,
			target = $(opts.elem),
			div = null,
			input = null;

		var textcode = that.initassign();
		that.setresultHtml(textcode.text, textcode.code);

		if (target.is('div')) {

			div = target;

			input = target.find(':text:first');

		} else if (target.is(':text')) {

			div = target.parent();

			input = target;

		}

		//添加 hayui-ddmultipleselectbox 类
		div.addClass('hayui-ddmultipleselectbox');

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
			var box = $('div.hayui-ddmultipleselectbox-box', div);

			if (box.length === 0) { //尚未加载

				// 创建前先隐藏或清除其他组件
				form.hideDDUI();

				// 创建 html标签
				var html = '<div class="hayui-ddmultipleselectbox-box hayui-anim hayui-anim-upbit">' +
					'<div class="options ' + ddPANEL + '">' +
					'<div class="ddmultipleselectbox-cont" hay-filter="ddcont">' +
					'</div>' +
					'</div>' +
					'</div>';
				box = $(html);

				// 添加到文档流中
				div.append(box.on('click', function(e) {
					//阻止事件冒泡
					e.stopPropagation();
				})).css('z-index', 101).addClass('hayui-ddmultipleselectboxed');

				that.setbodyhtml(opts.hinge.startkey);
			} else { //已加载

				if (box.is(':visible')) {

					div.css('z-index', '').removeClass('hayui-ddmultipleselectboxed');

				} else {

					//弹出前先隐藏或清除其他 ui 组件
					form.hideDDUI();
					div.css('z-index', 101).addClass('hayui-ddmultipleselectboxed');
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

	Ddmultipleselectbox.prototype.bindevent = function() {
		var that = this,
			opts = that.config,
			target = $(opts.elem);
		$('[hay-filter="ddbox"]', target).undelegate().delegate('[hay-filter="ddli"]:not(.disabled):not(.selected)', 'click', function() {
			var li = $(this);
			var txt = li.data('txt');
			var pcode = li.data('pcode');
			var code = li.data('code');

			li.addClass('checked selected').siblings().removeClass('checked');

			if (that.ishaschild(code)) {

			} else {
				that.setresult();
			}
		});
	};

	Ddmultipleselectbox.prototype.bodyhtml = function(keycode) {
		var that = this;
		var data = that.config.data;

		if (data) {
			var items = $.isNumeric(keycode) ? data[keycode] : null;
			if (items) {
				var html = [];
				$.each(items, function(code, txt) {
					var child = {};
					html.push('<dt class="' + (that.ishaschild(code) ? 'disabled' : '') + (that.isSelected(code) ? ' selected' : '') + '" data-item="{key:\'' + code + '\', val:\'' + txt + '\'}" data-pcode="' + keycode + '" data-code="' + code + '" data-txt="' + txt + '" hay-filter="ddli"><a>' + txt + '</a></dt>');
					if (that.ishaschild(code)) {
						child = data[code];

						if (child) {
							$.each(child, function(code1, txt1) {
								html.push('<dd class="' + (that.isSelected(code1) ? ' selected' : '') + '" data-item="{key:\'' + code1 + '\', val:\'' + txt1 + '\'}" data-pcode="' + code + '" data-code="' + code1 + '" data-txt="' + txt1 + '" hay-filter="ddli"><a>' + txt1 + '</a></dd>');
							});
						}
					}
				});
				return '<div class="dd-box" hay-filter="ddbox"><dl class="db-dl" hay-filter="ddul">' + html.join('') + '</dl></div>';
			}
		}
		return '';
	};

	Ddmultipleselectbox.prototype.setbodyhtml = function(keycode) {
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

	Ddmultipleselectbox.prototype.setwidth = function() {
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

	Ddmultipleselectbox.prototype.ishaschild = function(keycode) {
		var that = this;
		var data = that.config.data;
		if (data) {
			return $.isNumeric(keycode) ? data[keycode] : null;
		}
		return false;
	};

	Ddmultipleselectbox.prototype.setresult = function() {
		var that = this,
			opts = that.config,
			target = $(opts.elem),
			resultbox = target.next(opts.resultbox);

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

		var checked = that.initassign();
		checked.text.push(text);
		checked.code.push(code);

		that.setresultvalue(checked);
		that.setresultHtml(text, code);

		//回调函数
		if (opts.callback && typeof opts.callback === 'function') {
			opts.callback(target, text, code);
		}

		//hide
		hide('', true);
	};

	Ddmultipleselectbox.prototype.setresultvalue = function(checked) {
		var that = this,
			opts = that.config,
			target = $(opts.elem);
		//文本框赋值
		$(':hidden[data-res="text"]', target).val(checked.text.join(','));
		$(':hidden[data-res="code"]', target).val(checked.code.join(','));

	};

	Ddmultipleselectbox.prototype.setresultHtml = function(text, code) {
		var that = this,
			opts = that.config,
			target = $(opts.elem),
			resultbox = target.next(opts.resultbox);
		var reshtml = [];

		$.each(code, function(idx, cod) {
			reshtml.push('<a class="res-item" data-code="' + cod + '" data-text="' + text[idx] + '">' + text[idx] + '<i class="hayui-icon hayui-icon-close2 item-del" data-res="del"></i></a>');
		});
		resultbox.addClass('ddmultipleselectbox-result-box').append(reshtml.join(''));

		that.binddelresult();
		return that;
	};

	//暴露接口
	exports(MOD_NAME, function(config) {
		var ddmultipleselectbox = new Ddmultipleselectbox(config = config || {});
		var elem = $(config.elem);
		if (!elem[0]) {
			return hint.error('hayui.ddmultipleselectbox 没有找到' + config.elem + '元素');
		}
		ddmultipleselectbox.init();
	});
}).addcss('modules/ddmultipleselectbox.css', 'skinddmultipleselectboxcss');