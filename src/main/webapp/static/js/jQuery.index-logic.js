$(function () {
    var isEditFlag = ('undefined' == typeof shouye_edit) ? false : shouye_edit;
    //load
    if (!isEditFlag) {
        $('[isLoadEdit="XYZ"]').each(function (index, el) {
            var url = $(el).attr('href');
            //$(el).loadingSpin({ color: '#F60' });
            $.ajax({
                type: "POST",
                url: url,
                data: { cookie_search: $.cookie('qpr_serhis'), cookie_view: $.cookie('prohis') },
                dataType: 'html',
                success: function (data) {
                    $(el).loadingSpin(false);
                    $(el).html(data);
                }
            });
        });
    } else {
        $('[isLoadEdit="XYZ"]').each(function (index, el) {
            $(el).html('点此修改');
        });
    }

    //广告轮播
    $('#js_hp1_ad').length && $('#js_hp1_ad').picPlaySimple();

    //页卡切换
    $('.h-pcard').length && $('.h-pcard').pageCardSimple();

    //楼层滚动
    $('#js_floor').length && $('#js_floor').floorScroll();

    //floor roll ad
    /*$('[isSpotNewRollAd-x1="true"]').each(function(index, el) {
        $(el).picPlay({
            playType:2,
            autoPlayTime: 6000,
            panelHeight:500
        });
    });*/

    // car type slieder lor
    /*$('[isSliderLor-x1-1="true"]').length && $('[isSliderLor-x1-1="true"]').slideLOR({
        prev: '[slor-l="true"]',
        next: '[slor-r="true"]',
        isOneByOne:true
    });*/
});

/*广告轮播*/
/*ad pic play*/
!(function ($) {
    var f = {
        timeOut: null,
        bool: true,
        i: 0,
        //add btn
        createHtml: function (o, p_btn_page) {
            var html = '';
            for (var i = 0; i < o.picNum; i++) {
                html += '<span></span>';
            }
            p_btn_page.append(html);
            $('span:eq(0)', p_btn_page).addClass(o.pageActiveClass);
            o.picNum == 1 ? $('span', p_btn_page).hide() : '';
        },
        //page btn active
        btnActive: function (o, btn) {
            btn.addClass(o.pageActiveClass);
            btn.siblings().removeClass(o.pageActiveClass);
        },
        //animate
        myAnimat: function (act) {
            act.fadeIn(300).siblings('a').fadeOut();
            f.i++;
        },
        //stop show
        stopShow: function () {
            window.clearTimeout(f.timeOut);
            f.bool = false;
            return false;
        }
    };
    $.fn.picPlaySimple = function (o) {
        o = $.extend({}, {
            autoPlayTime: 4000, //auto time
            isAutoPlay: true, //is auto
            picPanel: '#js_hp1_ad_panel',//pic panel
            btnPanel: '#js_hp1_ad_btn_panel', //btn panel
            btnPage: '#js_hp1_ad_btn', //btn list
            pageActiveClass: 'hp1-ad-btn-active',//btn active style
            btnLRPanel: '#js_hp1_ad_lr_btn', //left and right panel
            btnLeft: '#js_ad_btn_left',//left btn
            btnRight: '#js_ad_btn_right',//right btn
            picNum: 4 //pic num
        }, o);
        return this.each(function () {
            var play = $(this);
            var p_btn_panel = $(o.btnPanel, play),
                p_btn_page = $(o.btnPage, play),
                p_ad_panel = $(o.picPanel, play),
                p_btn_lr = $(o.btnLRPanel, play),
                p_btn_left = $(o.btnLeft, play),
                p_btn_right = $(o.btnRight, play);
            p_img = $('img', play),
            p_a = p_img.parent('a');
            //设置图片数量
            o.picNum = p_img.length;

            f.createHtml(o, p_btn_page);

            //play method
            var autoShow = function () {
                f.i = (f.i > (o.picNum - 1) ? 0 : f.i);
                f.btnActive(o, $('span', p_btn_page).eq(f.i));
                f.myAnimat(p_a.eq(f.i));
                f.timeOut = window.setTimeout(autoShow, o.autoPlayTime);
            };

            //auot play
            o.isAutoPlay ? autoShow(o, p_a, p_btn_page) : '';

            //mouseover to stop
            $(document).on('mouseover', function (event) {
                var e = event.target || window.event.target;
                if ($(e).parents('.' + play.attr('class')).length > 0) {
                    p_btn_lr ? (p_btn_lr.is(':hidden') ? p_btn_lr.show() : '') : '';
                    f.stopShow();
                }
            });

            //mouseout to auto
            $('.' + play.attr('class')).on('mouseout', function (event) {
                if (o.isAutoPlay && !f.bool) {
                    f.bool = true;
                    f.timeOut = window.setTimeout(autoShow, o.autoPlayTime);
                    p_btn_lr ? (p_btn_lr.is(':visible') ? p_btn_lr.hide() : '') : '';
                }
            });

            //btn list click
            $('span', p_btn_page).on('click', function () {
                f.stopShow();
                f.i = $(this).index();
                f.btnActive(o, $(this));
                f.myAnimat(p_a.eq(f.i));
            });
            //left btn click
            p_btn_left.on('click', function () {
                f.stopShow();
                var i = $('.' + o.pageActiveClass, p_btn_page).index() - 1;
                i = i < 0 ? (o.picNum - 1) : i;
                $('span', p_btn_page).eq(i).trigger('click');
            });
            //right btn click
            p_btn_right.on('click', function () {
                f.stopShow();
                var i = $('.' + o.pageActiveClass, p_btn_page).index() + 1;
                i = i > (o.picNum - 1) ? 0 : i;
                $('span', p_btn_page).eq(i).trigger('click');
            });
        });
    };
})(jQuery);



