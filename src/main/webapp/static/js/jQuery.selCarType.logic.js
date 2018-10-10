hayui.use(['layer', 'util'], function(layer, util) {});
var layer = hayui.layer;
//最近使用
var newlyData = ("undefined" == typeof newlyDataId) ? [] : getDatasSomeByIds(carTypeSourceData, newlyDataId);

//编辑文本框的值
var editIds = (isCar == 1 ? $('#js_selCarTypeId', window.parent.document.body).val() : $('#js_selJiTypeId', window.parent.document.body).val());

//编辑数据
var editSelData = getDatasSomeByIds(carTypeSourceData, editIds);

//分组重组后的数据
var dataGroup = groupData(carTypeSourceData);

//最终提交的数据
var lastData = {
	id: [],
	name: []
};

var lastData_com = {
	id: [],
	name: []
};


//编辑时选中的车型
var myCarTypeSelIds = (isCar == 1 ? $('#js_selCarTypeId_com', window.parent.document.body).val() : $('#js_selJiTypeId_com', window.parent.document.body).val());

var myCarTypeSel = getDatasByIds_com(myCarType, myCarTypeSelIds);


//文字
var tits = (isCar == 1 ? '车型' : '机型');

//编辑填充数据
if (editSelData.length > 0) {
	$.each(editSelData, function(index, item) {
		$('#js_alreadySelTypeBox').append('<li data-pname="' + item.pname + '" data-pid="' + item.pid + '" id="' + item.id + '"><label>' + item.name + '</label><span>×</span></li>');
		pushIdAndName(item.id, item.pname + '*~*' + item.name, lastData);
	});

	var cusInpt = $('#js_inptCusCarType input');
	if ($.trim(cusInpt.val())) {
		$('#js_noCusCarType').addClass('hide');
		$('#js_inptCusCarType').removeClass('hide');
	}
}

//编辑填充数据com自定义车型
if (myCarTypeSel.length > 0) {
	$.each(myCarTypeSel, function(index, item) {
		$('#js_alreadySelTypeBox').append('<li data-pname="其它" is_com="true" id="' + item.id + '"><label>' + item.name + '</label><span>×</span></li>');
		pushIdAndName(item.id, '其它*~*' + item.name, lastData_com);
	});
}


//xj set last car types table
jQuery.xjSetCarType = {
	setLastCarTypesTable: function(_id, myCarType, _isCar, bool) {

		var _lastData = {
			id: [],
			name: []
		};

		var _lastData_com = {
			id: [],
			name: []
		};

		var _editIds = (_isCar == 1 ? $('#js_selCarTypeId').val() : $('#js_selJiTypeId').val());
		var _editSelData = getDatasSomeByIds(carTypeSourceData, _editIds);

		if (_editSelData.length > 0) {
			$.each(_editSelData, function(index, item) {
				pushIdAndName(item.id, item.pname + '*~*' + item.name, _lastData);
			});
		}

		var _myCarTypeSelIds = (_isCar == 1 ? $('#js_selCarTypeId_com').val() : $('#js_selJiTypeId_com').val());
		var _myCarTypeSel = getDatasByIds_com(myCarType, _myCarTypeSelIds);

		if (_myCarTypeSel.length > 0) {
			$.each(_myCarTypeSel, function(index, item) {
				pushIdAndName(item.id, '其它*~*' + item.name, _lastData_com);
			});
		}

		var html = setLastTable($.merge(_lastData.name, _lastData_com.name), bool, _isCar);

		html.length > 0 ? $('#' + _id).html(html) : '';
	}
};



function delMyById(datas, id) {
	var sub = [];
	sub = $.grep(datas, function(item, index) {
		return item.id == id;
	}, true);
	return sub;
};

function delNewMyByIds(ids, id) {
	ids = ($.type(ids) === 'array' ? ids : ids.split(','));
	var sub = [];
	sub = $.grep(ids, function(item, index) {
		return item == id;
	}, true);
	return sub;
};

function getDatasByIds_com(datas, ids) {
	if (!ids) {
		return [];
	}
	var subDatas = [];
	ids = ($.type(ids) === 'array' ? ids : ids.split(','));
	var sub = [];
	$.each(ids, function(i, id) {
		sub = $.grep(datas, function(item, index) {
			return item.id == id;
		}, false);
		sub.length > 0 ? subDatas.push(sub[0]) : '';
	});
	return subDatas;
};


