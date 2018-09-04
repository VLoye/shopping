/**
 @Name：hayui.form  【表格操作】
 @Author：hallelujah
 */

hayui.define(['haytemplet', 'haypage', 'layer', 'form'], function(exports) {
	"use strict";

	var $ = hayui.$,
		haytemplet = hayui.haytemplet,
		haypage = hayui.haypage,
		layer = hayui.layer,
		form = hayui.form,
		hint = hayui.hint(),
		device = hayui.device(),

		//外部接口
		table = {
			config: {
				checkName: 'HAY_CHECKED', //是否选中状态的字段名
				indexName: 'HAY_TABLE_INDEX' //下标索引名
			}, //全局配置项
			cache: {}, //数据缓存
			index: hayui.table ? (hayui.table.index + 10000) : 0,
			//设置全局项
			set: function(options) {
				var that = this;
				that.config = $.extend({}, that.config, options);
				return that;
			},
			//事件监听
			on: function(events, callback) {
				return hayui.onevent.call(this, MOD_NAME, events, callback);
			}
		},
		//操作当前实例
		thisTable = function() {
			var that = this,
				options = that.config,
				id = options.id;

			id && (thisTable.config[id] = options);

			return {
				reload: function(options) {
					that.reload.call(that, options);
				},
				config: options
			};
		},
		//字符常量
		MOD_NAME = 'table',
		ELEM = '.hayui-table',
		THIS = 'hayui-this',
		SHOW = 'hayui-show',
		HIDE = 'hayui-hide',
		DISABLED = 'hayui-disabled',
		NONE = 'hayui-none',

		ELEM_VIEW = 'hayui-table-view',
		ELEM_HEADER = '.hayui-table-header',
		ELEM_BODY = '.hayui-table-body',
		ELEM_MAIN = '.hayui-table-main',
		ELEM_FIXED = '.hayui-table-fixed',
		ELEM_FIXL = '.hayui-table-fixed-l',
		ELEM_FIXR = '.hayui-table-fixed-r',
		ELEM_TOOL = '.hayui-table-tool',
		ELEM_PAGE = '.hayui-table-page',
		ELEM_SORT = '.hayui-table-sort',
		ELEM_EDIT = 'hayui-table-edit',
		ELEM_HOVER = 'hayui-table-hover',



		//thead区域模板
		TPL_HEADER = function(options) {
			var rowCols = '{{#if(item2.colspan){}} colspan="{{item2.colspan}}"{{#} if(item2.rowspan){}} rowspan="{{item2.rowspan}}"{{#}}}';
			options = options || {};
			return ['<table cellspacing="0" cellpadding="0" border="0" class="hayui-table"', '{{# if(d.data.skin){ }}hay-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}hay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}hay-even{{# } }}>', '<thead>', '{{# hayui.each(d.data.cols, function(i1, item1){ }}', '<tr>', '{{# hayui.each(item1, function(i2, item2){ }}', '{{# if(item2.fixed && item2.fixed !== "right"){ left = true; } }}', '{{# if(item2.fixed === "right"){ right = true; } }}', function() {
					if (options.fixed && options.fixed !== 'right') {
						return '{{# if(item2.fixed && item2.fixed !== "right"){ }}';
					}
					if (options.fixed === 'right') {
						return '{{# if(item2.fixed === "right"){ }}';
					}
					return '';
				}(), '<th data-field="{{ item2.field||i2 }}" {{# if(d.data.isper){ }}class="haytable-cell-per-{{d.index}}-{{item2.field||i2}}"{{# }; }} {{# if(item2.minWidth){ }}data-minwidth="{{item2.minWidth}}"{{# } }} ' + rowCols + ' {{# if(item2.unresize){ }}data-unresize="true"{{# } }}>', '<div class="hayui-table-cell haytable-cell-', '{{# if(item2.colspan > 1){ }}', 'group', '{{# } else { }}', '{{d.index}}-{{item2.field || i2}}', '{{# if(item2.type !== "normal"){ }}', ' haytable-cell-{{ item2.type }}', '{{# } }}', '{{# } }}', '" {{#if(item2.align){}}align="{{item2.align}}"{{#}}}>', '{{# if(item2.type === "checkbox"){ }}' //复选框
				, '<input type="checkbox" name="hayTableCheckbox" hay-skin="primary" hay-filter="hayTableAllChoose" {{# if(item2[d.data.checkName]){ }}checked{{# }; }}>', '{{# } else { }}', '<span>{{item2.title||""}}</span>', '{{# if(!(item2.colspan > 1) && item2.sort){ }}', '<span class="hayui-table-sort hayui-inline"><i class="hayui-edge hayui-table-sort-asc"></i><i class="hayui-edge hayui-table-sort-desc"></i></span>', '{{# } }}', '{{# } }}', '</div>', '</th>', (options.fixed ? '{{# }; }}' : ''), '{{# }); }}', '</tr>', '{{# }); }}', '</thead>', '</table>'
			].join('');
		},

		//tbody区域模板
		TPL_BODY = ['<table cellspacing="0" cellpadding="0" border="0" class="hayui-table"', '{{# if(d.data.skin){ }}hay-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}hay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}hay-even{{# } }}>', '<tbody></tbody>', '</table>'].join(''),

		//主模板

		TPL_MAIN = ['<div class="hayui-form hayui-border-box {{d.VIEW_CLASS}}" hay-filter="HAY-table-{{d.index}}" style="{{# if(d.data.width){ }}width:{{parseInt(d.data.width, 10)}}{{d.data.cellunit}};{{# } }} {{# if(d.data.height){ }}height:{{d.data.height}}{{d.data.cellunit}};{{# } }}">', '{{# if(d.data.toolbar){ }}', '<div class="hayui-table-tool"></div>', '{{# } }}'

			, '<div class="hayui-table-box">',
			'{{# var left, right; }}', '<div class="hayui-table-header">', TPL_HEADER(), '</div>', '<div class="hayui-table-body hayui-table-main">', TPL_BODY, '</div>',
			'{{# if(left){ }}', '<div class="hayui-table-fixed hayui-table-fixed-l">', '<div class="hayui-table-header">', TPL_HEADER({
				fixed: true
				// }), '</div>', '<div class="hayui-table-body">', TPL_BODY, '</div>', '</div>', '{{# }; }}',
			}), '</div>', '<div class="hayui-table-body"></div>', '</div>', '{{# }; }}',
			'{{# if(right){ }}', '<div class="hayui-table-fixed hayui-table-fixed-r">', '<div class="hayui-table-header">', TPL_HEADER({
				fixed: 'right'
			}), '<div class="hayui-table-mend"></div>', '</div>', '<div class="hayui-table-body">', TPL_BODY, '</div>', '</div>', '{{# }; }}', '</div>',
			'{{# if(d.data.page){ }}', '<div class="hayui-table-page">', '<div id="hayui-table-page{{d.index}}"></div>', '</div>', '{{# } }}',
			'<style>', '{{# hayui.each(d.data.cols, function(i1, item1){', 'hayui.each(item1, function(i2, item2){ }}', '{{# if(d.data.isper){ }}.hayui-table{width:100% !important;}.hayui-table-view .hayui-table{width:100% !important;}{{# }; }}.haytable-cell{{# if(d.data.isper){ }}-per{{# }; }}-{{d.index}}-{{item2.field||i2}}{ ', '{{# if(item2.width){ }}', 'width: {{parseInt(item2.width, 10)}}{{d.data.cellunit}};', '{{# } }}', ' }', '{{# });', '}); }}', '</style>', '</div>'
		].join(''),

		_WIN = $(window),
		_DOC = $(document),

		//构造器
		Class = function(options) {
			var that = this;
			that.index = ++table.index;
			that.config = $.extend({}, that.config, table.config, options);
			that.render();
		};

	//默认配置
	Class.prototype.config = {
		cellunit:'px', //兼容%比宽度， 仅支持固定百分比，cell相加之和当等于100%
		pagesize: 15, //每页显示的数量
		loading: true, //请求数据时，是否显示loading
		cellMinWidth: 60 //所有单元格默认最小宽度
	};

	//表格渲染
	Class.prototype.render = function() {
		var that = this,
			options = that.config;

		options.elem = $(options.elem);
		options.where = options.where || {};
		options.id = options.id || options.elem.attr('id');

		//请求参数的自定义格式
		options.request = $.extend({
			pageName: 'pageindex',
			limitName: 'pagesize'
		}, options.request)

		//响应数据的自定义格式
		options.response = $.extend({
			statusName: 'code',
			statusCode: 0,
			msgName: 'msg',
			dataName: 'data',
			countName: 'count'
		}, options.response);

		//如果 page 传入 haypage 对象
		if (typeof options.page === 'object') {
			options.pagesize = options.page.pagesize || options.pagesize;
			options.pagesizes = options.page.pagesizes || options.pagesizes;
			that.page = options.page.curr = options.page.curr || 1;
			delete options.page.elem;
			delete options.page.jump;
		}

		if (!options.elem[0]) return that;

		//wxj:如果指定百分比宽度，则按指定的宽度
		if(options.cellunit == '%'){
			options.isper = true;
		}else{
			that.setArea(); //动态分配列宽高
		}


		//开始插入替代元素
		var othis = options.elem,
			hasRender = othis.next('.' + ELEM_VIEW);

		// if (options.height && /^full-\d+$/.test(options.height)) { //full-差距值
		// 	that.fullHeightGap = options.height.split('-')[1];
		// 	options.height = _WIN.height() - that.fullHeightGap;
		// }

		//主容器
		var reElem = that.elem = $(haytemplet(TPL_MAIN).render({
			VIEW_CLASS: ELEM_VIEW,
			data: options,
			index: that.index //索引
		}));

		options.index = that.index;

		//生成替代元素
		hasRender[0] && hasRender.remove(); //如果已经渲染，则Rerender
		othis.after(reElem);

		//各级容器
		that.hayHeader = reElem.find(ELEM_HEADER);
		that.hayMain = reElem.find(ELEM_MAIN);
		that.hayBody = reElem.find(ELEM_BODY);
		that.hayFixed = reElem.find(ELEM_FIXED);
		that.hayFixLeft = reElem.find(ELEM_FIXL);
		that.hayFixRight = reElem.find(ELEM_FIXR);
		that.hayTool = reElem.find(ELEM_TOOL);
		that.hayPage = reElem.find(ELEM_PAGE);

		that.hayTool.html(
			haytemplet($(options.toolbar).html() || '').render(options)
		);

		if (options.height) that.fullSize(); //设置body区域高度

		//如果多级表头，则填补表头高度
		if (options.cols.length > 1) {
			var th = that.hayFixed.find(ELEM_HEADER).find('th');
			th.height(that.hayHeader.height() - 1 - parseFloat(th.css('padding-top')) - parseFloat(th.css('padding-bottom')));
		}

		var goindex = options.defaultindex ? options.defaultindex : that.page;
		that.pullData(goindex);
		that.events();
	};

	//根据列类型，定制化参数
	Class.prototype.initOpts = function(item) {
		var that = this,
			options = that.config,
			initWidth = {
				checkbox: 48,
				space: 15,
				numbers: 40
			};

		//让 type 参数兼容旧版本
		if (item.checkbox) item.type = "checkbox";
		if (item.space) item.type = "space";
		if (!item.type) item.type = "normal";

		if (item.type !== "normal") {
			item.unresize = true;
			item.width = item.width || initWidth[item.type];
		}
	};

	//动态分配列宽高
	Class.prototype.setArea = function() {
		var that = this,
			options = that.config,
			colNums = 0 //列个数
			,
			autoColNums = 0 //自动列宽的列个数
			,
			autoWidth = 0 //自动列分配的宽度
			,
			countWidth = 0 //所有列总宽度和
			,
			cntrWidth = options.width || function() { //获取容器宽度
				//如果父元素宽度为0（一般为隐藏元素），则继续查找上层元素，直到找到真实宽度为止
				var getWidth = function(parent) {
					var width, isNone;
					parent = parent || options.elem.parent()
					width = parent.width();
					try {
						isNone = parent.css('display') === 'none';
					} catch (e) {}
					if (parent[0] && (!width || isNone)) return getWidth(parent.parent());
					return width;
				};
				return getWidth();
			}();

		//统计列个数
		that.eachCols(function() {
			colNums++;
		});

		//减去边框差
		cntrWidth = cntrWidth - function() {
			return (options.skin === 'line' || options.skin === 'nob') ? 2 : colNums + 1;
		}();

		//遍历所有列
		hayui.each(options.cols, function(i1, item1) {
			hayui.each(item1, function(i2, item2) {
				var width;

				if (!item2) {
					item1.splice(i2, 1);
					return;
				}

				that.initOpts(item2);
				width = item2.width || 0;

				if (item2.colspan > 1) return;

				if (/\d+%$/.test(width)) {
					item2.width = width = Math.floor((parseFloat(width) / 100) * cntrWidth);
				} else if (!width) { //列宽未填写
					item2.width = width = 0;
					autoColNums++;
				}

				countWidth = countWidth + width;
			});
		});

		that.autoColNums = autoColNums; //记录自动列数

		//如果未填充满，则将剩余宽度平分。否则，给未设定宽度的列赋值一个默认宽
		(cntrWidth > countWidth && autoColNums) && (
			autoWidth = (cntrWidth - countWidth) / autoColNums
		);

		hayui.each(options.cols, function(i1, item1) {
			hayui.each(item1, function(i2, item2) {
				var minWidth = item2.minWidth || options.cellMinWidth;
				if (item2.colspan > 1) return;
				if (item2.width === 0) {
					item2.width = Math.floor(autoWidth >= minWidth ? autoWidth : minWidth); //不能低于设定的最小宽度
				}
			});
		});

		//高度铺满：full-差距值
		if (options.height && /^full-\d+$/.test(options.height)) {
			that.fullHeightGap = options.height.split('-')[1];
			options.height = _WIN.height() - that.fullHeightGap;
		}
	};

	//表格重载
	Class.prototype.reload = function(options) {
		var that = this;
		if (that.config.data && that.config.data.constructor === Array) delete that.config.data;
		that.config = $.extend({}, that.config, options);
		that.render();
	};

	//页码
	Class.prototype.page = 1;

	//获得数据
	Class.prototype.pullData = function(curr, loadIndex) {
		var that = this,
			options = that.config,
			request = options.request,
			response = options.response,
			sort = function() {
				if (typeof options.initSort === 'object') {
					that.sort(options.initSort.field, options.initSort.type);
				}
			};

		that.startTime = new Date().getTime(); //渲染开始时间
		if (options.url) { //Ajax请求
			that.loading();
			var params = {};
			params[request.pageName] = curr;
			params[request.limitName] = options.pagesize;

			$.ajax({
				type: options.method || 'get',
				url: options.url,
				data: $.extend(params, options.where),
				dataType: 'json',
				cache:false,
				success: function(res) {
					layer.closeAll('loading');
					if (res[response.statusName] != response.statusCode) {
						that.renderForm();
						return that.hayMain.html('<div class="' + NONE + '">' + (res[response.msgName] || '返回的数据状态异常') + '</div>');
					}
					that.renderData(res, curr, res[response.countName]), sort();
					options.time = (new Date().getTime() - that.startTime) + ' ms'; //耗时（接口请求+视图渲染）
					loadIndex && layer.close(loadIndex);
					typeof options.done === 'function' && options.done(res, curr, res[response.countName]);
				},
				error: function(e, m) {
					that.hayMain.html('<div class="' + NONE + '">数据接口请求异常</div>');
					that.renderForm();
					loadIndex && layer.close(loadIndex);
				}
			});
		} else if (options.data && options.data.constructor === Array) { //已知数据
			var res = {},
				startLimit = curr * options.pagesize - options.pagesize

			res[response.dataName] = options.data.concat().splice(startLimit, options.pagesize);
			res[response.countName] = options.data.length;

			that.renderData(res, curr, options.data.length), sort();
			typeof options.done === 'function' && options.done(res, curr, res[response.countName]);
		}
	};

	//遍历表头
	Class.prototype.eachCols = function(callback) {
		var cols = $.extend(true, [], this.config.cols),
			arrs = [],
			index = 0;

		//重新整理表头结构
		hayui.each(cols, function(i1, item1) {
			hayui.each(item1, function(i2, item2) {
				//如果是组合列，则捕获对应的子列
				if (item2.colspan > 1) {
					var childIndex = 0;
					index++
					item2.CHILD_COLS = [];
					hayui.each(cols[i1 + 1], function(i22, item22) {
						if (item22.PARENT_COL || childIndex == item2.colspan) return;
						item22.PARENT_COL = index;
						item2.CHILD_COLS.push(item22);
						childIndex = childIndex + (item22.colspan > 1 ? item22.colspan : 1);
					});
				}
				if (item2.PARENT_COL) return; //如果是子列，则不进行追加，因为已经存储在父列中
				arrs.push(item2)
			});
		});

		//重新遍历列，如果有子列，则进入递归
		var eachArrs = function(obj) {
			hayui.each(obj || arrs, function(i, item) {
				if (item.CHILD_COLS) return eachArrs(item.CHILD_COLS);
				callback(i, item);
			});
		};

		eachArrs();
	};

	//数据渲染
	Class.prototype.renderData = function(res, curr, count, sort) {
		var that = this,
			options = that.config,
			data = res[options.response.dataName] || [],
			trs = [],
			trs_fixed = [],
			trs_fixed_r = [],

			//渲染视图
			render = function() {
				if (!sort && that.sortKey) {
					return that.sort(that.sortKey.field, that.sortKey.sort, true);
				}
				hayui.each(data, function(i1, item1) {
					var tds = [],
						tds_fixed = [],
						tds_fixed_r = [],
						numbers = i1 + options.limit * (curr - 1) + 1; //序号

					if (item1.length === 0) return;
					if (!sort) {
						item1[table.config.indexName] = i1;
					}
					that.eachCols(function(i3, item3) {
						var field = item3.field || i3,
							content = item1[field],
							cell = that.getColElem(that.hayHeader, field);
						if (content === undefined || content === null) content = '';
						if (item3.colspan > 1) return;

						//td内容{{# if(d.data.isper){ }}class="haytable-cell-per-{{d.index}}-{{item2.field||i2}}"{{# }; }}
						var td = ['<td data-field="' + (item3.field || i3) + '" class="'+ function(){
							if(options.isper){
								return 'haytable-cell-per-' + options.index + '-' + field;
							}
						}()+'" ' + function() {
							var attr = [];
							if (item3.edit) attr.push('data-edit="' + item3.edit + '"'); //是否允许单元格编辑
							if (item3.align) attr.push(' align="' + item3.align + '"'); //对齐方式
							if (item3.templet) attr.push(' data-content="' + content + '"'); //自定义模板
							if (item3.toolbar) attr.push(' data-off="true"'); //自定义模板
							if (item3.event) attr.push(' hay-event="' + item3.event + '"'); //自定义事件
							if (item3.style) attr.push(' style="' + item3.style + '"'); //自定义样式
							if (item3.minWidth) attr.push('data-minwidth="' + item3.minWidth + '"'); //单元格最小宽度
							if (item3.format) attr.push(' data-content="' + content + '"'); //自定义格式
							if (item3.movesort) attr.push(' data-move="' + item3.movesort + '"'); //是否上下移动
							return attr.join('');
						}() + '>', '<div class="hayui-table-cell haytable-cell-' + function() { //返回对应的CSS类标识
							var str = (options.index + '-' + field);
							return item3.type === 'normal' ? str :
								(str + ' haytable-cell-' + item3.type);
						}() + '">' + function() {
							var tplData = $.extend(true, {
								HAY_INDEX: numbers
							}, item1);

							//渲染复选框列视图
							if (item3.type === 'checkbox') {
								return '<input type="checkbox" name="hayTableCheckbox" hay-skin="primary" ' + function() {
									var checkName = table.config.checkName;
									//如果是全选
									if (item3[checkName]) {
										item1[checkName] = item3[checkName];
										return item3[checkName] ? 'checked' : '';
									}
									return tplData[checkName] ? 'checked' : '';
								}() + '>';
							} else if (item3.type === 'numbers') { //渲染序号
								return numbers;
							}
							//解析工具列模板
							if (item3.toolbar) {
								return haytemplet($(item3.toolbar).html() || '').render(tplData);
							}
							if (item3.movesort) {
								var isTop = item3.movesort[0]['isTop'] || 'isTop';
								var topNum = item3.movesort[0]['num'] || -3;
								var isEnd = item3.movesort[1]['isEnd'] || 'isEnd';
								var endNum = item3.movesort[1]['num'] || +3;
								var isIndent = item3.movesort[2] ? true : false;
								var indentk = item3.movesort[2] ? item3.movesort[2]['indentk'] : 'Fid';
								var indentv = item3.movesort[2] ? item3.movesort[2]['indentv'] : 0;
								var html = [];
								html.push('<a title="上移" class="hayui-icon hayui-move ' + (isIndent ? (item1[indentk] == indentv ? 'hayui-fs-18 hayui-icon-moveup7' : ' hayui-fs-12 hayui-icon-moveup5') : 'hayui-fs-14 hayui-icon-moveup') + ' hayui-color-' + (item1[isTop] ? 'disabled' : 'blue') + '"' + (item1[isTop] ? '' : 'hay-event="move" data-flag="' + topNum + '"') + '></a>');
								html.push('<a title="下移" class="hayui-icon hayui-ml5 hayui-move ' + (isIndent ? (item1[indentk] == indentv ? 'hayui-fs-18 hayui-icon-movedown7' : ' hayui-fs-12 hayui-icon-movedown5') : ' hayui-fs-14 hayui-icon-movedown') + ' hayui-color-' + (item1[isEnd] ? 'disabled' : 'blue') + '"' + (item1[isEnd] ? '' : 'hay-event="move" data-flag="' + endNum + '"') + '></a>');
								return html.join('');
							}
							return item3.templet ? haytemplet($(item3.templet).html() || String(content)).render(tplData) : (item3.format ? item3.format(tplData, content) : content);
						}(), '</div></td>'].join('');

						tds.push(td);
						if (item3.fixed && item3.fixed !== 'right') tds_fixed.push(td);
						if (item3.fixed === 'right') tds_fixed_r.push(td);
					});
					trs.push('<tr data-index="' + i1 + '">' + tds.join('') + '</tr>');
					trs_fixed.push('<tr data-index="' + i1 + '">' + tds_fixed.join('') + '</tr>');
					trs_fixed_r.push('<tr data-index="' + i1 + '">' + tds_fixed_r.join('') + '</tr>');
				});

				//if(data.length === 0) return;

				that.hayBody.scrollTop(0);
				that.hayMain.find('.' + NONE).remove();
				that.hayMain.find('tbody').html(trs.join(''));
				that.hayFixLeft.find('tbody').html(trs_fixed.join(''));
				that.hayFixRight.find('tbody').html(trs_fixed_r.join(''));

				that.renderForm();
				that.syncCheckAll();
				that.haveInit ? that.scrollPatch() : setTimeout(function() {
					that.scrollPatch();
				}, 50);
				that.haveInit = true;
				layer.close(that.tipsIndex);
			};

		that.key = options.id || options.index;
		table.cache[that.key] = data; //记录数据

		//排序
		if (sort) {
			return render();
		}

		if (data.length === 0) {
			that.renderForm();
			that.hayFixed.remove();
			that.hayMain.find('tbody').html('');
			that.hayMain.find('.' + NONE).remove();
			return that.hayMain.append('<div class="' + NONE + '">无数据</div>');
		}

		render();

		//同步分页状态
		if (options.page) {
			// that.page = curr;
			// that.count = count;
			options.page = $.extend({
				elem: 'hayui-table-page' + options.index,
				count: count,
				groups: options.groups || 3,
				pagesizes: options.pagesizes || [10, 20, 30, 40, 50, 60, 70, 80, 90],
				pagesize: options.pagesize,
				pageindex: curr,
				hayout: ['prev', 'page', 'next', 'skip', 'count', 'pagesize'],
				prev: 'hayui-icon hayui-icon-arrowleft',
				next: 'hayui-icon hayui-icon-arrowright',
				jump: function(obj, first) {
					if (!first) {
						that.page = obj.pageindex;
						options.pagesize = obj.pagesize;
						that.pullData(obj.pageindex, that.loading());
					}
				}
			}, options.page);
			options.page.count = count; //更新总条数
			haypage.render(options.page);
		}
	};

	//找到对应的列元素
	Class.prototype.getColElem = function(parent, field) {
		var that = this,
			options = that.config;
		return parent.eq(0).find('.haytable-cell-' + (options.index + '-' + field) + ':eq(0)');
	};

	//渲染表单
	Class.prototype.renderForm = function(type) {
		form.render(type, 'HAY-table-' + this.index);
	};

	//数据排序
	Class.prototype.sort = function(th, type, pull, formEvent) {
		var that = this,
			field, res = {},
			options = that.config,
			filter = options.elem.attr('hay-filter'),
			data = table.cache[that.key],
			thisData;

		//字段匹配
		if (typeof th === 'string') {
			that.hayHeader.find('th').each(function(i, item) {
				var othis = $(this),
					_field = othis.data('field');
				if (_field === th) {
					th = othis;
					field = _field;
					return false;
				}
			});
		}

		try {
			var field = field || th.data('field');

			//如果欲执行的排序已在状态中，则不执行渲染
			if (that.sortKey && !pull) {
				if (field === that.sortKey.field && type === that.sortKey.sort) {
					return;
				}
			}

			var elemSort = that.hayHeader.find('th .haytable-cell-' + options.index + '-' + field).find(ELEM_SORT);
			that.hayHeader.find('th').find(ELEM_SORT).removeAttr('hay-sort'); //清除其它标题排序状态
			elemSort.attr('hay-sort', type || null);
			that.hayFixed.find('th')
		} catch (e) {
			return hint.error('Table modules: Did not match to field');
		}

		//记录排序索引和类型
		that.sortKey = {
			field: field,
			sort: type
		};

		if (type === 'asc') { //升序
			thisData = hayui.sort(data, field);
		} else if (type === 'desc') { //降序
			thisData = hayui.sort(data, field, true);
		} else { //清除排序
			thisData = hayui.sort(data, table.config.indexName);
			delete that.sortKey;
		}

		res[options.response.dataName] = thisData;
		that.renderData(res, that.page, that.count, true);

		if (formEvent) {
			hayui.event.call(th, MOD_NAME, 'sort(' + filter + ')', {
				field: field,
				type: type
			});
		}
	};

	//请求loading
	Class.prototype.loading = function() {
		var that = this,
			options = that.config;
		if (options.loading && options.url) {
			return layer.load(2);
		}
	};

	//同步选中值状态
	Class.prototype.setCheckData = function(index, checked) {
		var that = this,
			options = that.config,
			thisData = table.cache[that.key];
		if (!thisData[index]) return;
		if (thisData[index].constructor === Array) return;
		thisData[index][options.checkName] = checked;
	};

	//同步全选按钮状态
	Class.prototype.syncCheckAll = function() {
		var that = this,
			options = that.config,
			checkAllElem = that.hayHeader.find('input[name="hayTableCheckbox"]'),
			syncColsCheck = function(checked) {
				that.eachCols(function(i, item) {
					if (item.type === 'checkbox') {
						item[options.checkName] = checked;
					}
				});
				return checked;
			};

		if (!checkAllElem[0]) return;

		if (table.checkStatus(that.key).isAll) {
			if (!checkAllElem[0].checked) {
				checkAllElem.prop('checked', true);
				that.renderForm('checkbox');
			}
			syncColsCheck(true);
		} else {
			if (checkAllElem[0].checked) {
				checkAllElem.prop('checked', false);
				that.renderForm('checkbox');
			}
			syncColsCheck(false);
		}
	};

	//获取cssRule
	Class.prototype.getCssRule = function(field, callback) {
		var that = this,
			style = that.elem.find('style')[0],
			sheet = style.sheet || style.styleSheet || {},
			rules = sheet.cssRules || sheet.rules;
		hayui.each(rules, function(i, item) {
			if (item.selectorText === ('.haytable-cell-' + that.index + '-' + field)) {
				return callback(item), true;
			}
		});
	};

	//铺满表格主体高度
	Class.prototype.fullSize = function() {
		var that = this,
			options = that.config,
			height = options.height,
			bodyHeight;

		if (that.fullHeightGap) {
			height = _WIN.height() - that.fullHeightGap;
			if (height < 135) height = 135;
			that.elem.css('height', height);
		}

		//tbody区域高度
		bodyHeight = parseFloat(height) - parseFloat(that.hayHeader.height()) - 1;
		if (options.toolbar) {
			bodyHeight = bodyHeight - that.hayTool.outerHeight();
		}
		if (options.page) {
			bodyHeight = bodyHeight - that.hayPage.outerHeight() - 1;
		}
		that.hayMain.css('height', bodyHeight);
	};
	//获取滚动条宽度
	Class.prototype.getScrollWidth = function(elem) {
		var width = 0;
		if (elem) {
			width = elem.offsetWidth - elem.clientWidth;
		} else {
			elem = document.createElement('div');
			elem.style.width = '100px';
			elem.style.height = '100px';
			elem.style.overflowY = 'scroll';

			document.body.appendChild(elem);
			width = elem.offsetWidth - elem.clientWidth;
			document.body.removeChild(elem);
		}
		return width;
	};

	//滚动条补丁
	Class.prototype.scrollPatch = function() {
		var that = this,
			hayMainTable = that.hayMain.children('table'),
			scollWidth = that.hayMain.width() - that.hayMain.prop('clientWidth'), //纵向滚动条宽度
			scollHeight = that.hayMain.height() - that.hayMain.prop('clientHeight'), //横向滚动条高度
			getScrollWidth = that.getScrollWidth(that.hayMain[0]), //获取主容器滚动条宽度，如果有的话
			outWidth = hayMainTable.outerWidth() - that.hayMain.width(); //表格内容器的超出宽度

		//如果存在自动列宽，则要保证绝对填充满，并且不能出现横向滚动条
		if (that.autoColNums && outWidth < 5 && !that.scrollPatchWStatus) {
			var th = that.hayHeader.eq(0).find('thead th:last-child'),
				field = th.data('field');
			that.getCssRule(field, function(item) {
				var width = item.style.width || th.outerWidth();
				item.style.width = (parseFloat(width) - getScrollWidth - outWidth) + 'px';

				//二次校验，如果仍然出现横向滚动条
				if (that.hayMain.height() - that.hayMain.prop('clientHeight') > 0) {
					item.style.width = parseFloat(item.style.width) - 1 + 'px';
				}

				that.scrollPatchWStatus = true;
			});
		}

		if (scollWidth && scollHeight) {
			if (!that.elem.find('.hayui-table-patch')[0]) {
				var patchElem = $('<th class="hayui-table-patch"><div class="hayui-table-cell"></div></th>'); //补丁元素
				patchElem.find('div').css({
					width: scollWidth
				});
				that.hayHeader.eq(0).find('thead tr').append(patchElem);
			}
		} else {
			that.hayHeader.eq(0).find('.hayui-table-patch').remove();
		}

		//固定列区域高度
		var mainHeight = that.hayMain.height(),
			fixHeight = mainHeight - scollHeight;
		that.hayFixed.find(ELEM_BODY).css('height', hayMainTable.height() > fixHeight ? fixHeight : 'auto');

		//表格宽度小于容器宽度时，隐藏固定列
		that.hayFixRight[outWidth > 0 ? 'removeClass' : 'addClass'](HIDE);

		//操作栏
		that.hayFixRight.css('right', scollWidth - 1);
	};

	//事件处理
	Class.prototype.events = function() {
		var that = this,
			options = that.config,
			_BODY = $('body'),
			dict = {},
			th = that.hayHeader.find('th'),
			resizing, ELEM_CELL = '.hayui-table-cell',
			filter = options.elem.attr('hay-filter');

		//拖拽调整宽度
		th.on('mousemove', function(e) {
			var othis = $(this),
				oLeft = othis.offset().left,
				pLeft = e.clientX - oLeft;
			if (othis.attr('colspan') > 1 || othis.attr('unresize') || dict.resizeStart) {
				return;
			}
			dict.allowResize = othis.width() - pLeft <= 10; //是否处于拖拽允许区域
			_BODY.css('cursor', (dict.allowResize ? 'col-resize' : ''));
		}).on('mouseleave', function() {
			var othis = $(this);
			if (dict.resizeStart) return;
			_BODY.css('cursor', '');
		}).on('mousedown', function(e) {
			var othis = $(this);
			if (dict.allowResize) {
				var field = othis.data('field');
				e.preventDefault();
				dict.resizeStart = true; //开始拖拽
				dict.offset = [e.clientX, e.clientY]; //记录初始坐标

				that.getCssRule(field, function(item) {
					var width = item.style.width || othis.outerWidth();
					dict.rule = item;
					dict.ruleWidth = parseFloat(width);
					dict.minWidth = othis.data('minwidth') || options.cellMinWidth;
				});
			}
		});
		//拖拽中
		_DOC.on('mousemove', function(e) {
			if (dict.resizeStart) {
				e.preventDefault();
				if (dict.rule) {
					var setWidth = dict.ruleWidth + e.clientX - dict.offset[0];
					if (setWidth < dict.minWidth) setWidth = dict.minWidth;
					dict.rule.style.width = setWidth + 'px';
					layer.close(that.tipsIndex);
				}
				resizing = 1
			}
		}).on('mouseup', function(e) {
			if (dict.resizeStart) {
				dict = {};
				_BODY.css('cursor', '');
				that.scrollPatch();
			}
			if (resizing === 2) {
				resizing = null;
			}
		});

		//排序
		th.on('click', function() {
			var othis = $(this),
				elemSort = othis.find(ELEM_SORT),
				nowType = elemSort.attr('hay-sort'),
				type;

			if (!elemSort[0] || resizing === 1) return resizing = 2;

			if (nowType === 'asc') {
				type = 'desc';
			} else if (nowType === 'desc') {
				type = null;
			} else {
				type = 'asc';
			}
			that.sort(othis, type, null, true);
		}).find(ELEM_SORT + ' .hayui-edge ').on('click', function(e) {
			var othis = $(this),
				index = othis.index(),
				field = othis.parents('th').eq(0).data('field')
			hayui.stope(e);
			if (index === 0) {
				that.sort(field, 'asc', null, true);
			} else {
				that.sort(field, 'desc', null, true);
			}
		});

		//复选框选择
		that.elem.on('click', 'input[name="hayTableCheckbox"]+ div', function() {
			var checkbox = $(this).prev(),
				childs = that.hayBody.find('input[name="hayTableCheckbox"]'),
				index = checkbox.parents('tr').eq(0).data('index'),
				checked = checkbox[0].checked,
				isAll = checkbox.attr('hay-filter') === 'hayTableAllChoose';

			//全选
			if (isAll) {
				childs.each(function(i, item) {
					item.checked = checked;
					that.setCheckData(i, checked);
				});
				that.syncCheckAll();
				that.renderForm('checkbox');
			} else {
				that.setCheckData(index, checked);
				that.syncCheckAll();
			}
			hayui.event.call(this, MOD_NAME, 'checkbox(' + filter + ')', {
				checked: checked,
				data: table.cache[that.key] ? (table.cache[that.key][index] || {}) : {},
				type: isAll ? 'all' : 'one'
			});
		});

		//行事件
		that.hayBody.on('mouseenter', 'tr', function() {
			var othis = $(this),
				index = othis.index();
			that.hayBody.find('tr:eq(' + index + ')').addClass(ELEM_HOVER)
		}).on('mouseleave', 'tr', function() {
			var othis = $(this),
				index = othis.index();
			that.hayBody.find('tr:eq(' + index + ')').removeClass(ELEM_HOVER)
		});

		//单元格编辑
		that.hayBody.on('change', '.' + ELEM_EDIT, function() {
			var othis = $(this),
				value = this.value,
				field = othis.parent().data('field'),
				index = othis.parents('tr').eq(0).data('index'),
				data = table.cache[that.key][index];

			data[field] = value; //更新缓存中的值

			hayui.event.call(this, MOD_NAME, 'edit(' + filter + ')', {
				value: value,
				data: data,
				field: field
			});
		}).on('blur', '.' + ELEM_EDIT, function() {
			var templet, format, othis = $(this),
				field = othis.parent().data('field'),
				index = othis.parents('tr').eq(0).data('index'),
				data = table.cache[that.key][index];
			that.eachCols(function(i, item) {
				if (item.field == field && item.templet) {
					templet = item.templet;
				}

				if (item.field == field && item.format) {
					format = item.format;
				}
			});
			othis.siblings(ELEM_CELL).html(
				templet ? haytemplet($(templet).html() || this.value).render(data) : (format ? format(data, this.value) : this.value)
			);
			othis.parent().data('content', this.value);
			othis.remove();
		});

		//单元格事件
		that.hayBody.on('click', 'td', function() {
			var othis = $(this),
				field = othis.data('field'),
				editType = othis.data('edit'),
				elemCell = othis.children(ELEM_CELL);

			layer.close(that.tipsIndex);
			if (othis.data('off')) return;

			//显示编辑表单
			if (editType) {
				if (editType === 'select') { //选择框
					//var select = $('<select class="'+ ELEM_EDIT +'" hay-ignore><option></option></select>');
					//othis.find('.'+ELEM_EDIT)[0] || othis.append(select);
				} else { //输入框
					var input = $('<input class="hayui-input ' + ELEM_EDIT + '">');
					input[0].value = othis.data('content') || elemCell.text();
					othis.find('.' + ELEM_EDIT)[0] || othis.append(input);
					input.focus();
				}
				return;
			}

			//如果出现省略，则可查看更多
			if (elemCell.find('.hayui-form-switch,.hayui-form-checkbox')[0]) return; //限制不出现更多（暂时）

			if (Math.round(elemCell.prop('scrollWidth')) > Math.round(elemCell.outerWidth())) {
				that.tipsIndex = layer.tips([
					'<div class="hayui-table-tips-main" style="margin-top: -' + (elemCell.height() + 16) + 'px;' + function() {
						if (options.size === 'sm') {
							return 'padding: 4px 15px; font-size: 12px;';
						}
						if (options.size === 'lg') {
							return 'padding: 14px 15px;';
						}
						return '';
					}() + '">', elemCell.html(), '</div>', '<i class="hayui-icon hayui-table-tips-c hayui-icon-close2"></i>'
				].join(''), elemCell[0], {
					tips: [3, ''],
					time: -1,
					anim: -1,
					maxWidth: (device.ios || device.android) ? 300 : 600,
					isOutAnim: false,
					skin: 'hayui-table-tips',
					success: function(layero, index) {
						layero.find('.hayui-table-tips-c').on('click', function() {
							layer.close(index);
						});
					}
				});
			}
		});

		//工具条操作事件
		that.hayBody.on('click', '*[hay-event]', function() {
			var othis = $(this),
				index = othis.parents('tr').eq(0).data('index'),
				tr = that.hayBody.find('tr[data-index="' + index + '"]'),
				ELEM_CLICK = 'hayui-table-click',
				data = table.cache[that.key][index];

			hayui.event.call(this, MOD_NAME, 'tool(' + filter + ')', {
				data: table.clearCacheKey(data),
				event: othis.attr('hay-event'),
				tr: tr,
				othis: othis,
				del: function() {
					table.cache[that.key][index] = [];
					tr.remove();
					that.scrollPatch();
				},
				update: function(fields) {
					fields = fields || {};
					hayui.each(fields, function(key, value) {
						if (key in data) {
							var templet, format, td = tr.children('td[data-field="' + key + '"]');
							data[key] = value;
							that.eachCols(function(i, item2) {
								if (item2.field == key && item2.templet) {
									templet = item2.templet;
								}

								if (item2.field == key && item2.format) {
									format = item2.format;
								}
							});
							td.children(ELEM_CELL).html(
								templet ? haytemplet($(templet).html() || value).render(data) : (format ? format(data, value) : value)
							);
							td.data('content', value);
						}
					});
				}
			});
			tr.addClass(ELEM_CLICK).siblings('tr').removeClass(ELEM_CLICK);
		});

		//同步滚动条
		that.hayMain.on('scroll', function() {
			var othis = $(this),
				scrollLeft = othis.scrollLeft(),
				scrollTop = othis.scrollTop();

			that.hayHeader.scrollLeft(scrollLeft);
			that.hayFixed.find(ELEM_BODY).scrollTop(scrollTop);

			layer.close(that.tipsIndex);
		});

		_WIN.on('resize', function() { //自适应
			that.fullSize();
			that.scrollPatch();
		});
	};

	//初始化
	table.init = function(filter, settings) {
		settings = settings || {};
		var that = this,
			elemTable = filter ? $('table[hay-filter="' + filter + '"]') : $(ELEM + '[hay-data]'),
			errorTips = 'Table element property hay-data configuration item has a syntax error: ';

		//遍历数据表格
		elemTable.each(function() {
			var othis = $(this),
				tableData = othis.attr('hay-data');

			try {
				tableData = new Function('return ' + tableData)();
			} catch (e) {
				hint.error(errorTips + tableData);
			}

			var cols = [],
				options = $.extend({
					elem: this,
					cols: [],
					data: [],
					skin: othis.attr('hay-skin'), //风格
					size: othis.attr('hay-size'), //尺寸
					even: typeof othis.attr('hay-even') === 'string' //偶数行背景
				}, table.config, settings, tableData);

			filter && othis.hide();

			//获取表头数据
			othis.find('thead>tr').each(function(i) {
				options.cols[i] = [];
				$(this).children().each(function(ii) {
					var th = $(this),
						itemData = th.attr('hay-data');

					try {
						itemData = new Function('return ' + itemData)();
					} catch (e) {
						return hint.error(errorTips + itemData);
					}

					var row = $.extend({
						title: th.text(),
						colspan: th.attr('colspan') || 0, //列单元格
						rowspan: th.attr('rowspan') || 0 //行单元格
					}, itemData);

					if (row.colspan < 2) cols.push(row);
					options.cols[i].push(row);
				});
			});

			//获取表体数据
			othis.find('tbody>tr').each(function(i1) {
				var tr = $(this),
					row = {};
				//如果定义了字段名
				tr.children('td').each(function(i2, item2) {
					var td = $(this),
						field = td.data('field');
					if (field) {
						return row[field] = td.html();
					}
				});
				//如果未定义字段名
				hayui.each(cols, function(i3, item3) {
					var td = tr.children('td').eq(i3);
					row[item3.field] = td.html();
				});
				options.data[i1] = row;
			});
			table.render(options);
		});

		return that;
	};

	//表格选中状态
	table.checkStatus = function(id) {
		var nums = 0,
			invalidNum = 0,
			arr = [],
			data = table.cache[id] || [];
		if (!data) return {};
		//计算全选个数
		hayui.each(data, function(i, item) {
			if (item.constructor === Array) {
				invalidNum++; //无效数据，或已删除的
				return;
			}
			if (item[table.config.checkName]) {
				nums++;
				arr.push(table.clearCacheKey(item));
			}
		});
		return {
			data: arr, //选中的数据
			isAll: data.length ? (nums === (data.length - invalidNum)) : false //是否全选
		};
	};

	//获取表格选中的数据 /选中数据的指定列
	table.checkDatas = function(id, colnames, flag) {
		var nums = 0,
			alldata = [],
			coldata = [],
			data = table.cache[id];
		if (!data) return {};

		colnames = $.type(colnames) === 'array' ? colnames : [colnames];

		if (flag == 'colstr' && colnames.length > 1) {
			return hint.error('There are too many columns to convert to string');
		}

		//计算全选个数
		hayui.each(data, function(i, item) {
			if (item[table.config.checkName]) {
				nums++;
				alldata.push(table.clearCacheKey(item));

				var colitem = {};
				hayui.each(colnames, function(idx, name) {
					if (typeof item[name] != undefined) {
						if (flag == 'colstr') {
							coldata.push(item[name]);
						} else {
							colitem[name] = item[name];
						}
					}
				});
				if (!$.isEmptyObject(colitem)) {
					coldata.push(colitem);
				}
			}
		});

		var last = {};
		switch (flag) {
			case 'all':
				last = {
					alldata: alldata,
					nums: nums
				};
				break;
			case 'col':
				last = {
					coldata: coldata,
					nums: nums
				};
				break;
			case 'colstr':
				last = {
					coldata: coldata.join(','),
					nums: nums
				};
				break;
			default:
				last = {
					alldata: alldata, //选中行的所有数据
					coldata: coldata, //指定列的数据
					nums: nums //选中数量
				};
				break;
		}
		return last;
	};

	//获取表格全部数据 / 指定列
	table.batchDatas = function(id, colnames, flag) {
		var coldata = [],
			data = table.cache[id];

		if (!data) return {};

		colnames = $.type(colnames) === 'array' ? colnames : [colnames];

		if (flag == 'colstr' && colnames.length > 1) {
			return hint.error('There are too many columns to convert to string');
		}

		if (colnames.length) {
			hayui.each(data, function(i, item) {
				var colitem = {};
				hayui.each(colnames, function(idx, name) {
					if (typeof item[name] != undefined) {
						if (flag == 'colstr') {
							coldata.push(item[name]);
						} else {
							colitem[name] = item[name];
						}
					}
				});
				if (!$.isEmptyObject(colitem)) {
					coldata.push(colitem);
				}
			});
		}

		var last = {};
		switch (flag) {
			case 'all':
				last = {
					alldata: data
				};
				break;
			case 'col':
				last = {
					coldata: coldata
				};
				break;
			case 'colstr':
				last = {
					coldata: coldata.join(',')
				};
				break;
			default:
				last = {
					alldata: data, //所有数据
					coldata: coldata //指定列的数据
				};
				break;
		}
		return last;
	};

	//获取表格排序数据 / 指定列
	table.movesortDatas = function(id, colnames, flag, moveparm) {
		if (!moveparm || !moveparm['obj']) {
			return hint.error('There are moveparam error');
		}

		if (flag == 'colstr') {
			return hint.error('move sort datas not support this flag "colstr"');
		}

		var obj = moveparm['obj'];
		var data = obj.data;
		var batchdata = table.batchDatas(id, colnames, flag);

		var orderid = moveparm['orderid'] || 'orderid';
		var id = moveparm['id'] || 'id';

		var getlast = function(movedatas) {
			$.each(movedatas, function(idx, item) {
				if (item[id] == data[id]) {
					movedatas[idx][orderid] = movedatas[idx][orderid] + obj.othis.data('flag');
				}
			});
			return movedatas;
		};

		var last = {};
		switch (flag) {
			case 'all':
				last = {
					alldata: getlast(batchdata.alldata)
				};
				break;
			case 'col':
				last = {
					coldata: getlast(batchdata.coldata)
				};
				break;
			default:
				last = {
					alldata: getlast(batchdata.alldata),
					coldata: getlast(batchdata.coldata)
				};
				break;
		}
		return last;
	};

	//表格重载
	thisTable.config = {};
	table.reload = function(id, options) {
		var config = thisTable.config[id];
		options = options || {};
		if (!config) return hint.error('The ID option was not found in the table instance');
		if (options.data && options.data.constructor === Array) delete config.data;
		return table.render($.extend(true, {}, config, options));
	};
	//核心入口
	table.render = function(options) {
		var inst = new Class(options);
		return thisTable.call(inst);
	};

	//清除临时Key
	table.clearCacheKey = function(data) {
		data = $.extend({}, data);
		delete data[table.config.checkName];
		delete data[table.config.indexName];
		return data;
	};

	//自动完成渲染
	table.init();

	exports(MOD_NAME, table);
});