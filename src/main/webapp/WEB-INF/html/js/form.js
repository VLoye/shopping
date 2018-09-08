/**
 @Name：hayui.form  【表单美化&验证】
 @Author：hallelujah
 */
hayui.define(['elemtips', 'actualsize'], function(exports) {
	"use strict";

	var $ = hayui.$,
		elemtips = hayui.elemtips,
		hint = hayui.hint(),
		device = hayui.device(),
		actualsize = hayui.actualsize,

		MOD_NAME = 'form',

		ELEM = '.hayui-form',
		THIS = 'hayui-this',
		SHOW = 'hayui-show',
		HIDE = 'hayui-hide',
		DISABLED = 'hayui-disabled',
		DANGER = 'hayui-form-danger';

	var form = {
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
		that.config = $.extend({}, that.config, form.config, options);
	};

	Class.prototype.config = {
		verify: {
			required: [
				/[\S]+/, '必填项不能为空'
			],
			phone: [
				/^1\d{10}$/, '请输入正确的手机号'
			],
			fax: [
				/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/, '请输入正确的传真'
			],
			fixedtel: [
				/^0\d{2,3}-\d{7,8}(-\d{1,6})?$/, '请输入正确的固定电话'
			],
			posiNumber: [
				/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, '此项必须为正数！'
			],
			decimal: [
				/^(-?\d+)(\.\d+)?$/, '此项必须是浮点数'
			],
			posiDecimal: [
				/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, '此项必须为大于0的整数 / 小数！'
			],
			nonNegaDecimal: [
				/^\d+(\.\d+)?$/, '此项必须为大于等于0的整数 / 小数！'
			],
			email: [
				/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, '邮箱格式不正确'
			],
			url: [
				/(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/, '链接格式不正确'
			],
			date: [
				/^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/, '日期格式不正确'
			],
			identity: [
				/(^\d{15}$)|(^\d{17}(x|X|\d)$)/, '请输入正确的身份证号'
			],
			image: function(val, item) {
				var itembox = $(item),
					range = itembox.attr('hay-verify-range'),
					inpt = $('input[isinpt="true"]', itembox);

				var values = [];
				inpt.each(function(index, el) {
					var v = $.trim($(el).val());
					if (v.length) {
						values.push(v);
					}
				});
				var valLen = values.length;
				if (range && range.length) {
					range = range.replace('[', '').replace(']', '').split(',');
					range[0] = parseInt(range[0], 10);
					range[1] = parseInt(range[1], 10);
					range[1] = range[1] ? range[1] : $('input[isinpt="true"]:not(disabled)', itembox);
				}
				if (valLen < range[0] || valLen > range[1]) {
					return itembox.attr('hay-verify-tips') || '请上传图片';
				}
			},
			number: function(value) {
				if (!value || isNaN(value)) return '只能填写数字';
			},
			pricerange: function(val, item) {
				var itembox = $(item),
					range = itembox.attr('hay-verify-range'),
					input = $('input[type="text"]', itembox),
					v_1 = input.eq(0).val(),
					v_2 = input.eq(1).val();

				v_1 = v_1 ? parseInt(v_1, 10) : 0;
				v_2 = v_2 ? parseInt(v_2, 10) : 0;
				if (range && range.length) {
					range = range.replace('[', '').replace(']', '').split(',');
					range[0] = parseInt(range[0], 10);
					range[1] = parseInt(range[1], 10);
				}
				if (v_1 > 0 && v_2 > 0 && (v_1 > v_2 || (range && range.length && (v_1 < range[0] || v_2 > range[1])))) {
					return itembox.attr('hay-verify-tips') || '区间值设置不正确';
				}
			},
			checkboxs: function(val, item) {
				var itembox = $(item),
					range = itembox.attr('hay-verify-range'),
					chkedbox = $('input[type="checkbox"]:checked', itembox),
					chkedLen = chkedbox.length;
				if (range && range.length) {
					range = range.replace('[', '').replace(']', '').split(',');
					range[0] = parseInt(range[0], 10);
					range[1] = parseInt(range[1], 10);
					range[1] = range[1] ? range[1] : $('input[type="checkbox"]:not(disabled)', itembox);
				}
				if (chkedLen < range[0] || chkedLen > range[1]) {
					return itembox.attr('hay-verify-tips') || '此栏勾选错误';
				}
			},
			radios: function(val, item) {
				var itembox = $(item),
					range = itembox.attr('hay-verify-range'),
					chkedbox = $('input[type="radio"]:checked', itembox),
					chkedLen = chkedbox.length;

				if (range && range.length) {
					range = range.replace('[', '').replace(']', '').split(',');
					range[0] = parseInt(range[0], 10);
					range[1] = parseInt(range[1], 10);
					range[1] = range[1] ? range[1] : $('input[type="checkbox"]:not(disabled)', itembox);
				}
				if (chkedLen < range[0] || chkedLen > range[1]) {
					return itembox.attr('hay-verify-tips') || '此栏勾选错误';
				}
			}
		}
	};

	//全局设置
	Class.prototype.set = function(options) {
		var that = this;
		$.extend(true, that.config, options);
		return that;
	};

	//验证规则设定
	Class.prototype.verify = function(settings) {
		var that = this;
		$.extend(true, that.config.verify, settings);
		return that;
	};

	//表单事件监听
	Class.prototype.on = function(events, callback) {
		return hayui.onevent.call(this, MOD_NAME, events, callback);
	};


	//表单控件渲染
	Class.prototype.render = function(type, filter, pointfilter) {
		var that = this,
			elemForm = $(ELEM + function() {
				return filter ? ('[hay-filter="' + filter + '"]') : '';
			}()),
			items = {
				//下拉选择框
				select: function() {
					var TIPS = '请选择',
						CLASS = 'hayui-form-select',
						TITLE = 'hayui-select-title',
						NONE = 'hayui-select-none',
						initValue = '',
						thatInput,
						selects = elemForm.find('select' + function() {
							return pointfilter ? ('[hay-filter="' + pointfilter + '"]') : ''
						}()),
						hide = function(e, clear) {
							if (!$(e.target).parent().hasClass(TITLE) || clear) {
								$('.' + CLASS).removeClass(CLASS + 'ed ' + CLASS + 'up');
								thatInput && initValue && thatInput.val(initValue);
							}
							thatInput = null;
						},

						events = function(reElem, disabled, isSearch) {
							var select = $(this),
								title = reElem.find('.' + TITLE),
								input = title.find('input'),
								dl = reElem.find('dl'),
								dds = dl.children('dd');
							if (disabled) return;

							//展开下拉
							var showDown = function() {
									$('dl', reElem).css({
										width: reElem.outerWidth(),
										height: $('dl', reElem).outerHeight(true)
										// $('dl', reElem).outerHeight(true)
									});

									var top = reElem.offset().top + reElem.outerHeight() + 5 - win.scrollTop(),
										dlHeight = dl.outerHeight();
									reElem.addClass(CLASS + 'ed');
									dds.removeClass(HIDE);

									//上下定位识别
									if (top + dlHeight > win.height() && top >= dlHeight) {
										reElem.addClass(CLASS + 'up');
									}
								},
								hideDown = function(choose) {
									reElem.removeClass(CLASS + 'ed ' + CLASS + 'up');
									input.blur();
									//select.trigger('change');

									if (choose) return;

									notOption(input.val(), function(none) {
										if (none) {
											initValue = dl.find('.' + THIS).html();
											input && input.val(initValue);
										}
									});
								};

							//点击标题区域
							title.on('click', function(e) {
								reElem.hasClass(CLASS + 'ed') ? (
									hideDown()
								) : (
									hide(e, true),
									showDown()
								);
								dl.find('.' + NONE).remove();
							});

							//点击箭头获取焦点
							title.find('.hayui-edge').on('click', function() {
								input.focus();
							});

							//键盘事件
							input.on('keyup', function(e) {
								var keyCode = e.keyCode;
								//Tab键
								if (keyCode === 9) {
									showDown();
								}
							}).on('keydown', function(e) {
								var keyCode = e.keyCode;
								//Tab键
								if (keyCode === 9) {
									hideDown();
								} else if (keyCode === 13) { //回车键
									e.preventDefault();
								}
							}).on('blur', function(e) {
								select.trigger('change'); //校验
							});

							//检测值是否不属于select项
							var notOption = function(value, callback, origin) {
								var num = 0;
								hayui.each(dds, function() {
									var othis = $(this),
										text = othis.text(),
										not = text.indexOf(value) === -1;
									if (value === '' || (origin === 'blur') ? value !== text : not) num++;
									origin === 'keyup' && othis[not ? 'addClass' : 'removeClass'](HIDE);
								});
								var none = num === dds.length;
								return callback(none), none;
							};

							//搜索匹配
							var search = function(e) {
								var value = this.value,
									keyCode = e.keyCode;

								if (keyCode === 9 || keyCode === 13 ||
									keyCode === 37 || keyCode === 38 ||
									keyCode === 39 || keyCode === 40
								) {
									return false;
								}

								notOption(value, function(none) {
									if (none) {
										dl.find('.' + NONE)[0] || dl.append('<p class="' + NONE + '">无匹配项</p>');
									} else {
										dl.find('.' + NONE).remove();
									}
								}, 'keyup');

								if (value === '') {
									dl.find('.' + NONE).remove();
								}
							};
							if (isSearch) {
								input.on('keyup', search).on('blur', function(e) {
									thatInput = input;
									initValue = dl.find('.' + THIS).html();
									setTimeout(function() {
										notOption(input.val(), function(none) {
											initValue || input.val(''); //none && !initValue
										}, 'blur');
									}, 200);
								});
							}

							//选择
							dds.on('click', function() {
								var othis = $(this),
									value = othis.attr('hay-value');
								var filter = select.attr('hay-filter'); //获取过滤器

								if (othis.hasClass(DISABLED)) return false;

								if (othis.hasClass('hayui-select-tips')) {
									input.val('');
								} else {
									input.val(othis.text());
									othis.addClass(THIS);
								}

								othis.siblings().removeClass(THIS);
								select.val(value.replace(/&nbsp;/g, '')).data('value', value.replace(/&nbsp;/g, '')).attr('data-value', value.replace(/&nbsp;/g, ''));


								hayui.event.call(this, MOD_NAME, 'select(' + filter + ')', {
									elem: select[0],
									value: value,
									othis: reElem
								});

								hideDown(true);
								return false;
							});

							reElem.find('dl>dt').on('click', function(e) {
								return false;
							});

							//关闭下拉
							$(document).off('click', hide).on('click', hide);
						};

					selects.each(function(index, select) {
						var othis = $(this),
							hasRender = othis.next('.' + CLASS),
							disabled = this.disabled,
							value = $(select).data('value') || $(select).attr('value') || select.value,
							selected = $('option[value="' + value + '"]', $(select)) || $(select.options[select.selectedIndex]), //获取当前选中项
							optionsFirst = select.options[0];

							//default value
							select.value = value;
						if (typeof othis.attr('hay-ignore') === 'string') return othis.show();

						var isSearch = typeof othis.attr('hay-search') === 'string',
							placeholder = optionsFirst ? (
								optionsFirst.value ? TIPS : (optionsFirst.innerHTML || TIPS)
							) : TIPS;

						//替代元素
						var reElem = $(['<div class="' + (isSearch ? '' : 'hayui-unselect ') + CLASS + (disabled ? ' hayui-select-disabled' : '') + '">', '<div class="' + TITLE + '"><input type="text" placeholder="' + placeholder + '" value="' + (value ? selected.html() : '') + '" ' + (isSearch ? '' : 'readonly') + ' class="hayui-input' + (isSearch ? '' : ' hayui-unselect') + (disabled ? (' ' + DISABLED) : '') + '">', '<i class="hayui-edge"></i></div>', '<dl class="hayui-anim hayui-anim-upbit' + (othis.find('optgroup')[0] ? ' hayui-select-group' : '') + '">' + function(options) {
							var arr = [];
							hayui.each(options, function(index, item) {
								if (index === 0 && !item.value) {
									arr.push('<dd hay-value="" class="hayui-select-tips">' + (item.innerHTML || TIPS) + '</dd>');
								} else if (item.tagName.toLowerCase() === 'optgroup') {
									arr.push('<dt>' + item.label + '</dt>');
								} else {
									arr.push('<dd hay-value="' + item.value + '" class="' + (value === item.value ? THIS : '') + (item.disabled ? (' ' + DISABLED) : '') + '" title="' + item.innerHTML + '">' + item.innerHTML + '</dd>');
								}
							});
							arr.length === 0 && arr.push('<dd hay-value="" class="' + DISABLED + '">没有选项</dd>');
							return arr.join('');
						}(othis.find('*')) + '</dl>', '</div>'].join(''));

						hasRender[0] && hasRender.remove(); //如果已经渲染，则Rerender

						othis.after(reElem);
						events.call(this, reElem, disabled, isSearch);
					});
				},
				//复选框/开关
				checkbox: function() {
					var CLASS = {
							checkbox: ['hayui-form-checkbox', 'hayui-form-checked', 'checkbox'],
							_switch: ['hayui-form-switch', 'hayui-form-onswitch', 'switch']
						},
						ICON = ['hayui-icon-corret', 'hayui-icon-corret4'],
						checks = elemForm.find('input[type=checkbox]'),

						events = function(reElem, RE_CLASS) {
							var check = $(this);

							if (device.ie) {
								check.on({
									click: function() {
										this.blur();
										this.focus();
									}
								})
							}

							//勾选
							reElem.on('click', function() {
								var filter = check.attr('hay-filter'), //获取过滤器
									text = (check.attr('hay-text') || '').split('|');

								if (check[0].disabled) return;

								check[0].checked ? (
									check[0].checked = false, reElem.removeClass(RE_CLASS[1]).find('em').text(text[1])
								) : (
									check[0].checked = true, reElem.addClass(RE_CLASS[1]).find('em').text(text[0])
								);

								check.trigger('change');

								hayui.event.call(check[0], MOD_NAME, RE_CLASS[2] + '(' + filter + ')', {
									elem: check[0],
									value: check[0].value,
									othis: reElem
								});
							});
						}

					checks.each(function(index, check) {
						var othis = $(this),
							skin = othis.attr('hay-skin'),
							text = (othis.attr('hay-text') || '').split('|'),
							disabled = this.disabled;
						if (skin === 'switch') skin = '_' + skin;
						var RE_CLASS = CLASS[skin] || CLASS.checkbox;

						if (typeof othis.attr('hay-ignore') === 'string') return othis.show();

						//替代元素
						var hasRender = othis.next('.' + RE_CLASS[0]);
						var reElem = $(['<div class="hayui-unselect ' + RE_CLASS[0] + (
							check.checked ? (' ' + RE_CLASS[1]) : '') + (disabled ? ' hayui-checkbox-disbaled ' + DISABLED : '') + '" hay-skin="' + (skin || '') + '">', {
							_switch: '<em>' + ((check.checked ? text[0] : text[1]) || '') + '</em><i></i>'
						}[skin] || ((check.title.replace(/\s/g, '') ? ('<span>' + check.title + '</span>') : '') + '<i class="hayui-icon ' + ICON[skin ? 0 : 1] + '"></i>'), '</div>'].join(''));

						hasRender[0] && hasRender.remove(); //如果已经渲染，则Rerender
						othis.after(reElem);
						events.call(this, reElem, RE_CLASS);
					});
				},
				//单选框
				radio: function() {
					var CLASS = 'hayui-form-radio',
						ICON = ['hayui-icon-selected1', 'hayui-icon-selectednot1'],
						radios = elemForm.find('input[type=radio]'),

						events = function(reElem) {
							var radio = $(this),
								ANIM = 'hayui-anim-scaleSpring';

							reElem.on('click', function() {
								var name = radio[0].name,
									forms = radio.parents(ELEM);
								var filter = radio.attr('hay-filter'); //获取过滤器
								var sameRadio = forms.find('input[name=' + name.replace(/(\.|#|\[|\])/g, '\\$1') + ']'); //找到相同name的兄弟

								if (radio[0].disabled) return;

								hayui.each(sameRadio, function() {
									var next = $(this).next('.' + CLASS);
									this.checked = false;
									next.removeClass(CLASS + 'ed');
									next.find('.hayui-icon').removeClass(ANIM).removeClass(ICON[0]).addClass(ICON[1]);
								});

								radio[0].checked = true;
								reElem.addClass(CLASS + 'ed');
								reElem.find('.hayui-icon').addClass(ANIM).removeClass(ICON[1]).addClass(ICON[0]);

								radio.trigger('change');

								hayui.event.call(radio[0], MOD_NAME, 'radio(' + filter + ')', {
									elem: radio[0],
									value: radio[0].value,
									othis: reElem
								});
							});
						};

					radios.each(function(index, radio) {
						var othis = $(this),
							hasRender = othis.next('.' + CLASS),
							disabled = this.disabled;

						if (typeof othis.attr('hay-ignore') === 'string') return othis.show();

						//替代元素
						var reElem = $(['<div class="hayui-unselect ' + CLASS + (radio.checked ? (' ' + CLASS + 'ed') : '') + (disabled ? ' hayui-radio-disbaled ' + DISABLED : '') + '">', '<i class="hayui-anim hayui-icon ' + ICON[radio.checked ? 0 : 1] + '"></i>', '<span>' + (radio.title || '') + '</span>', '</div>'].join(''));

						hasRender[0] && hasRender.remove(); //如果已经渲染，则Rerender
						othis.after(reElem);
						events.call(this, reElem);
					});
				},
			};
		type ? (
			items[type] ? items[type]() : hint.error('不支持的' + type + '表单渲染')
		) : hayui.each(items, function(index, item) {
			item();
		});
		that.clearVerifyTips(filter);
		that.bindEventVerify();
		return that;
	};

	//核验
	Class.prototype.doVerify = function(othis, item) {
		var that = this,
			verify = form.config.verify,
			ver = othis.attr('hay-verify'),
			ignore = othis.attr('hay-ignoreverify');

		if (ignore) {
			return true;
		}

		ver = ver && ver.length ? ver.split('|') : [];

		var stop = null,
			tips = '',
			value = othis.val();

		var tipopts = {
			elem: othis,
			postion: 'BL',
			isRepos: true,
			bgcolor: '#FF5722'
		};

		hayui.each(ver, function(_, thisVer) {
			var isFn = typeof verify[thisVer] === 'function';
			if (verify[thisVer] && (isFn ? tips = verify[thisVer](value, item) : !verify[thisVer][0].test(value))) {
				othis.addClass(DANGER);
				tipopts.cont = tips || verify[thisVer][1];
				elemtips.tips(tipopts);
				return stop = true;
			} else {
				othis.removeClass(DANGER);
				elemtips.removetips(tipopts);
			}
		});
		return stop;
	};

	//清除验证提示
	Class.prototype.clearVerifyTips = function(filter, pointfilter) {
		var that = this,
			elemForm = $(ELEM + function() {
				return filter ? ('[hay-filter="' + filter + '"]') : '';
			}()),
			stop = null,
			verifyElem = pointfilter ? elemForm.find(pointfilter) : elemForm.find('*[hay-verify]');
		//校验
		hayui.each(verifyElem, function(_, item) {
			var oItem = $(item);
			var tipopts = {
				elem: oItem
			};
			oItem.removeClass(DANGER);
			elemtips.removetips(tipopts);
		});

		return that;
	};

	//绑定失去焦点
	Class.prototype.bindEventVerify = function(filter) {
		var that = this,
			elemForm = $(ELEM + function() {
				return filter ? ('[hay-filter="' + filter + '"]') : '';
			}()),
			stop = null,
			verifyElem = elemForm.find('*[hay-verify]:not([hay-ignoreverify])'); //获取需要校验的元素

		//校验
		hayui.each(verifyElem, function(_, item) {
			var oItem = $(item);

			var oxItem = oItem;
			var oxEvent = null;
			switch (oItem[0].tagName.toLocaleLowerCase()) {
				case 'input':
					oxEvent = 'blur';
					break;
				case 'textarea':
					oxEvent = 'blur';
					break;
				case 'select':
					oxEvent = 'change';
					break;
				case 'div':
					if ($('input[type!="hidden"]', oItem).length) {
						switch ($('input[type!="hidden"]', oItem)[0].type) {
							case 'checkbox':
								oxEvent = 'change';
								oxItem = $('input[type="checkbox"]', oItem);
								break;
							case 'radio':
								oxEvent = 'change';
								oxItem = $('input[type="radio"]', oItem);
								break;
							default:
								oxEvent = 'blur';
								oxItem = $('input[type="text"]', oItem);
								break;
						}
					} else if (oItem.attr('hay-verify') == 'image' || oItem.attr('hay-verifyevent') == 'inptchange') {
						oxEvent = 'change';
						oxItem = $('input[type="hidden"]', oItem);
					} else if (oItem.attr('hay-verify') == 'js_ueditor') {
						oxEvent = 'editor';
						oxItem = $('textarea', oItem);
					} else {
						oxEvent = 'blur';
						oxItem = $('input[type="hidden"]', oItem);
					}
					break;
			}
			oxItem.on(oxEvent, function() {
				return stop = that.doVerify(oItem, item);
			});
		});
		return that;
	};

	//获取表单字段值
	Class.prototype.getAllFiles = function(filter) {
		var field = {},
			elemForm = $(ELEM + function() {
				return filter ? ('[hay-filter="' + filter + '"]') : '';
			}()),
			fieldElem = elemForm.find('input,select,textarea'); //获取所有表单域
		hayui.each(fieldElem, function(_, item) {
			item.name = (item.name || '').replace(/^\s*|\s*&/, '');
			if (!item.name) return;

			//用于支持数组 name
			// if (/^.*\[\]$/.test(item.name)) {
			// 	var key = item.name.match(/^(.*)\[\]$/g)[0];
			// 	nameIndex[key] = nameIndex[key] | 0;
			// 	item.name = item.name.replace(/^(.*)\[\]$/, '$1[' + (nameIndex[key]++) + ']');
			// }

			if (/^checkbox|radio$/.test(item.type)) {
				if (!item.checked) {
					return;
				} else if (!field[item.name]) {
					var values = [];
					$('[name="' + item.name + '"]:checked').each(function(index, el) {
						values.push($(el).val());
					});
					field[item.name] = values.join(',');
				}
			} else {
				field[item.name] = [$(item).val() || $(item).data('value') || $(item).attr('data-value')].join('');
			}
		});

		//获取字段
		return field;
	};

	//开放执行验证
	Class.prototype.doAllverify = function(filter, ignorepos) {
		var stop = [],
			elemForm = $(ELEM + function() {
				return filter ? ('[hay-filter="' + filter + '"]') : '';
			}()),
			verifyElem = elemForm.find('*[hay-verify]:not([hay-ignoreverify])'); //获取需要校验的元素
		//开始校验
		hayui.each(verifyElem, function(_, item) {
			var oItem = $(item);
			var res = form.doVerify(oItem, item);
			if (res) {
				stop.push(res);
			}
		});

		var ispos = true;
		hayui.each(verifyElem, function(_, item) {
			var oItem = $(item);
			if (!ignorepos && ispos && oItem.hasClass(DANGER)) {
				$(window).scrollTop($(item).offset().top - 50);
				ispos = false;
			}
		});

		if (stop.length) {
			return true;
		}
	};

	//高级搜索折叠
	Class.prototype.fold = function(filter, param) {
		var elemForm = $(ELEM + function() {
			return filter ? ('[hay-filter="' + filter + '"]') : '';
		}());

		var contbox = $('[hay-fold="search"]', elemForm);

		if (!contbox.length) {
			return false;
		}

		elemForm.css({
			position: 'relative'
		});

		param = param ? param : {
			cls: 'hayui-form-fold',
			fold: true
		};

		var btn = $('[hay-fold="btn"]', elemForm);

		if (param.fold) {
			contbox.addClass(param.cls).css({
				'margin-right': '70px'
			});
		}
		if (!btn.length) {
			contbox.after('<span class="hayui-link hayui-link-normal" hay-fold="btn">高级搜索<i class="hayui-icon hayui-icon-' + (param.fold ? 'arrowdown' : 'arrowup') + ' hayui-ml5"></i></span>');
			btn = $('[hay-fold="btn"]', elemForm);
		}

		btn.css({
			position: 'absolute',
			right: 0,
			top: 0
		}).on('click', function() {
			contbox.toggleClass(param.cls);
			$('i', btn).toggleClass('hayui-icon-arrowup');
		});
	};

	//隐藏下拉面板
	Class.prototype.hideDDUI = function() {
		var CLASS = ['hayui-form-select', 'hayui-ddcheckbox', 'hayui-ddtreeselectbox', 'hayui-dropdown', 'hayui-ddmultipleselectbox'];
		hayui.each(CLASS, function(index, cls) {
			$('.' + cls).removeClass(cls + 'ed ' + cls + 'up');
		});
	};

	//表单提交
	var submit = function() {
		var button = $(this),
			stop = null,
			field = {},
			elem = button.parents(ELEM),

			verifyElem = elem.find('*[hay-verify]:not([hay-ignoreverify])'), //获取需要校验的元素
			formElem = button.parents('form')[0], //获取当前所在的form元素，如果存在的话
			fieldElem = elem.find('input,select,textarea'), //获取所有表单域
			filter = button.attr('hay-filter'); //获取过滤器

		//校验
		stop = form.doAllverify($(formElem).attr('hay-filter'), false);
		if (stop) {
			return false;
		}
		//获取字段
		field = form.getAllFiles($(formElem).attr('hay-filter'));

		return hayui.event.call(this, MOD_NAME, 'submit(' + filter + ')', {
			elem: this,
			form: formElem,
			field: field
		});
	};

	var dom = $(document),
		win = $(window);

	form = new Class();

	//外部渲染
	form.render = function(type, filter, pointfilter) {
		var inst = new Class();
		inst.render(type, filter, pointfilter);
	};

	//清除全部错误提示
	form.clear = function(filter) {
		var restform = $(ELEM + function() {
			return filter ? ('[hay-filter="' + filter + '"]') : '';
		}())[0];
		form.clearVerifyTips(filter);
	};

	//外部重置
	form.reset = function(filter) {
		var restform = $(ELEM + function() {
			return filter ? ('[hay-filter="' + filter + '"]') : '';
		}())[0];
		form.clearVerifyTips(filter);
		restform.reset();
	};

	//高级搜索折叠
	form.fold = function(filter, param) {
		var inst = new Class();
		inst.fold(filter, param);
	};

	//获取字符串长度，一个汉字算两个英文字符
	form.getStrLength = function(d) {
		var d = $.trim(d);
		var f = $.trim(d).length;
		var e = d.replace(/[\u2E80-\u9FFF]/g, "");
		var c = e.length;
		var b = f - c;
		var a = 0;
		a = b * 2 + c * 1;
		return a;
	};

	//获取字符串长度，两个英文字符算一个汉字
	form.getStrLengthGBK = function(d) {
		var d = $.trim(d);
		var f = $.trim(d).length;
		var e = d.replace(/[\u2E80-\u9FFF0-9]/g, "");
		var c = e.length;
		var b = f - c;
		var a = 0;
		a = b * 1 + c * 0.5;
		return a;
	};

	//表单reset重置渲染
	dom.on('reset', ELEM, function() {
		var filter = $(this).attr('hay-filter');
		setTimeout(function() {
			form.render(null, filter);
		}, 50);
	});

	//表单提交事件
	dom.on('submit', ELEM, submit).on('click', '*[hay-submit]', submit);

	exports(MOD_NAME, form);
});