//根据id获取数据（pid & pname）
function getDatasSomeByIds(datas, ids) {
	if (!ids) {
		return [];
	}
	var subDatas = [];
	ids = ($.type(ids) === 'array' ? ids : ids.split(','));
	for (var j = 0; j < datas.length; j++) {
		var sub = [];
		$.each(ids, function(i, id) {
			sub = $.grep(datas[j].carType, function(item, index) {
				return item.id == id;
			}, false);
			if (sub.length > 0) {
				sub[0].pid = datas[j].id;
				sub[0].pname = datas[j].brandName;
				subDatas.push(sub[0]);
			}
		});
	}
	return subDatas;
};


//根据id获取数据
function getDatasByIds(datas, ids) {
	var subDatas = [];
	ids = ($.type(ids) === 'array' ? ids : ids.split(','));
	for (var j = 0; j < datas.length; j++) {
		var sub = [];
		$.each(ids, function(i, id) {
			sub = $.grep(datas[j].carType, function(item, index) {
				return item.id == id;
			}, false);
			sub.length > 0 ? subDatas.push(sub[0]) : '';
		});
	}
	return subDatas;
}
//根据分组重构数据
function groupData(array) {
	var dataArr = [],
		arr = [];
	for (var i = 0; i < array.length; i++) {
		arr.push(array[i].group);
	}
	arr = uniQueue(arr.sort());

	for (var j = 0; j < arr.length; j++) {
		var g = {};
		g.group = arr[j];
		g.conts = [];
		for (var k = 0; k < array.length; k++) {
			if (array[k].group == arr[j]) {
				g.conts.push(array[k]);
			}
		}
		dataArr.push(g);
	}
	return dataArr;
}
//去除数组中重复的数据
function uniQueue(array) {
	var arr = [],
		m;
	while (array.length > 0) {
		m = array[0];
		arr.push(m);
		array = $.grep(array, function(n, i) {
			return n == m;
		}, true);
	}
	return arr;
}
//记忆选中
function memorySelType(id, object) {
	return ($.inArray(id, object.id) == -1 ? false : true);
}
//添加数据
function pushIdAndName(id, name, object) {
	object.id.push(parseInt(id, 10));
	object.name.push(name);
}
//删除数据
function spliceIdAndName(id, name, object) {
	object.id.splice($.inArray(parseInt(id, 10), object.id), 1);
	object.name.splice($.inArray(name, object.name), 1);
}

//匹配是否型号同名
function matchTypeName(datas, name) {
	var reArr = {};
	$.each(datas, function(index, el) {
		$.each(el.carType, function(i, ct) {
			if (ct.name.toUpperCase() == name.toUpperCase()) {
				reArr.carType = ct;
				reArr.carBand = el;
			}
		});
	});
	return reArr;
}

//匹配是否品牌同名
function matchBrandName(datas, name) {
	var reArr = {};
	$.each(datas, function(index, el) {
		if (el.brandName.toUpperCase() == name.toUpperCase()) {
			reArr.carBand = el;
		}
	});
	return reArr;
}

//group table data
function groupTableData(data) {
	var splitArr = [];
	$.each(data, function(index, item) {
		var temp = item.split('*~*');
		splitArr.push({
			pname: temp[0],
			name: temp[1]
		});
	});

	var tempArr = [];
	var newData = [];

	$.each(splitArr, function(i1, l1) {
		var tempData = {};
		tempData.pname = l1.pname;
		tempData.subname = $.grep(splitArr, function(n2, i2) {
			return (n2.pname == l1.pname && $.inArray(l1.pname, tempArr) == -1);
		});
		tempArr.push(l1.pname);
		tempData.subname.length > 0 && newData.push(tempData);
	});
	return newData;
}

