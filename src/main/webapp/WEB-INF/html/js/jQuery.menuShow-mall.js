/*all class meun show*/
!(function ($) {
    $.fn.menuShow = function (o) {
        o = $.extend({}, {
            //home true or false
            isShowLeft: false,
            isOnlyOhter: true,
            isShowOther: false
        }, o);
        return this.each(function () {
            var m = $(this);
            var mc = $('.hnm-class', m);
            var mco = $('.hnmc-other', mc);
            var mcl = $('.hnmc-left', mc);
            var mli = $('li', mcl);
            var mcr = $('.hnmc-right', mc);
            var mh = null;
            var ma = null;
            var mcrc = $('.hnmcr-cont', mcr);
            var mcs = $('.hnmc-span', mc);

            o.isOnlyOhter ? (mcl.remove(), mcr.remove()) : '';
            o.isShowOther && o.isShowLeft ? mco.show() : '';
            o.isShowLeft ? mcl.show() : '';

            mli.hover(function () {
                var t = $(this);
                var i = t.index();
                t.addClass('active').siblings('li').removeClass('active');
                mc.addClass('hover');
                mcr.show();
                ma = $('.active', mcl);
                mh = $('.hover', m);
                mcrc.eq(i).show().siblings('.hnmcr-cont').hide();
            }, function () {
                mh.hover(function () {
                    mcr.show();
                }, function () {
                    mcr.hide();
                    mcrc.hide();
                    ma.removeClass('active');
                    mh.removeClass('hover');
                });
            });
            mcs.hover(function () {
                mcr.hide();
                ma = $('.active', mcl);
                mh = $('.hover', m);
                mh.removeClass('hover');
                ma.removeClass('active');
            });
        });
    };
})(jQuery);