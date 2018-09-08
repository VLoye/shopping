$(function () {
    $('.mb-l [isjstit="true"]').each(function(index, el) {
      var tit_o = $(el);
      var tit_sty = tit_o.attr('style');
      tit_sty = ( tit_sty && tit_sty.length > 0 ? tit_sty : '');

      var span = $('span', tit_o);
      var style = span.attr('style');
      style = (style && style.length > 0 ? style : '');
      tit_o.attr({style: tit_sty + ';' + style + ';'});
      var text = tit_o.html();
      tit_o.html(text.replace(/<[^>]*>/g,'').replace(/&.*?;/g , ''));
    });

    //product detail fixed nav
    $('.mb-l').fixedNav({
        upSpace: 34
    });
});
//product detail fixed nav
!(function($){
    $.fn.fixedNav = function(o){
      o = $.extend({}, {
      		//for nav mark
      		fnMark:'[isJsTit="true"]',
          //parent of nav
          fncont:'.mbr-cont',
          //stle of nav
          fnstyle:'mbrc-nav',
          //go top btn
          gbtn:'.mbrc-top',
          //time of scroll speed
          gSpeed:750,
          //set upper space by customer
          upSpace:34,
          //default
          index:-1
      }, o);
      return this.each(function(){
        var t = $(this);
        var f = $(o.fnMark, t);
  			var g = $(o.gbtn);
        var fc = $(o.fncont);

        //no fixed return
  			if(f.length < 0){
            return false;
        }

  			var fn = fx.creatNav(o, f, fc);
        var fd = $('dd', fn);

  			var tT = t.offset().top - o.upSpace;
        var vH = f.length > 0 ? (f.offset().top - tT) : 0;

        // go top btn click
	      g.click(function(){
	        $('html, body').stop().animate({scrollTop:tT - vH}, o.gSpeed);
	      });

        //nav click
        fd.bind('click', function(){
            var i = $(this).index();
            $('html, body').stop().animate({scrollTop:f.eq(i).offset().top - vH}, o.gSpeed);
        });

      	//nav first active
      	fd.delay(300).eq(0).addClass('active').siblings().removeClass('active');

      	//window scroll
        $(window).scroll(function(){

          var sT = $(document).scrollTop();
          var wH = $(window).height();

          //fc style
          var sty = {
          	position:'relative',
          	top:0
          };

          //nav fixed style
					if(tT >= sT){
          }else if(tT < sT && sT <= (tT - vH + t.height() - fc.height())){
          	sty.position = fx.isIe6() ? 'absolute' : 'fixed';
          	sty.top = fx.isIe6() ? (o.upSpace + sT - tT) : o.upSpace;
          }else{
          	sty.top = t.height() - fc.height() - vH;
          }

          //set fc css
          fc.css(sty);

          //active nav
        	for(var i = 0; i<f.length; i++){
            if(fx.getOffsetTop(f.eq(i)[0]) - o.upSpace - vH <= sT){
              fd.delay(300).eq(i).addClass('active').siblings().removeClass('active');
            }
          }

        });

        //show default
        if(o.index >= 0){
        	fd.eq(o.index).trigger('click');
        }
      });
    };
    fx = {
      //ie6
      isIe6:function(){
          return ($.browser.msie && ($.browser.version <= '6.0') && !$.support.style);
      },
      //get offset top
      getOffsetTop:function(ele){
    		var top = ele.offsetTop;
		    var parent = ele.offsetParent;
		    while( parent != null ){
			    top += parent.offsetTop;
			    parent = parent.offsetParent;
		    };
		    return top;
	    },
      //create html
      creatNav:function(o, f, fc){
        if($('.' + o.fnstyle).length < 1){
          var dd = '';
          for(var i = 0; i < f.length; i++){
          	dd += '<dd><i></i><span>' + f.eq(i).text() + '</span></dd>';
          }
          var html = '<dl class='+ o.fnstyle +'>' + dd + '</dl>';
          fc.prepend(html);
        }
        return $('.' + o.fnstyle, fc);
      }
    };
})(jQuery);