//set last table
function setLastTable(data, bool, isCar) {
	bool = ("undefined" == typeof bool) ? true : bool;
	var tableData = groupTableData(data);
	if (tableData.length > 0) {
		var tit = (isCar == 1 ? ['汽车品牌', '车型'] : ['机型品牌', '机型']);

		var table = $('<table class="hayui-table hayui-mt5" hay-size="sm"  style="width:800px;"><thead><tr><th width="25%">' + tit[0] + '</th><th width="75%">' + tit[1] + '</th></tr></thead><tbody></tbody></table>');
		var tbody = $('tbody', table);

		$.each(tableData, function(i1, t1) {
			var tr = '';
			var t1L = bool ? t1.subname.length : 1;
			tr += '<tr><td rowspan="{t1}">' + t1.pname + '</td>';
			var names = [];
			$.each(t1.subname, function(i2, t2) {
				if (bool) {
					i2 > 0 ? tr += '<tr><td class="ta-l">' + t2.name + '</td></tr>' : tr += '<td class="ta-l">' + t2.name + '</td></tr>';
				} else {
					names.push(t2.name);
				}
			});
			bool ? '' : tr += '<td class="ta-l">' + names.join(',') + '</td></tr>';
			tr = tr.replace(/{t1}/, t1L);
			tbody.append(tr);
		});
		var div = $('<div></div>').append(table);
		return div.html();
	}
	return '';
}


//nav click
$('[jsIsNav="true"]').delegate('li', 'click', function() {
	var i = $(this).index();
	$(this).addClass('active').siblings().removeClass('active');
	$('[jsIsCont="true"]').eq(i).removeClass('hide').siblings().addClass('hide');
});

//nav li 0 click
$('[jsIsNav="true"]').delegate('li:eq(0)', 'click', function() {
	var allLetters = [];

	$.each(carTypeSourceData, function(i, item) {
		allLetters.push('<a>' + item.initial.toUpperCase() + '</a>');
	});
	$('#js_letterBox').html('<a class="a-all" isAll="true">全部</a>' + uniQueue(allLetters.sort()).join(''));

	$('#js_letterBox a[isAll="true"]').trigger('click');
});

//nav li 1 click
$('[jsIsNav="true"]').delegate('li:eq(1)', 'click', function() {
	if ($('#js_searchTypeBtn input').val() != '') {
		$('#js_searchTypeBtn span').trigger('click');
	}

});

//nav li 2 click
$('[jsIsNav="true"]').delegate('li:eq(2)', 'click', function() {
	var newlyHtml = '';
	$.each(newlyData, function(i, item) {
		newlyHtml += '<li data-pname="' + item.pname + '" class="' + (memorySelType(item.id, lastData) ? 'active' : '') + '" id="' + item.id + '"><div class="check-box ' + (memorySelType(item.id, lastData) ? 'check-box-checked' : '') + '"><i><em></em></i><label>' + item.name + '</label></div></li>';
	});

	//最近使用com自定义
	var newlyHtml_com = '';
	$.each(getDatasByIds_com(myCarType, myCarTypeNewly), function(i, item) {
		newlyHtml_com += '<li is_com="true" data-pname="其它" class="' + (memorySelType(item.id, lastData_com) ? ' active' : '') + '" id="' + item.id + '"><div class="check-box ' + (memorySelType(item.id, lastData_com) ? 'check-box-checked' : '') + '"><i><em></em></i><label>' + item.name + '</label></div></li>';
	});
	newlyHtml += (newlyHtml_com == '' ? '' : '<li class="com-border"><span>以下是自定义' + tits + '</span></li>' + newlyHtml_com);

	newlyHtml = (newlyHtml == '' ? '<li class="search-none">暂无最近使用' + tits + '</li>' : newlyHtml);
	$('#js_newlyTypeBox').html(newlyHtml);

});

//nav li 3 click
$('[jsIsNav="true"]').delegate('li:eq(3)', 'click', function() {
	var addHtml = '';
	$.each(myCarType, function(i, item) {
		addHtml += '<li is_com="true" class="' + (memorySelType(item.id, lastData_com) ? ' active' : '') + '" id="' + item.id + '"><div class="check-box ' + (memorySelType(item.id, lastData_com) ? 'check-box-checked' : '') + '"><i><em></em></i><label>' + item.name + '</label></div><a title="删除" class="tua-del" isCusDel="true">×</a></li>';
	});
	addHtml = (addHtml == '' ? '<li class="search-none" style="margin-top:10%;">暂无自定义' + tits + '</li>' : addHtml);
	$('#js_addTypeBox').html(addHtml);
});

