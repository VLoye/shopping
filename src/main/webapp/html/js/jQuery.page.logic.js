$(function () {
    /*高级搜索 start*/
    //隐藏高级搜索内容
    $('#js_grade_panel').hide();
    //高级搜索点击事件
    $('#js_grade_search').on('click', function () {
        if ($('.hg-arrow', this).hasClass('hga-down')) {
            $('.hg-arrow', this).removeClass('hga-down').addClass('hga-up');
        } else {
            $('.hg-arrow', this).removeClass('hga-up').addClass('hga-down');
        }
        $('#js_grade_panel').toggle();
    });
    //关闭高级搜索选项
    $('#js_grade_close').on('click', function () {
        $('#js_grade_panel').hide();
        $('.hg-arrow', '#js_grade_search').removeClass('hga-up').addClass('hga-down');
    });
    /*高级搜索 end*/
});

/*星级评分*/
!(function ($) {
    $.fn.StarRating = function (o) {
        o = $.extend({}, {
            hover: 'dis-grade-hover',
            active: 'dis-grade',
            text: 'dis-grade-text',
            hide: 'dis-hide',
            unit: '分'
        }, o);
        return this.each(function () {
            var t = $(this),
                tText = t.find('.' + o.text);
            /*星星hover*/
            $('i', t).hover(function () {

                if (t.find('.' + o.active).length > 0) {
                    return false;
                }
                var it = $(this);
                it.prevAll('i').addClass(o.hover);
                it.addClass(o.hover);
                it.nextAll('i').removeClass(o.hover);
                var tl = tText.prevAll('.' + o.hover).length;
                tText.text(tl + o.unit).removeClass(o.hide);
            }, function () {
                $('i', t).removeClass(o.hover);
                var tl = t.find('.' + o.active).length;
                if (tl > 0) {
                    tText.text(tl + o.unit).removeClass(o.hide);
                } else {
                    tText.text('').addClass(o.hide);
                }
            });
            /*星星click*/
            $('i', t).on('click', function () {
                var it = $(this);
                it.prevAll('i').addClass(o.active);
                it.addClass(o.active);
                it.nextAll('i').removeClass(o.active);
                var tl = tText.prevAll('.' + o.active).length;
                tText.text(tl + o.unit).removeClass(o.hide);
            });
        });
    };
})(jQuery);

/*多行文本框maxLength*/
!(function ($) {
    $.fn.limitTextAreaL = function (o) {
        o = $.extend({}, {
            maxL: 10,
            showInfo: false
        }, o);
        return this.each(function () {
            var t = $(this);
            var max = o.maxL;
            var val, cur, count, warn;
            t.bind('keyup kydown change', function () {
                var info = f.infoHtml(t, o);
                if (o.showInfo) {
                    info.show();
                }
                val = t.val();
                cur = val.length;
                count = info.find('em');
                warn = info.find('font');
                if (cur == 0) {
                    //当默认值长度为0时,可输入数为默认maxlength值
                    count.text(max);
                } else if (cur < max) {
                    //当默认值小于限制数时,可输入数为max-cur 
                    count.text(max - cur);
                    warn.text('no'); //不区分中英文字符数
                } else {
                    //当默认值大于等于限制数时,插入一条提示信息并截取限制数内的值 
                    count.text(0);
                    warn.text('not!');//不可再输入
                    t.val(val.substring(0, max));
                }
            });
        });
    };
    var f = {
        infoHtml: function (t, o) {
            var html = '<span>'
                      + '你还可以输入'
                      + '<em>'
                      + o.maxL
                      + '</em>'
                      + '个字符'
                      + '<font>'
                      + '[不区分中英文字符数]'
                      + '</font>'
                      + '</span>';

            var info = t.next('span');

            if (info.length < 1) {
                t.after(html);
                info = t.next('span').hide();
            }
            return info;
        }
    };
})(jQuery);

//选择银行卡管理
!(function ($) {
    $.fn.bankManage = function (o) {
        o = $.extend({}, {
            calBackFun: null,
            delBackFun: null
        }, o);
        return this.each(function () {
            var b = $(this),
                bm = $('.bank-card-manage', this);

            //第一项设置为默认
            bm.eq(0).addClass('c-check').find(':radio').attr({ 'checked': 'true' });
            bm.eq(0).find('.card-manage').show();
            bm.find('.em_delete').hide();

            //选项hove
            bm.hover(function () {
                var s = $(this);
                s.css({ 'z-index': 2 }).siblings('.bank-card-manage').css({ 'z-index': 1 });

                $('.card-manage', s).show().hover(function () {
                    $(this).addClass('c-b');
                    $('.c-sel', this).show();
                }, function () {
                    $(this).removeClass('c-b');
                    $('.c-sel', this).hide();
                });

            }, function () {
                if ($(this).hasClass('c-check')) {
                    return false;
                }
                $('.card-manage', this).hide();

            }).on('click', function () {
                $(this).addClass('c-check').siblings('.bank-card-manage').removeClass('c-check');
                $(this).siblings('.bank-card-manage').find('.card-manage').hide();
                $(':radio', this).attr('checked', 'true');
            });

            $('.c-m', bm).on('click', function (event) {
                if ($('.c-sel', bm).is(':hidden')) {
                    $('.card-manage', bm).addClass('c-b');
                    $('.c-sel', bm).show();
                }
            });

            //设为默认 & 删除
            $('.c-sel', bm).on('click', function (event) {
                var a = $('a', this);
                var e = window.event ? event.srcElement : event.target;
                if ($(e).text() == a.eq(0).text()) {
                    o.calBackFun(event, a);
                } else {
                    o.delBackFun(event, a);
                }
            });
        });
    };
})(jQuery);