/**
 @Name：hayui.elemtips 【常用元素操作】
 @Author：hallelujah
 */

hayui.define('jquery', function(exports) {
	"use strict";

	var $ = hayui.$,
		hint = hayui.hint(),
		device = hayui.device(),

		MOD_NAME = 'element',
		THIS = 'hayui-this',
		SHOW = 'hayui-show',

		Element = function() {
			this.config = {};
		};

	//全局设置
	Element.prototype.set = function(options) {
		var that = this;
		$.extend(true, that.config, options);
		return that;
	};

	//表单事件监听
	Element.prototype.on = function(events, callback) {
		return hayui.onevent.call(this, MOD_NAME, events, callback);
	};

	//外部Tab新增
	Element.prototype.tabAdd = function(filter, options) {
		var TITLE = '.hayui-tab-title',
			tabElem = $('.hayui-tab[hay-filter=' + filter + ']'),
			titElem = tabElem.children(TITLE),
			barElem = titElem.children('.hayui-tab-bar'),
			contElem = tabElem.children('.hayui-tab-content'),
			li = '<li hay-id="' + (options.id || '') + '">' + (options.title || 'unnaming') + '</li>';
		barElem[0] ? barElem.before(li) : titElem.append(li);
		contElem.append('<div class="hayui-tab-item">' + (options.content || '') + '</div>');
		call.hideTabMore(true);
		call.tabAuto();
		return this;
	};

	//外部Tab删除
	Element.prototype.tabDelete = function(filter, hayid) {
		var TITLE = '.hayui-tab-title',
			tabElem = $('.hayui-tab[hay-filter=' + filter + ']'),
			titElem = tabElem.children(TITLE),
			liElem = titElem.find('>li[hay-id="' + hayid + '"]');
		call.tabDelete(null, liElem);
		return this;
	};

	//外部Tab切换
	Element.prototype.tabChange = function(filter, hayid) {
		var TITLE = '.hayui-tab-title',
			tabElem = $('.hayui-tab[hay-filter=' + filter + ']'),
			titElem = tabElem.children(TITLE),
			liElem = titElem.find('>li[hay-id="' + hayid + '"]');
		call.tabClick(null, null, liElem);
		return this;
	};

	//自定义Tab选项卡
	Element.prototype.tab = function(options) {
		options = options || {};
		dom.on('click', options.headerElem, function(e) {
			var index = $(this).index();
			call.tabClick.call(this, e, index, null, options);
		});
	};

	//动态改变进度条
	Element.prototype.progress = function(filter, percent) {
		var ELEM = 'hayui-progress',
			elem = $('.' + ELEM + '[hay-filter=' + filter + ']'),
			elemBar = elem.find('.' + ELEM + '-bar'),
			text = elemBar.find('.' + ELEM + '-text');
		elemBar.css('width', percent);
		text.text(percent);
		return this;
	};

	var NAV_ELEM = '.hayui-nav',
		NAV_ITEM = 'hayui-nav-item',
		NAV_BAR = 'hayui-nav-bar',
		NAV_TREE = 'hayui-nav-tree',
		NAV_CHILD = 'hayui-nav-child',
		NAV_MORE = 'hayui-nav-more',
		NAV_ANIM = 'hayui-anim hayui-anim-upbit',
		//基础事件体
		call = {

			//Tab点击
			tabClick: function(e, index, liElem, options) {
				options = options || {};
				var othis = liElem || $(this),
					index = index || othis.parent().children('li').index(othis),
					parents = options.headerElem ? othis.parent() : othis.parents('.hayui-tab').eq(0),
					item = options.bodyElem ? $(options.bodyElem) : parents.children('.hayui-tab-content').children('.hayui-tab-item'),
					elemA = othis.find('a'),
					filter = parents.attr('hay-filter');

				if (!(elemA.attr('href') !== 'javascript:;' && elemA.attr('target') === '_blank')) {
					othis.addClass(THIS).siblings().removeClass(THIS);
					item.eq(index).addClass(SHOW).siblings().removeClass(SHOW);
				}

				hayui.event.call(this, MOD_NAME, 'tab(' + filter + ')', {
					elem: parents,
					index: index
				});
			},
			//Tab删除
			tabDelete: function(e, othis) {
				var li = othis || $(this).parent(),
					index = li.index();
				var parents = li.parents('.hayui-tab').eq(0);
				var item = parents.children('.hayui-tab-content').children('.hayui-tab-item');
				var filter = parents.attr('hay-filter');
				if (li.hasClass(THIS)) {
					if (li.next()[0]) {
						call.tabClick.call(li.next()[0], null, index + 1);
					} else if (li.prev()[0]) {
						call.tabClick.call(li.prev()[0], null, index - 1);
					}
				}

				li.remove();
				item.eq(index).remove();
				setTimeout(function() {
					call.tabAuto();
				}, 50);

				hayui.event.call(this, MOD_NAME, 'tabDelete(' + filter + ')', {
					elem: parents,
					index: index
				});
			},
			//Tab自适应
			tabAuto: function() {
				var SCROLL = 'hayui-tab-scroll',
					MORE = 'hayui-tab-more',
					BAR = 'hayui-tab-bar',
					CLOSE = 'hayui-tab-close',
					that = this;

				$('.hayui-tab').each(function() {
					var othis = $(this),
						title = othis.children('.hayui-tab-title'),
						item = othis.children('.hayui-tab-content').children('.hayui-tab-item'),
						STOPE = 'hay-stope="tabmore"',
						span = $('<span class="hayui-unselect hayui-tab-bar" ' + STOPE + '><i ' + STOPE + ' class="hayui-icon hayui-icon-arrowdown"></i></span>');

					if (that === window && device.ie != 8) {
						call.hideTabMore(true)
					}

					//允许关闭
					if (othis.attr('hay-allowClose')) {
						title.find('li').each(function() {
							var li = $(this);
							if (!li.find('.' + CLOSE)[0]) {
								var close = $('<i class="hayui-icon hayui-unselect ' + CLOSE + ' hayui-icon-close2"></i>');
								close.on('click', call.tabDelete);
								li.append(close);
							}
						});
					}

					//响应式
					if (title.prop('scrollWidth') > title.outerWidth() + 1) {
						if (title.find('.' + BAR)[0]) return;
						title.append(span);
						othis.attr('overflow', '');
						span.on('click', function(e) {
							title[this.title ? 'removeClass' : 'addClass'](MORE);
							this.title = this.title ? '' : '收缩';
						});
					} else {
						title.find('.' + BAR).remove();
						othis.removeAttr('overflow');
					}
				});
			},
			//隐藏更多Tab
			hideTabMore: function(e) {
				var tsbTitle = $('.hayui-tab-title');
				if (e === true || $(e.target).attr('hay-stope') !== 'tabmore') {
					tsbTitle.removeClass('hayui-tab-more');
					tsbTitle.find('.hayui-tab-bar').attr('title', '');
				}
			},
			//点击选中
			clickThis: function() {
				var othis = $(this),
					parents = othis.parents(NAV_ELEM),
					filter = parents.attr('hay-filter'),
					elemA = othis.find('a'),
					unselect = typeof othis.attr('hay-unselect') === 'string';

				if (othis.find('.' + NAV_CHILD)[0]) return;

				if (!(elemA.attr('href') !== 'javascript:;' && elemA.attr('target') === '_blank')) {
					parents.find('.' + THIS).removeClass(THIS);
					othis.addClass(THIS);
				}

				hayui.event.call(this, MOD_NAME, 'nav(' + filter + ')', othis);
			},
			//点击子菜单选中
			clickChild: function() {
				var othis = $(this),
					parents = othis.parents(NAV_ELEM),
					filter = parents.attr('hay-filter');
				parents.find('.' + THIS).removeClass(THIS);
				othis.addClass(THIS);
				hayui.event.call(this, MOD_NAME, 'nav(' + filter + ')', othis);
			},
			//展开二级菜单
			showChild: function() {
				var othis = $(this),
					parents = othis.parents(NAV_ELEM);
				var parent = othis.parent(),
					child = othis.siblings('.' + NAV_CHILD);
				if (parents.hasClass(NAV_TREE)) {
					child.removeClass(NAV_ANIM);
					parent[child.css('display') === 'none' ? 'addClass' : 'removeClass'](NAV_ITEM + 'ed');
				}
			},
			//折叠面板
			collapse: function() {
				var othis = $(this),
					icon = othis.find('.hayui-colla-icon'),
					elemCont = othis.siblings('.hayui-colla-content'),
					parents = othis.parents('.hayui-collapse').eq(0),
					filter = parents.attr('hay-filter'),
					isNone = elemCont.css('display') === 'none',
					ICON = ['hayui-icon-arrowdown', 'hayui-icon-arrowright'];
				//是否手风琴
				if (typeof parents.attr('hay-accordion') === 'string') {
					var show = parents.children('.hayui-colla-item').children('.' + SHOW);
					show.siblings('.hayui-colla-title').children('.hayui-colla-icon').removeClass(ICON[0]).addClass(ICON[1]);
					show.removeClass(SHOW);
				}
				elemCont[isNone ? 'addClass' : 'removeClass'](SHOW);
				icon.removeClass(isNone ? ICON[1] : ICON[0]);
				icon.addClass(isNone ? ICON[0] : ICON[1]);

				hayui.event.call(this, MOD_NAME, 'collapse(' + filter + ')', {
					title: othis,
					content: elemCont,
					show: isNone
				});
			},
			mainEqualHeight: function() {
				var BODY = $('body');
				var MAIN = $('.hayui-main');
				var LEFT_NAV = $('.hayui-nav-tree', MAIN);
				var RIGHT_BODY = $('.hayui-body', MAIN);

				if (MAIN && MAIN.length && LEFT_NAV && LEFT_NAV.length) {
					var BH = BODY.height() - MAIN.offset().top;
					var MH = MAIN.outerHeight(true);
					var LH = LEFT_NAV.outerHeight(true);
					var RH = RIGHT_BODY.outerHeight(true);
					if (RH > LH || (BH > RH)) {
						LEFT_NAV.css({
							'min-height': BH > RH ? BH : RH
						});
					}
				}
			}
		};

	//初始化元素操作
	Element.prototype.init = function(type, filter) {
		var that = this,
			elemFilter = function() {
				return filter ? ('[lay-filter="' + filter + '"]') : '';
			}(),
			items = {
				//Tab选项卡
				tab: function() {
					call.tabAuto.call({});
				},
				//导航菜单
				nav: function() {
					var TIME = 200,
						timer = {},
						timerMore = {},
						timeEnd = {},
						follow = function(bar, nav, index) {
							var othis = $(this),
								child = othis.find('.' + NAV_CHILD);

							if (nav.hasClass(NAV_TREE)) {
								bar.css({
									top: othis.position().top,
									height: othis.height(),
									opacity: 1
								});
							} else {
								child.addClass(NAV_ANIM);
								bar.css({
									left: othis.position().left + parseFloat(othis.css('marginLeft')),
									top: othis.position().top + othis.height() - bar.height()
								});

								timer[index] = setTimeout(function() {
									bar.css({
										width: othis.width(),
										opacity: 1
									});
								}, device.ie && device.ie < 10 ? 0 : TIME);

								clearTimeout(timeEnd[index]);
								if (child.css('display') === 'block') {
									clearTimeout(timerMore[index]);
								}
								timerMore[index] = setTimeout(function() {
									child.addClass(SHOW);
									othis.find('.' + NAV_MORE).addClass(NAV_MORE + 'd');
								}, 300);
							}
						};

					$(NAV_ELEM + elemFilter).each(function(index) {
						var othis = $(this),
							bar = $('<span class="' + NAV_BAR + '"></span>'),
							itemElem = othis.find('.' + NAV_ITEM);

						//Hover滑动效果
						if (!othis.find('.' + NAV_BAR)[0]) {
							othis.append(bar);
							itemElem.on('mouseenter', function() {
								follow.call(this, bar, othis, index);
							}).on('mouseleave', function() {
								if (!othis.hasClass(NAV_TREE)) {
									clearTimeout(timerMore[index]);
									timerMore[index] = setTimeout(function() {
										othis.find('.' + NAV_CHILD).removeClass(SHOW);
										othis.find('.' + NAV_MORE).removeClass(NAV_MORE + 'd');
									}, 300);
								}
							}).on('click', function() {
								follow.call(this, bar, othis, index);
							});
							othis.on('mouseleave', function() {
								clearTimeout(timer[index]);
								timeEnd[index] = setTimeout(function() {
									if (othis.hasClass(NAV_TREE)) {
										bar.css({
											height: 0,
											top: bar.position().top + bar.height() / 2,
											opacity: 0
										});
									} else {
										bar.css({
											width: 0,
											left: bar.position().left + bar.width() / 2,
											opacity: 0
										});
									}
								}, TIME);
							});
						}

						itemElem.each(function() {
							var oitem = $(this),
								child = oitem.find('.' + NAV_CHILD);

							//二级菜单
							if (child[0] && !oitem.find('.' + NAV_MORE)[0]) {
								var one = oitem.children('a');
								one.append('<span class="' + NAV_MORE + '"></span>');
							}

							oitem.off('click', call.clickThis).on('click', call.clickThis); //点击选中
							oitem.children('a').off('click', call.showChild).on('click', call.showChild); //展开二级菜单
							child.children('dd').off('click', call.clickChild).on('click', call.clickChild); //点击子菜单选中
						});
					});
				},
				//面包屑
				breadcrumb: function() {
					var ELEM = '.hayui-breadcrumb';

					$(ELEM + elemFilter).each(function() {
						var othis = $(this),
							ATTE_SPR = 'hay-separator',
							separator = othis.attr(ATTE_SPR) || '/',
							aNode = othis.find('a');
						if (aNode.next('span[' + ATTE_SPR + ']')[0]) return;
						aNode.each(function(index) {
							if (index === aNode.length - 1) return;
							$(this).after('<span ' + ATTE_SPR + '>' + separator + '</span>');
						});
						othis.css('visibility', 'visible');
					});
				},
				//进度条
				progress: function() {
					var ELEM = 'hayui-progress';

					$('.' + ELEM).each(function() {
						var othis = $(this),
							elemBar = othis.find('.hayui-progress-bar'),
							percent = elemBar.attr('hay-percent');
						elemBar.css('width', function() {
							return /^.+\/.+$/.test(percent) ?
								(new Function('return ' + percent)() * 100) + '%' :
								percent;
						}());
						if (othis.attr('hay-showPercent')) {
							setTimeout(function() {
								elemBar.html('<span class="' + ELEM + '-text">' + percent + '%</span>');
							}, 350);
						}
					});
				},
				//折叠面板
				collapse: function() {
					var ELEM = 'hayui-collapse',
						ICON = ['hayui-icon-arrowdown', 'hayui-icon-arrowright'];

					$('.' + ELEM + elemFilter).each(function() {
						var elemItem = $(this).find('.hayui-colla-item')
						elemItem.each(function() {
							var othis = $(this),
								elemTitle = othis.find('.hayui-colla-title'),
								elemCont = othis.find('.hayui-colla-content'),
								isNone = elemCont.css('display') === 'none';

							//初始状态
							elemTitle.find('.hayui-colla-icon').remove();
							elemTitle.append('<i class="hayui-icon hayui-colla-icon ' + (isNone ? ICON[1] : ICON[0]) + '"></i>');

							//点击标题
							elemTitle.off('click', call.collapse).on('click', call.collapse);
						});

					});
				},
				mainEqualHeight: function() {
					call.mainEqualHeight.call({});
				}
			};

		return items[type] ? items[type]() : hayui.each(items, function(index, item) {
			item();
		});
	};

	Element.prototype.render = Element.prototype.init;

	var element = new Element(),
		dom = $(document);
	element.init();

	//core
	element.render = function() {
		var elem = new Element();
		return elem.init();
	};

	var TITLE = '.hayui-tab-title li';
	dom.on('click', TITLE, call.tabClick); //Tab切换
	dom.on('click', call.hideTabMore); //隐藏展开的Tab
	$(window).on('resize', call.tabAuto); //自适应
	$(window).on('resize', call.mainEqualHeight); //自适应

	exports(MOD_NAME, element);
});