//letter a click
$('#js_letterBox').delegate('a', 'click', function() {
	var t = $(this);
	t.addClass('active').siblings().removeClass('active');

	var allLetterResultHtml = '';
	if (t.attr('isAll')) {
		$.each(dataGroup, function(i, item) {
			for (var k = 0; k < item.conts.length; k++) {
				var cont = item.conts[k];
				if (i > 0 && k == 0) {
					allLetterResultHtml += '<span class="s-line"></span>';
				}
				allLetterResultHtml += '<a id="' + cont.id + '">' + cont.brandName + '</a>';
			}
		});
		$('#js_letterResultBox').html(allLetterResultHtml);

		var brandId = $('#js_selCarType').attr('brandId');
		$('#js_letterResultBox a[id="' + brandId + '"]').trigger('click');

	} else {
		var letter = t.text();

		$.each(carTypeSourceData, function(i, item) {
			letter == item.initial ? (allLetterResultHtml += '<a id="' + item.id + '">' + item.brandName + '</a>') : '';
		});

		$('#js_letterResultBox').html(allLetterResultHtml);
		$('#js_selCarType').removeAttr('brandId').html('');
		$('#js_filterType').addClass('hide').siblings('dd:hidden').removeClass('hide');
	}
});

// letter result li click
$('#js_letterResultBox').delegate('a', 'click', function() {
	var t = $(this);
	t.addClass('active').siblings().removeClass('active');
	$('#js_filterType').removeClass('hide').siblings('dd:visible').addClass('hide');
	$('#js_filterType input').val('');

	var name = t.text();
	var brandId = '';
	var carTypeHtml = ''; +

	$.each(carTypeSourceData, function(i, item) {
		if (name == item.brandName) {
			brandId = item.id;
			for (var i = 0; i < item.carType.length; i++) {
				carTypeHtml += '<li data-pname="' + name + '" data-pid="' + brandId + '" class="' + (memorySelType(item.carType[i].id, lastData) ? 'active' : '') + '" id="' + item.carType[i].id + '"><div class="check-box ' + (memorySelType(item.carType[i].id, lastData) ? 'check-box-checked' : '') + '"><i><em></em></i><label>' + item.carType[i].name + '</label></div></li>';
			}
		}
	});

	$('#js_selCarType').attr({
		brandId: brandId
	}).html(carTypeHtml);
});

//filter input
$('#js_filterType').delegate('input', 'keyup', function(event) {
	var t = $(this);
	var text = t.val().toUpperCase();
	var id = $('#js_selCarType').attr('brandId');

	if (id != '') {
		var filterTypeHtml = '';
		var carTypeData = $.grep(carTypeSourceData, function(item, index) {
			return item.id == id;
		}, false);

		if (carTypeData.length > 0) {
			$.each(carTypeData[0].carType, function(i, item) {
				if (item.name.toUpperCase().indexOf(text) != -1) {
					filterTypeHtml += '<li class="' + (memorySelType(item.id, lastData) ? 'active' : '') + '" id="' + item.id + '"><div class="check-box ' + (memorySelType(item.id, lastData) ? 'check-box-checked' : '') + '"><i><em></em></i><label>' + item.name + '</label></div></li>';
				}
			});
		}

		filterTypeHtml = (filterTypeHtml == '' ? '<li class="filter-none">未筛选到匹配' + tits + '</li>' : filterTypeHtml);
		$('#js_selCarType').html(filterTypeHtml);
	}
});

//checkbox click
$('[isCarType="true"]').delegate('.check-box', 'click', function() {
	var t = $(this);
	var tp = t.parent('li');
	var id = tp.attr('id');
	var pid = tp.attr('data-pid');
	var pname = tp.attr('data-pname');

	t.toggleClass('check-box-checked');
	tp.toggleClass('active');

	if (t.hasClass('check-box-checked')) {
		var name = t.children('label').text();
		if (tp.attr('is_com')) {
			pushIdAndName(id, '其它*~*' + name, lastData_com);
			$('#js_alreadySelTypeBox').append('<li data-pid="0" data-pname="其它" is_com="true" id="' + id + '"><label>' + name + '</label><span>×</span></li>');
		} else {
			pushIdAndName(id, pname + '*~*' + name, lastData);
			$('#js_alreadySelTypeBox').append('<li data-pid="' + pid + '" data-pname="' + pname + '" id="' + id + '"><label>' + name + '</label><span>×</span></li>');
		}

	} else {
		var name = '';
		if (tp.attr('is_com')) {
			name = $('#js_alreadySelTypeBox li[is_com="true"][id="' + id + '"]').children('label').text();
			spliceIdAndName(id, '其它*~*' + name, lastData_com);
			$('#js_alreadySelTypeBox li[is_com="true"][id="' + id + '"]').remove();
		} else {
			name = $('#js_alreadySelTypeBox li[id="' + id + '"]').children('label').text();
			var pname = $('#js_alreadySelTypeBox li[id="' + id + '"]').attr('data-pname');
			spliceIdAndName(id, pname + '*~*' + name, lastData);
			$('#js_alreadySelTypeBox li[id="' + id + '"]').remove();
		}
	}

	if (lastData.name.length < 1 && lastData_com.name.length < 1) {
		$('#js_subCarType').addClass('btn-disabled').html('请选择' + tits);
	} else {
		$('#js_subCarType').removeClass('btn-disabled').html('提交' + tits);
	}
});