/*页卡切换*/
!(function ($) {
    $.fn.pageCardSimple = function (o) {
        o = $.extend({}, {
            //默认展示项
            index: 0,
            //绑定的事件
            event: 'hover click'
        }, o);
        return this.each(function () {
            var t = $(this);
            var head = $('.hpc-head', t);
            var body = $('.hpc-body', t);
            //绑定事件
            $('li', head).bind(o.event, function () {
                var i = $(this).index();
                $(this).addClass('active').siblings('li').removeClass('active');
                $('.hpcb-cont', body).eq(i).show().siblings('.hpcb-cont').hide();
            });
            //默认显示
            if (o.index >= 0) {
                $('li', head).eq(o.index).trigger('click');
            }
        });
    };
})(jQuery);

/*楼层滚动*/
!(function ($) {
    $.fn.floorScroll = function (o) {
        o = $.extend({}, {
            //楼层样式
            fnstyle: 'floor-nav',
            //默认显示楼层
            index: -1
        }, o);
        return this.each(function () {
            var t = $(this);
            var f = $('[isFloor="true"]', t);

            var fn = fx.creatFloor(o, f.length);
            var fl = $('li', fn);

            if (f.length < 0) {
                return false;
            }
            //楼层点击
            fl.bind('click', function () {
                var i = $(this).index();
                $('html, body').stop().animate({ scrollTop: f.eq(i).offset().top - 1 }, 600);
            });
            //鼠标滚动
            $(window).scroll(function () {

                var sT = $(document).scrollTop();
                var wH = $(window).height();
                var dH = $(document).height();

                if (fx.isIe6()) {
                    var t = document.documentElement.scrollTop + (window.screen.height - fn.height()) / 2;
                    fn.css({ 'top': t + 'px' });
                }

                if (sT > (f.first().offset().top - wH / 2)) {
                    fn.show();
                } else {
                    fn.hide();
                }
                if (sT >= dH - wH) {
                    fn.hide();
                }

                f.each(function () {
                    var i = $(this).index();
                    if ($(this).offset().top <= sT + wH / 2) {
                        fl.delay(300).eq(i).addClass('cur').siblings().removeClass('cur');
                    }
                });
            });
            //默认显示
            if (o.index >= 0) {
                fl.eq(o.index).trigger('click');
            }
        });
    };
    fx = {
        /*ie6*/
        isIe6: function () {
            return ($.browser.msie && ($.browser.version <= '6.0') && !$.support.style);
        },
        //创建楼层
        creatFloor: function (o, length) {
            if ($('.' + o.fnstyle).length < 1) {
                var li = '';
                for (var i = 1; i <= length; i++) {
                    li += '<li><a href="javascript:void(0);"><em>' + i + 'F</em></a></li>';
                }
                var html = '<div class=' + o.fnstyle + '>'
                            + '<ul>'
                            + li
                            + '</ul>'
                            + '</div>';
                $('body').append(html);
            }
            return $('.' + o.fnstyle, 'body');
        }
    };
})(jQuery);