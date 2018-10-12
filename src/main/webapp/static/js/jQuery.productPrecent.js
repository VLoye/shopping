hayui.use('fixedlocation', function() {

	var $ = hayui.$;

	hayui.fixedlocation({
		elem: '#js_fixedTopRight',
		location: 'CR',
		isTogHide: 'r',
		backFun: function(t, isIE6) {
			//优化建议隐藏与显示
			$('#js_hideShow').on('click', function() {
				var h = $(this);
				var s = h.find('span');
				var hp = h.parents('#js_fixedTopRight');
				var hn = hp.find('#js_hideCont');

				var css = {},
					fun = null,
					an = null;

				if (isIE6) {

					an = hn;

					if (parseInt(hp.css('width'), 10) <= 0) {

						css = {
							'width': '195px'
						};
						fun = function() {
							s.html('<i class="hayui-icon hayui-icon-arrowright"></i>');
							hp.css({
								'width': '195px',
								'border-width': '1px'
							});
						};

					} else {

						css = {
							'width': '0',
							'overflow': 'hidden'
						};
						hp.css({
							'width': '0'
						});
						fun = function() {
							s.html('<i class="hayui-icon hayui-icon-arrowleft"></i>');
							hp.css({
								'width': '0',
								'border-width': '0'
							});
						};

					}
				} else {

					an = hp;

					if (parseInt(hp.css('right'), 10) < 0) {

						css.right = '0';
						fun = function() {
							s.html('<i class="hayui-icon hayui-icon-arrowright"></i>');
						};

					} else {

						css.right = '-200px';
						fun = function() {
							s.html('<i class="hayui-icon hayui-icon-arrowleft"></i>');
						};
					}
				}
				//执行动画
				an.stop().animate(css, 300, fun);
			});
		}
	});

});