//already select type click
$('#js_alreadySelTypeBox').delegate('li span', 'click', function() {
	var t = $(this);
	var tp = t.parent('li');
	var id = tp.attr('id');
	var name = tp.children('label').text();
	var ctLi = $('[isCarType="true"] li[id="' + id + '"]');
	if (tp.attr('is_com')) {
		ctLi = $('[isCarType="true"] li[is_com="true"][id="' + id + '"]');
		spliceIdAndName(id, '其它*~*' + name, lastData_com);
	} else {
		var pname = tp.attr('data-pname');
		spliceIdAndName(id, pname + '*~*' + name, lastData);
	}

	$('.check-box', ctLi).removeClass('check-box-checked');
	ctLi.removeClass('active');
	tp.remove();
	if (lastData.name.length < 1 && lastData_com.name.length < 1) {
		$('#js_subCarType').addClass('btn-disabled').html('请选择' + tits).die('click');
	}
});

//search btn click
$('#js_searchTypeBtn').delegate('span', 'click', function(event) {
	var t = $(this);
	var tp = t.parent();
	var tText = tp.children('input').val().toUpperCase();
	var searchTypeHtml = '';

	if ($.trim(tText) != '') {
		$.each(carTypeSourceData, function(i, item) {
			for (var i = 0; i < item.carType.length; i++) {
				var brandname = item.brandName;
				var brandid = item.id;
				if (item.carType[i].name.toUpperCase().indexOf(tText) != -1) {
					searchTypeHtml += '<li data-pid="' + brandid + '" data-pname="' + brandname + '" class="' + (memorySelType(item.carType[i].id, lastData) ? 'active' : '') + '" id="' + item.carType[i].id + '"><div class="check-box ' + (memorySelType(item.carType[i].id, lastData) ? 'check-box-checked' : '') + '"><i><em></em></i><label>' + item.carType[i].name + '</label></div></li>';
				}
			}
		});
	}
	searchTypeHtml = (searchTypeHtml == '' ? '<li class="search-none">未搜索到匹配' + tits + '</li>' : searchTypeHtml);
	$('#js_searchTypeBox').html(searchTypeHtml);
});

//customer input
$('body').delegate('#js_noCusCarType', 'click', function() {
	$(this).remove();
	$('#js_inptCusCarType').removeClass('hide').find('input').focus().keyup(function(event) {
		if ($.trim($('#js_inptCusCarType input').val())) {
			$('#js_subCarType').removeClass('btn-disabled').html('提交' + tits);
		} else {
			$('#js_subCarType').addClass('btn-disabled').html('请选择' + tits);
		}
	});
});

