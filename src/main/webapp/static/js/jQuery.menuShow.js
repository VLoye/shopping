$(function(){

    //全部分类显示
    $('#js_hnMenu').menuShow({
        isShowLeft:false
    });

});

/*全部分类菜单*/
!(function($){
    $.fn.menuShow = function(o){
        o = $.extend({}, {
            leftVal:200,
            //是否自动显示
            isShowLeft:true
        }, o);
        return this.each(function(){
            var m = $(this);

            //get opts inline
            var dataOpts = m.attr('data-opts');
            if(dataOpts){
                dataOpts = eval('(' + dataOpts + ')');
                o = $.extend({}, o, dataOpts);
            }

            var mc = $('.hnm-class', m);
            var mcl = $('.hnmc-left', mc);
            var mli = $('li', mcl);
            var mcr = $('.hnmc-right', mc);
            var mh = null;
            var ma = null;
            var mcrc = $('.hnmcr-cont', mcr);
            var mcs = $('.hnmc-span', mc);
            var mcsi = $('i', mcs);
            var mcrh = $('.hnmcr-close', mcr);
            if(o.isShowLeft){
                mcl.show();
                mcsi.removeClass('hi-down').addClass('hi-up');
            }
            mli.hover(function(){
                var t = $(this);
                var i = t.index();
                t.addClass('active').siblings('li').removeClass('active');
                mc.addClass('hover');
                //mcr.show();
                mcr.animate({'left':o.leftVal, 'opacity':'show'}, 500, function(){
                    mcr.css({'z-index':100});
                });

                ma = $('.active', mcl);
                mh = $('.hover', m);
                mcrc.eq(i).show().siblings('.hnmcr-cont').hide();
            },function(){
                ma = $('.active', mcl);
                mh = $('.hover', m);
                mh.hover(function(){
                    //mcr.show();
                    mcr.animate({'left':o.leftVal, 'opacity':'show'}, 500, function(){
                        mcr.css({'z-index':100});
                    });
                }, function(){
                    mcr.hide().css({'left':0, 'z-index':1});
                    mcrc.hide();
                    ma.removeClass('active');
                    mh.removeClass('hover');
                });
            });

            mcs.hover(function(){
                mcr.hide().css({'left':0, 'z-index':1});
                ma = $('.active', mcl);
                mh = $('.hover', m);
                mh.removeClass('hover');
                ma.removeClass('active');
                mcsi.removeClass('hi-down').addClass('hi-up');
            });
            mcrh.on('click', function(){
                mcr.hide().css({'left':0, 'z-index':1});
            });
        });
    };
})(jQuery);
