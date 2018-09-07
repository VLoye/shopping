/**
@Name：hayui.selectcate【选择系统分类】
@Author：hallelujah
*/
hayui.define('jquery', function(exports) {
	"use strict";

	var $ = hayui.$,
		MOD_NAME = 'selectcate',
		hint = hayui.hint();

	//selectcate struct
	var Selectcate = function(options) {
		var that = this;
		that.config = $.extend({}, that.config, Selectcate.config, options);
	};

	//global set
	Selectcate.prototype.set = function(options) {
		var that = this;
		$.extend(true, that.config, options);
		return that;
	};

	//config
	Selectcate.prototype.config = {
		elem: '',
		data: {},
		selected:[],
		cont: '[hay-selcate="panelcont"]',
		tips: ['[hay-selcate="paneltips"]', '<span class="hayui-color-gray">您当前选择的类目：</span>', '<label>暂未选择</label>'],
		box: '[hay-selcate="catebox"]',
		list: '[hay-selcate="catelist"]',
		item: '[hay-selcate="listitem"]',
		itmeActive: 'active',
		defaultShow: {
			pid: ['0'],
			level: 1
		},
		btn: [false, '.next', 'btn-disabled', 'jsBoolExtend'],
		inpt:['inpt_seled_ID', 'inpt_seled_NAME', 'hay-selcate="hideval"'],
		afterClick: $.noop
	};

	Selectcate.prototype.init = function(elem) {
		var that = this,
			o = that.config,
			target = elem;

		//get opts inline
		var dataOpts = target.attr('data-opts');
		if (dataOpts) {
			dataOpts = eval('(' + dataOpts + ')');
			o = $.extend({}, o, dataOpts);
		}
		var cont = $(o.cont, target);

		if (o.defaultShow.level != -1) {
			var levelData_0 = that.getCateDatesByPid(o.data, o.defaultShow.pid, target);
			levelData_0.level = o.defaultShow.level;
			that.setCateHtml(cont, levelData_0, o, target);
		}

		if (!o.btn[0]) {
			$(o.btn[1]).addClass(o.btn[2]);
		}

		that.set(o);

		return that;
	};

	Selectcate.prototype.checkSelected = function(_id) {

		var that = this;

		var t = $(_id);

		var cont = $(that.config.cont, t);

		return that.checkSelIsLastLevel(cont, that.config);
	};

	Selectcate.prototype.bindEvent = function(cont, level, o, t) {
		var that = this;
		$(o.item, $(o.box + '[data-level="' + level + '"]')).off().on({
			click: function(e) {
				var item = $(this);

				if(item.hasClass('disabled')){
					return false;
				}

				var pid = item.attr('data-id');
				var level = item.parents(o.box).attr('data-level');
				var levelData = that.getCateDatesByPid(o.data, pid, t);
				item.addClass(o.itmeActive).siblings().removeClass(o.itmeActive);
				item.parents(o.box).attr({
					'data-selVal': pid
				});
				levelData.level = parseInt(level, 10) + 1;
				that.setCateHtml(cont, levelData, o);
				o.afterClick(cont, level, o, t);

				if (that.checkSelIsLastLevel(cont, o) || eval(o.btn[3])) {
					$(o.btn[1]).removeClass(o.btn[2]);
				} else {
					if (!o.btn[0]) {
						$(o.btn[1]).addClass(o.btn[2]);
					}
				}
			}
		});
	};

	Selectcate.prototype.setLastSelTips = function(cont, o, t) {
		var that = this;

		var tips = $(o.tips[0], t);

		var tipText = '';
		var selteds = [];
		$(o.box, cont).each(function(index, box) {

			var b = $(box);
			$(o.item, b).each(function(i, item) {
				var it = $(item);

				if (it.hasClass(o.itmeActive)) {
					var name = $('a', it).text();
					tipText += name + '<i> &gt; </i>';
					selteds.push({id:it.data('id'), name:name});
				}
			});
		});
		tipText = tipText == '' ? o.tips[2] : tipText;

		var lastidx = tipText.lastIndexOf('<i> &gt; </i>');
		if (lastidx == tipText.length - 13) {
			tipText = tipText.substr(0, lastidx);
		}
		tips.html(o.tips[1] + tipText);

		var hideinpt = [];
		$.each(selteds, function(idx, item){
			hideinpt.push('<input id="'+ o.inpt[0] + (idx + 1) +'" name="'+o.inpt[1] + (idx + 1) +'" '+ (o.inpt[2].length ? o.inpt[2] : '') +' type="hidden" data-name="'+ item.name +'" value = ' + item.id + ' />');
		});
		tips.append(hideinpt.join(''));
	};

	Selectcate.prototype.isSelected = function(o, level, item){
		var that = this;
		var bool = [];
		$.each(o.selected, function(idx, selitem){
			selitem = selitem.split('|');
			if(level == selitem.length && selitem[level -1] == item.name){
				var box =  $(o.box + '[data-level="1"]');
				var idx = box.attr('data-selval');
				var text = $(o.item + '[data-id="'+ idx +'"] a', box).text();
				if(text == selitem[0]){
					bool.push(item.name);
				}
			}
		});
		return bool.length > 0;
	};

	Selectcate.prototype.setCateHtml = function(cont, data, o, t) {
		var that = this;

		$(o.box + '[data-level="' + (data.level - 1) + '"]', cont).nextAll().remove();
		that.setLastSelTips(cont, o, t);

		if (data.items.length > 0) {

			var levelBox = $(o.box + '[data-level="' + data.level + '"]', cont);

			if (levelBox.length < 1) {
				var html = '<div class="uplink-box" ' + o.box.replace('[', '').replace(']', '') + ' data-level="' + data.level + '">' + '<ul class="ub-ul" ' + o.list.replace('[', '').replace(']', '') + '>' + '</ul>' + '</div>';
				cont.append(html);
				levelBox = $(o.box + '[data-level="' + data.level + '"]', cont);
			}

			var list = '';

			$.each(data.items, function(index, item) {
				list += '<li ' + (that.isSelected(o, data.level, item) ? 'class="disabled" ' : '') + o.item.replace('[', '').replace(']', '') + 'data-id="' + item.id + '" data-pid="' + item.pid + '"><a>' + item.name + '</a>';

				if (that.getCateDatesByPid(o.data, item.id, t).items.length > 0) {
					list += '<i class="icon-r"></i>';
				}
				list += '</li>';
			});
			$(o.list, levelBox).html(list);
			that.bindEvent(cont, data.level, o, t);
		} else {
			$(o.box + '[data-level="' + data.level + '"]', cont).nextAll().remove();

		}
	};

	Selectcate.prototype.checkSelIsLastLevel = function(cont, o) {
		var that = this;

		var bools = [];
		$(o.box, cont).each(function(index, el) {
			bools.push($(el).attr('data-selVal') != undefined);
		});
		if ($.inArray(false, bools) != -1) {
			return false;
		}
		return true;
	};

	Selectcate.prototype.getCateDatesByPid = function(data, pid, t) {
		var that = this;
		var o = that.config;

		var result = {
			items: []
		};

		$.each(data.items, function(index, item) {

			pid = ($.type(pid) === 'array' ? pid[0] : pid);
			item.pid = ($.type(item.pid) === 'array' ? item.pid : item.pid.split(','));

			if ($.inArray(pid, item.pid) != -1) {

				if (item.fid != undefined) {

					var levelSelId = $('#' + o.inpt[0] + '1', t).val();
					item.fid = ($.type(item.fid) === 'array' ? item.fid : item.fid.split(','));

					if ($.inArray(levelSelId, item.fid) != -1) {
						result.items.push(item);
					}
				} else {
					result.items.push(item);
				}

			}
		});

		return result;
	};

	//暴露接口
	exports(MOD_NAME, function(config) {
		var selectcate = new Selectcate(config = config || {});
		var elem = $(config.elem);
		if (!elem[0]) {
			return hint.error('hayui.selectcate 没有找到' + config.elem + '元素');
		}
		return selectcate.init(elem);
	});
}).addcss('selectcate.css', '', '', 'base', 'leagueradmin/');