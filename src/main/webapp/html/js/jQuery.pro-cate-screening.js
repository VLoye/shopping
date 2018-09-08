$(function(){
    var jSpu = $('#j-spu');
    var boxHeight = ('undefined' != typeof $.fn.actual) ? jSpu.actual('innerHeight', { clone : true }) : jSpu.innerHeight(true);
    var prefixWinUrl = jSpu.attr('data-preUrl') || 'http://www.qipeiren.com/c/chanpin';

    //under cate
    $('[isUnderCate="true"]').each(function(){
        var cate = $(this);
        $('[isCateMain="true"] .under-item', cate).hover(function(){

            var li = $(this);
            var i = li.index();

            var liparent = li.parents('[isCateMain="true"]');
            var cateChild = liparent.next('[isCateChilds="true"]');
            var child = cateChild.children('[isCateChild="true"]').eq(i);

            li.addClass('active').siblings().removeClass('active');
            child.removeClass('hide').siblings().addClass('hide');

           jSpu.css({
                height:'auto'
            });
            boxHeight = jSpu.height();
           jSpu.css({
                height:boxHeight
            });

        }, function(event){

            var li = $(this);
            var e = event.target || window.event.target;

            var ep = $(e).parents('[isCateChilds="true"]');
            if (ep.length < 0 && !ep.is(li)) {
                var i = li.index();
                var liparent = li.parents('[isCateMain="true"]');
                var cateChild = liparent.next('[isCateChilds="true"]');
                var child = cateChild.children('[isCateChild="true"]').eq(i);

                li.removeClass('active');
                child.addClass('hide');
            }
        });

        //  $(document).on('mouseover', function(event){
        //     var e = event.target || window.event.target;
        //     var ep1 = $(e).parents('[isCateMain="true"]');
        //     var ep2 = $(e).parents('[isCateChilds="true"]');
        //     if (ep1.length < 1 && ep2.length < 1) {
        //         $('[isCateMain="true"] li.active').removeClass('active');
        //         $('[isCateChilds="true"] [isCateChild="true"]:visible').hide();
        //     }
        // });
    });

    //switch up or down
    $('#js_switchUpDown').click(function(){
        var ud = $(this);
        if(ud.hasClass('icud-up')){
            ud.removeClass('icud-up').removeClass('icud-up-active').addClass('icud-down').addClass('icud-down-active');
            jSpu.stop(true, true).animate({
                height:boxHeight
            }, 300);
        }else{
            jSpu.css({
                height:'auto'
            });
            boxHeight = jSpu.height();
            ud.removeClass('icud-down').removeClass('icud-down-active').addClass('icud-up').addClass('icud-up-active');
            jSpu.stop(true, true).animate({
                height:0
            }, 300);
        }
    }).hover(function(){
        var ud = $(this);

        if(ud.hasClass('icud-up')){
            ud.addClass('icud-up-active');
        }else if(ud.hasClass('icud-down')){
            ud.addClass('icud-down-active');
        }
    }, function(){
        $(this).removeClass('icud-up-active').removeClass('icud-down-active');
    });

    //check box
    $('[t-click-item="XYZ"]').each(function(index, el) {
        var itemA = $(el);
        var chk = $('[t-checkbox="chk"]', itemA);
        itemA.click(function(event) {
            if(chk.is(':visible')){
                chk.toggleClass('sw-dpl-checked');
                return false;
            }
        });
    });

    //btns control
    $('[t-btn-control="ctrl"]').each(function(index, el) {
        var ctrl = $(el);
        var more = $('[isMore="true"]', ctrl);
        var multi = $('[isMulti="true"]', ctrl);
        var define = $('[isDefine="true"]', ctrl);
        var cancel = $('[isCancel="true"]', ctrl);

        //btn more
        more.click(function(event) {
            var dd = $(this).parents('dd');
            var items = $('.spu-items', dd);
            if(items.hasClass('show-all')){
                items.removeClass('show-all');
                jSpu.css({
                    height:'auto'
                });
                items.stop().animate({
                    height:'30px'
                }, 300, function(){
                    boxHeight = jSpu.height();
                    jSpu.css({
                        height:boxHeight
                    });
                });
                $('[isBtnTxt="true"]', more).text('更多');
                $('[isBtnIcon="true"]', more).addClass('afi-b').addClass('afi-b-active').removeClass('afi-t').removeClass('afi-t-active');
            }else{
                items.addClass('show-all');
                jSpu.css({
                    height:'auto'
                });
                items.css({
                    height:'auto'
                });
                itemsH = items.height();
                items.css({
                    height:'30px'
                }).stop().animate({
                    height:itemsH
                }, 300, function(){
                    boxHeight = jSpu.height();
                    jSpu.css({
                        height:boxHeight
                    });
                });

                $('[isBtnTxt="true"]', more).text('隐藏');
                $('[isBtnIcon="true"]', more).removeClass('afi-b').removeClass('afi-b-active').addClass('afi-t').addClass('afi-t-active');
            }

        }).hover(function(){
            var btnIcon = $('[isBtnIcon="true"]', more);

            if(btnIcon.hasClass('afi-b')){
                btnIcon.addClass('afi-b-active');
            }else if(btnIcon.hasClass('afi-t')){
                btnIcon.addClass('afi-t-active');
            }
        }, function(){
            $('[isBtnIcon="true"]', more).removeClass('afi-b-active').removeClass('afi-t-active');
        });

        //btn multi
        multi.click(function(event) {
            var dd = $(this).parents('dd');
            var items = $('.spu-items', dd);
            if(!items.hasClass('show-all')){
                jSpu.css({
                    height:'auto'
                });
                items.css({
                    height:'auto'
                });
                itemsH = items.height();
                items.css({
                    height:'30px'
                }).stop().animate({
                    height:itemsH
                }, 300, function(){
                    boxHeight = jSpu.height();
                    jSpu.css({
                        height:boxHeight
                    });
                });
            }
            $('[t-click-item="XYZ"] [t-checkbox="chk"]', items).css({
                display:'inline'
            });

            if(items.hasClass('sup-under-items')){
                $('[t-click-item="XYZ"] [t-checkbox="chk"]', items.next('.spu-childs')).css({
                    display:'inline'
                });
            }

            more.addClass('hide');
            multi.addClass('hide');
            define.removeClass('hide');
            cancel.removeClass('hide');

        }).hover(function(){
            $('[isBtnIcon="true"]', multi).addClass('ipm-plus-active');
        }, function(){
            $('[isBtnIcon="true"]', multi).removeClass('ipm-plus-active');
        });

        //btn define
        define.click(function(event){
            var btnA = $(this);
            var dd = btnA.parents('dd');
            var items = $('.spu-items', dd);
            var chked = $('.sw-dpl-checked', items);
            if(items.hasClass('sup-under-items')){
                chked = chked.add($('.sw-dpl-checked', items.next('.spu-childs')));
            }
            var ids = [];
            chked.each(function(index, el) {
                ids.push($(el).attr('data-id'));
            });

            if(ids.length < 1){
                cancel.trigger('click');
                return false;
            }else{

                ids = ids.join(',');

                var eV = btnA.attr('data-e');
                var flag = btnA.attr('data-flag');

                var url = window.location.href;

                var getUrl = function(reg, repReg, p){
                    var newUrl = url;
                    if(reg.test(newUrl)){
                        newUrl = newUrl.replace(repReg, p[0] + '=' + ids + '&'+ p[1] +'=' + eV);
                    }else{
                        if(newUrl.indexOf('?') == -1){
                            newUrl += '?';
                        }else{
                            newUrl += '&';
                        }
                        newUrl += p[0] + '=' + ids + '&'+ p[1] +'=' + eV;
                    }
                    return newUrl;
                };

                switch(flag.toLowerCase()) {
                    case 'de':
                        var regDE = /[?&]d=[,\d]*&e=\d+/;
                        var repRegDE = /d=[,\d]*&e=\d/;
                        url = getUrl(regDE, repRegDE, ['d', 'e']);
                        break;
                    case 'fg':
                        var regFG = /[?&]f=[,\d]*&g=\d+/;
                        var repRegFG = /f=[,\d]*&g=\d/;
                        url = getUrl(regFG, repRegFG, ['f', 'g']);
                        break;
                    default: break;
                }

                var idx = url.indexOf('?');
                url = (idx != -1 ? prefixWinUrl + url.substring(idx) : prefixWinUrl);
                btnA.attr({ href:url });
                return true;
            }
        });

        //btn cancel
        cancel.click(function(event) {
            var dd = $(this).parents('dd');
            var items = $('.spu-items', dd);
            jSpu.css({
                height:'auto'
            });
            items.stop().animate({
                height:'30px'
            }, 300, function(){
                boxHeight = jSpu.height();
                jSpu.css({
                    height:boxHeight
                });
            });

            $('[t-click-item="XYZ"] [t-checkbox="chk"]', items).css({
                display:'none'
            });
            if(items.hasClass('sup-under-items')){
                $('[t-click-item="XYZ"] [t-checkbox="chk"]', items.next('.spu-childs')).css({
                    display:'none'
                });
            }
            more.removeClass('hide');
            multi.removeClass('hide');
            define.addClass('hide');
            cancel.addClass('hide');
            items.removeClass('show-all');

            $('[isBtnTxt="true"]', more).text('更多');
            $('[isBtnIcon="true"]', more).addClass('afi-b').removeClass('afi-t');
        }).hover(function(){
            $('[isBtnIcon="true"]', cancel).addClass('ipm-minus-active');
        }, function(){
            $('[isBtnIcon="true"]', cancel).removeClass('ipm-minus-active');
        });
    });

    //related btns control
    $('[related-control="box"]').each(function(index, el) {
        var relatedbox = $(el);
        var ctrl = $('[related-btn-control="ctrl"]', relatedbox);
        var more = $('[isMore="true"]', ctrl);
        var items = $('[related-control="cont"]', relatedbox);

        var itemH = items.height();
        var itemLH = items.css('line-height');
        if(parseInt(itemH, 10) > parseInt(itemLH, 10)){
            ctrl.show();
        }else{
            ctrl.hide();
        }

        //btn more
        more.click(function(event) {
            if(items.hasClass('show-all')){
                items.removeClass('show-all');
                relatedbox.stop().animate({
                    height:'40px'
                }, 300, function(){

                });
                $('[isBtnTxt="true"]', more).text('更多');
                $('[isBtnIcon="true"]', more).addClass('afi-b').addClass('afi-b-active').removeClass('afi-t').removeClass('afi-t-active');
            }else{
                items.addClass('show-all');
                relatedbox.css({
                    height:'auto'
                });
                itemsH = items.height();
                relatedbox.css({
                    height:'40px'
                }).stop().animate({
                    height:parseInt(itemsH, 10) + 10 + 'px'
                }, 300, function(){
                });

                $('[isBtnTxt="true"]', more).text('隐藏');
                $('[isBtnIcon="true"]', more).removeClass('afi-b').removeClass('afi-b-active').addClass('afi-t').addClass('afi-t-active');
            }

        }).hover(function(){
            var btnIcon = $('[isBtnIcon="true"]', more);

            if(btnIcon.hasClass('afi-b')){
                btnIcon.addClass('afi-b-active');
            }else if(btnIcon.hasClass('afi-t')){
                btnIcon.addClass('afi-t-active');
            }
        }, function(){
            $('[isBtnIcon="true"]', more).removeClass('afi-b-active').removeClass('afi-t-active');
        });
    });
});