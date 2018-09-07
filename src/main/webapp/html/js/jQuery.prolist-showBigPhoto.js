$(function(){
    $('[isShowBigPhotoBox="true"]').length && $('[isShowBigPhotoBox="true"]').proListShoBigPhoto();
});
// product list to show big photo 220 * 220
!(function ($) {
    $.fn.proListShoBigPhoto = function (o) {

        o = $.extend({}, {
            bigSize:220
        }, o);

        return this.each(function (i){

            var box = $(this);

            var item = $('[isSBPItem="true"]', box);

            //get opts inline
            var dataOpts = box.attr('data-opts');
            if(dataOpts){
                dataOpts = eval('(' + dataOpts + ')');
                o = $.extend({}, o, dataOpts);
            }

            $('[isPhoto="true"]', item).live({
                mouseover:function(){
                    var div = $('<div></div>');

                    div.append($(this).html());
                    var src = $('img', div).attr('src');

                    //get opts inline
                    var imgOpts = $('img', div).attr('data-opts');
                    if(imgOpts){
                        imgOpts = eval('(' + imgOpts + ')');
                        o = $.extend({}, o, imgOpts);
                    }

                    $('img', div).attr({src:src.replace("_s", "-" + o.bigSize).replace("_100", "_" + o.bigSize)});

                    var bigPhoto = $('[isBigPhoto="true"]', $(this));
                    if(!bigPhoto.length){
                        var html = '<div class="big-photo-220x220" isBigPhoto="true">'
                            +'<div class="bp-220-imgbox">'
                                +'<div class="bp220-in">'
                                + div.html()
                                +'</div>'
                            +'</div>'
                        +'</div>';
                        $(this).append(html);
                        bigPhoto = $('[isBigPhoto="true"]', $(this));
                    }
                    bigPhoto.show();
                },
                mouseout:function(){
                   $('[isBigPhoto="true"]', $(this)).hide();
                }
            });
        });
    };
})(jQuery);