$(function() {
	//绑定事件
	_Event.init();
	//页面类型
	ProductProcess.getPageType($("#pagetype").val());
	//设置表单action
	if (ProductProcess.pageType == "edit") {
		Score.setStarGrade();
	}
});
//产品
var ProductProcess = {
	isEdited: true,
	pageType: false,
	pageForm: {},
	getPageType: function(a) {
		this.pageType = a;
	}
};
//分数
var Score = {
	all: 0,
	titleScore: 0,
	accNumScore: 0,
	paramScore: 0,
	picScore: 0,
	detailScore: 0,
	//计算总分数
	setAllScore: function() {
		var ti = this.titleScore * 0.15;
		var ac = this.accNumScore * 0.15;
		var pa = this.paramScore * 0.20;
		var pc = this.picScore * 0.15;
		var de = this.detailScore * 0.35;
		this.all = Math.ceil(ti + ac + pa + pc + de);
		$("#integrScore").val(this.all);
		$("#titleScore").val(this.titleScore);
		$("#accNumScore").val(this.accNumScore);
		$("#paramScore").val(this.paramScore);
		$("#picScore").val(this.picScore);
		$("#detailScore").val(this.detailScore);

		var s = this.calcStarGrade(this.all);
		$('#starLevel').val(s.star);
	},
	//星级值
	setStarGrade: function() {
		var form = hayui.form;
		var verify = form.doAllverify('form-add');

		Score.calcTitleScore();
		Score.calcAccNumScore();
		Score.calcParamScore();
		Score.calcPicScore();
		Score.calcDetailScore();

		var csg_2 = parseInt($('#f_fen2').val()); //产品标题
		var csg_5 = parseInt($('#f_fen5').val()); //配件图号
		var csg_1 = parseInt($('#f_fen1').val()); //基本信息
		var csg_3 = parseInt($('#f_fen3').val()); //图片信息
		var csg_4 = parseInt($('#f_fen4').val()); //详细信息

		$('#csg_2').text(csg_2 + '%');
		$('#csg_5').text(csg_5 + '%');
		$('#csg_1').text(csg_1 + '%');
		$('#csg_3').text(csg_3 + '%');
		$('#csg_4').text(csg_4 + '%');

		var csgAll = csg_2 * 0.15 + csg_5 * 0.15 + csg_1 * 0.20 + csg_3 * 0.15 + csg_4 * 0.35;
		var s = this.calcStarGrade(Math.ceil(csgAll));

		$('#starLevel').val(s.star);

		var b = s.star;
		var starhtml = [];
		for (var i = 0; i < 5; i++) {
			starhtml.push("<i class='hayui-icon hayui-icon-collectfull hayui-fs-14 hayui-color-warm'></i>");
		}
		var repstr = [];
		for (var i = 0; i < 5 - b; i++) {
			repstr.push("<i class='hayui-icon hayui-icon-collect hayui-fs-14 hayui-color-gray'></i>");
		}
		starhtml.splice(b, 5 - b, repstr.join(''));
		$('#csg_star').html(starhtml.join(''));

		// $('#csg_star').css({
		// 	'width': s.csgAll + '%'
		// });

		//去优化
		$('#set_starGrade li').each(function() {
			var t = $(this);
			var s = $('strong', t);
			var sv = parseInt(s.text());
			var a = s.next('a');
			if (sv == 100) {
				a.addClass('hid');
			} else {
				a.removeClass('hid');
			}
		});
	},
	//产品标题分数
	setTitleScore: function(a) {
		var b = parseInt(a);
		$("#f_fen2").val(b);
		this.titleScore = b;
	},
	//产品配件图号分数
	setAccNumScore: function(a) {
		var b = parseInt(a);
		$("#f_fen5").val(b);
		this.accNumScore = b;
	},
	//产品基本信息分数
	setParamScore: function(a) {
		var c = parseInt(a);
		$("#f_fen1").val(c);
		this.paramScore = c;
	},
	//产品图片分数
	setPicScore: function(a) {
		var a = parseInt(a);
		var b = parseInt(a * 33.5);
		$("#f_fen3").val(b);
		this.picScore = b;
	},
	//产品详细说明分数
	setDetailScore: function(a) {
		var c = 0;
		var b = 0;
		var d = 0;
		if (!checkForm.isUndefined(a.img)) {
			c = a.img;
		}
		if (!checkForm.isUndefined(a.content)) {
			b = a.content;
		}
		d = b + c;
		c = c * 6.7;
		b = b * 5;
		d = d * 2.9;
		c = c > 100 ? 100 : parseInt(c);
		b = b > 100 ? 100 : parseInt(b);
		d = d > 100 ? 100 : parseInt(d);
		$("#f_fen4").val(d);
		$("#f_fen4_1").val(b);
		$("#f_fen4_2").val(c);
		this.detailScore = d;
	},
	//计算星级
	calcStarGrade: function(a) {
		var j = {};
		if (a <= 20) {
			star = 1;
			a = 20;
		} else if (20 < a && a <= 40) {
			star = 2;
			a = 40;
		} else if (40 < a && a <= 60) {
			star = 3;
			a = 60;
		} else if (60 < a && a <= 80) {
			star = 4;
			a = 80;
		} else if (80 < a) {
			star = 5;
			a = 100;
		}
		j.csgAll = a;
		j.star = star;
		return j;
	},
	//计算产品标题
	calcTitleScore: function() {
		var a = $("#publish_title").val();
		var e = 0;
		var f = checkForm.getStrLengthGBK(a);

		if (!ProductProcess.isEdited) {
			e = 0;
		} else {
			if (f <= 3) {
				e = 0;
			} else {
				for (var i = 0; i < f - 3; i++) {
					e += 20;
				}
				if (e >= 100) {
					e = 100;
				}
			}
		}
		this.setTitleScore(e);
		this.setAllScore();
	},
	//计算产品配件图号
	calcAccNumScore: function() {
		var a = $.trim($("#accessory_number").val());
		var e = 0;
		e = parseFloat(e);

		var f = a.length;
		if (f == 0) {
			e = 0;
		} else if (0 < f && f <= 3) {
			e = 50;
		} else {
			e = 100;
		}

		this.setAccNumScore(e);
		this.setAllScore();
	},
	//计算产品基本信息
	calcParamScore: function() {
		var all = $("#pro_category_attributes").find(".hayui-form-item");
		var d = all.length;
		var a = 0;
		var names = [];
		$('*[name]', all).each(function() {
			var item = $(this);
			var name = item.attr('name');

			if ($.inArray(name, names) == -1 && name.indexOf('pro_') == -1) {
				names.push(name);

				var elem = $('[name="' + name + '"]');
				var v = elem.val();
				v = v ? v : elem.attr('data-value');
				if ($.trim(v).length > 0) {
					a++;
				}
			}
		});

		// 选择车型和机型 start
		var cx = $("#pro_category_attributes").find('input:hidden[name="pro_chexing"]');
		var cx_com = $("#pro_category_attributes").find('input:hidden[name="pro_chexing_com"]');
		var cx_car = $("#pro_category_attributes").find('input:hidden[name="pro_chexing_car"]');
		var jx = $("#pro_category_attributes").find('input:hidden[name="pro_jixing"]');
		var jx_com = $("#pro_category_attributes").find('input:hidden[name="pro_jixing_com"]');

		if ($.trim(cx.val()).length > 0 || $.trim(cx_com.val()).length > 0 || $.trim(cx_car.val()).length > 0) {
			a++;
		}
		if ($.trim(jx.val()).length > 0 || $.trim(jx_com.val()).length > 0) {
			a++;
		}
		// 选择车型和机型 end

		var f = a * 100 / d;
		f = Math.round(f);
		f = f > 100 ? 100 : f;
		this.setParamScore(f);
		this.setAllScore();
	},
	//计算产品图片
	calcPicScore: function() {
		var a = 0;
		var imgs = $('.hayui-images-upload').find('input:hidden');
		imgs.each(function() {
			if ($(this).val() != "") {
				a++;
			}
		});
		if (a == 0) {
			imgs.trigger('change');
			return false;
		}
		this.setPicScore(a);
		this.setAllScore();
	},
	//计算详细说明
	calcDetailScore: function() {
		var e = [];
		var j = 0;
		//editor在页面中定义的
		var b = '';
		var conthtml = '';
		editor.ready(function() {
	                        b = editor.getContentTxt();
	                        conthtml = editor.getContent();
	                    });

		$("#js_ueditor").val(b);
		if ($.trim(b).length == 0) {
			b = "";
		}
		var g = false;
		var h = /<font>|<strong>|color\:|font\-size\:|<em>|<table|<b>/gi;
		if (b.search(h) > -1) {
			g = true;
		}
		var a = /<img[^>]+src="[^"]+"[^>]*>/g;
		var c = b.match(a);
		if (c != null) {
			j = (c.length) * 25;
		}
		b = (b) ? $("<p>").append(b).text() : "";
		b = b.replace(/\s/g, "");
		for (var f = 0; f < b.length; f++) {
			encodeURI(b.charAt(f)).length > 2 ? j += 1 : j += 0.5;
		}

		e.img = 0;
		e.content = 0;
		var d = $(conthtml).find("img").size();
		e.img = d * 3;
		if (j >= 300) {
			g ? e.content += 20 : e.content += 14;
		} else {
			if (j >= 50 && j < 300) {
				e.content += 10;
			}
		}
		if (j < 0.5) {
			if (e.img < 1) {
				// 产品详细说明不能为空
				$('[name="js_ueditor"]').trigger('editor');
				return false;
			}
		} else {
			if (j > 50000) {
				//产品详细说明不能大于50000个字
				$('[name="js_ueditor"]').trigger('editor');
				return false;
			}
		}

		this.setDetailScore(e);
		this.setAllScore();
	}
};
//事件
var _Event = {
	//提交表单
	FormSubmit: function() {
		/*$('[hay-filter="button_submit"]').on({
			click: function() {
				Score.setStarGrade();
			}
		});*/
	},
	//计算星级按钮
	starGrade: function() {
		$('#cal_starGrade').bind({
			click: function() {
				Score.setStarGrade();
			}
		});
	},
	//
	init: function() {
		this.starGrade();
		this.FormSubmit();
	}
};
//检查
var checkForm = {
	getStrLengthGBK: function(d) {
		var d = $.trim(d);
		var f = $.trim(d).length;
		var e = d.replace(/[\u2E80-\u9FFF0-9]/g, "");
		var c = e.length;
		var b = f - c;
		var a = 0;
		a = b * 1 + c * 0.5;
		return a;
	},
	isUndefined: function(a) {
		if (typeof(a) == "undefined" || a == null) {
			return true;
		}
		return false;
	}
};