//customer add type
$('#js_addTypeBtn').delegate('span', 'click', function() {
	var t = $(this).parent();
	var typeVal = $.trim($('input:text', t).val());
	var UTIL = hayui.util;
	var len = UTIL.getStrLength(typeVal);

	if (len > 0 && len <= 40) {
		var matchArr = matchTypeName(carTypeSourceData, typeVal);
		var matchbrand = matchBrandName(carTypeSourceData, typeVal);

		var isMyRepeat = false;
		$('#js_addTypeBox li').each(function() {
			var t = $(this).find('label').text();
			if ($.trim(t).toUpperCase() == typeVal.toUpperCase()) {
				isMyRepeat = true;
				return;
			}
		});

		if (isMyRepeat) {
			$('#js_addTypeTips').html('您已添加 "' + typeVal + ' "，无法重复添加!');
			return;
		} else if (!$.isEmptyObject(matchbrand)) {
			$('#js_addTypeTips').html('您要添加的"' + typeVal + '" 与' + tits + '品牌 "' + matchbrand.carBand.brandName + '" 同名，无法自定义添加!');
			return;
		} else if (!$.isEmptyObject(matchArr)) {
			$('#js_addTypeTips').html('"' + typeVal + '" 已包含在' + tits + '品牌 "' + matchArr.carBand.brandName + '" 中，无法自定义添加!');
			return;
		} else {
			$('#js_addTypeTips').html('');

			if (addurl.length > 0) {
				$.ajax({
					url: addurl,
					type: 'post',
					async: false,
					data: {
						cname: typeVal
					},
					success: function(result, status) {
						result = eval('(' + result + ')');
						if (!$.isEmptyObject(result)) {
							layer.msg('添加成功');
							myCarType.push(result);
							$('#js_addTypeBox li.search-none').remove();
							var addTypeHtml = $('<li is_com="true" class="' + (memorySelType(result.id, lastData) ? ' active' : '') + '" id="' + result.id + '"><div class="check-box ' + (memorySelType(result.id, lastData) ? 'check-box-checked' : '') + '"><i><em></em></i><label>' + result.name + '</label></div><a title="删除" class="tua-del" isCusDel="true">×</a></li>');
							$('#js_addTypeBox').append(addTypeHtml);
							$('.check-box', addTypeHtml).trigger('click');
						}
					}
				});
			}
		}
	} else {
		$('#js_addTypeTips').html('请输入1-20个字');
	}
});

// customer add type to del
$('#js_addTypeBox').delegate('[isCusDel="true"]', 'click', function() {
	var t = $(this);
	var li = t.parents('li');
	var id = li.attr('id');
	var name = $.trim(li.find('label').text());
	var chk = $('.check-box-checked', $('[isCarType="true"] li[is_com="true"][id="' + id + '"]'));
	if (delurl.length > 0) {
		layer.confirm('删除后将影响到选择过此' + tits + '的产品,<br/>您确定要删除此车型吗？', {
			icon: 3,
			title: '提示'
		}, function(index) {
			$.ajax({
				url: delurl,
				type: 'post',
				async: false,
				data: {
					id: id
				},
				success: function(result, status) {
					result = eval('(' + result + ')');
					if (result.ok) {
						layer.msg('删除成功');
						myCarTypeNewly = delNewMyByIds(myCarTypeNewly, id);
						myCarType = delMyById(myCarType, id);
						chk.trigger('click');
						li.remove();
						layer.close(index);
					}
				}
			});
		});;
	}
});


$(function() {
	if (lastData.name.length < 1 && lastData_com.name.length < 1) {
		$('#js_subCarType').addClass('btn-disabled').html('请选择' + tits);
	} else {
		$('#js_subCarType').removeClass('btn-disabled').html('提交' + tits);
	}
	$('[jsisnav="true"] li:eq(0)').trigger('click');
});

//submit btn click
$('body').delegate('#js_subCarType', 'click', submitCarType);

// submit car type
function submitCarType() {
	if ($(this).hasClass('btn-disabled')) {
		return false;
	}
	var cusInpt = $('#js_inptCusCarType input');
	if ($.trim(cusInpt.val())) {
		lastData.name.push(cusInpt.val());
	}
	if (lastData.name.length < 1 && lastData_com.name.length < 1) {
		layer.confirm('您未选择任何选项，确定要离开吗?', {
			icon: 3,
			title: '提示'
		}, function(index) {
			layer.close(index);
		});
	} else {
		setSubVals();
		var index = parent.layer.getFrameIndex(window.name);
		parent.layer.close(index);
	}
};

function setSubVals() {
	if (isCar == 1) {
		$('#js_selCarTypeId', window.parent.document.body).val(lastData.id.join(','));
		$('#js_selCarTypeName', window.parent.document.body).html(setLastTable($.merge(lastData.name, lastData_com.name), true, isCar));
		$('#js_selCarTypeId_com', window.parent.document.body).val(lastData_com.id.join(','));
	} else {
		$('#js_selJiTypeId', window.parent.document.body).val(lastData.id.join(','));
		$('#js_selJiTypeName', window.parent.document.body).html(setLastTable($.merge(lastData.name, lastData_com.name), true, isCar));
		$('#js_selJiTypeId_com', window.parent.document.body).val(lastData_com.id.join(','));
	}
};