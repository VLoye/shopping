$(function(){
    //广告轮播
    $('#js_ms_ad').picPlay();

    //描述等信息hover
    $('#js_mshi1_hover').bind({
        'mouseover':function(){
            $('#js_mshi1_show').show();
            $('.aro-icon', this).removeClass('aroi-on').addClass('aroi-off');
        },
        'mouseout':function(e){
            var b1 = $(e).parents('#js_mshi1_hover').length;
            var b2 = $(e).parents('#js_mshi1_show').length;
            if (b1 > 0 || b2 > 0) {
            }else{
                $('#js_mshi1_show').hide();
                $('.aro-icon', this).removeClass('aroi-off').addClass('aroi-on');
            }
        }
    });
    //店铺二维码hover
    $('#js_mshi0_hover').bind({
        'mouseover':function(){
            $('#js_mshi0_show').show();
            $('.aro-icon', this).removeClass('aroi-on').addClass('aroi-off');
        },
        'mouseout':function(e){
            var b1 = $(e).parents('#js_mshi0_hover').length;
            var b2 = $(e).parents('#js_mshi0_show').length;
            if (b1 > 0 || b2 > 0) {
            }else{
                $('#js_mshi0_show').hide();
                $('.aro-icon', this).removeClass('aroi-off').addClass('aroi-on');
            }
        }
    });
    //店铺分类
    $('#js_ms_cate dl .ps-icon').bind({
        'click':function(){
            var t = $(this).parents('dl');
            if(t.hasClass('active')){
                t.removeClass('active');
                $('.ps-icon', t).removeClass('psi-s').addClass('psi-p');
                $('.item-sub', t).addClass('hide').parent().css({ 'height': 0 });
            }else{
                t.addClass('active').siblings().removeClass('active');
                $('.ps-icon', t).removeClass('psi-p').addClass('psi-s');
                $('.ps-icon', t.siblings()).removeClass('psi-s').addClass('psi-p');
                if ($('.item-sub', t).children('li').length > 0){
                    $('.item-sub', t).parent().css({ 'height': 'auto' });
                } else {
                    $('.item-sub', t).parent().css({'height':0, 'border-top':0 });
                }
                $('.item-sub', t).removeClass('hide');
                $('.item-sub', t.siblings()).addClass('hide').parent().css({ 'height': 0 });
            }
        }
    });
    //销量关注切换
    $('#js_hotTab li').bind('hover', function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('#js_hotBod').children('[ishotbod="true"]:eq(' + $(this).index() + ')').show().siblings().hide();
    });

    //menu nav page box
    $('#js_menuNavPageBox').length && $('#js_menuNavPageBox').fakePage();
});

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
            act.fadeIn(300).siblings('span').fadeOut();
            f.i++;
        },
        //stop show
        stopShow: function () {
            window.clearTimeout(f.timeOut);
            f.bool = false;
            return false;
        }
    };
    $.fn.picPlay = function (o) {
        o = $.extend({}, {
            autoPlayTime: 4000, //auto time
            isAutoPlay: true, //is auto
            picPanel: '#js_ms_ad_panel',//pic panel
            btnPanel: '#js_ms_ad_btn_panel', //btn panel
            btnPage: '#js_ms_ad_btn', //btn list
            pageActiveClass: 'active',//btn active style
            btnLRPanel: '#js_ms_ad_lr_btn', //left and right panel
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
            p_img = $('a', p_ad_panel),
            p_a = p_img.parent('span');
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
                    o.picNum > 1 ? (p_btn_lr ? (p_btn_lr.is(':hidden') ? p_btn_lr.show() : '') : '') : '';
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