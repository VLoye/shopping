/*弹出层*/
!(function($){
  var f = {
    //是否是ie6以下
    isIe6:function(){
      //【jQuery1.8以下版本支持此写法判断ie6】
      return ($.browser.msie && ($.browser.version <= '6.0') && !$.support.style);
    },
    //浏览器窗口宽
    getScreenWidth: function () {
      return $(window).width();
    },
    //屏幕高
    getScreenHeight: function () {
      return $(window).height();
    },
    //整个文档高
    getDocumentHeight:function(){
      return $(document).height();
    },
    //窗口距离底部
    getScrollLeft: function () {
      if (window.pageXOffset) {
        return window.pageXOffset;
      }else if (document.compatMode && document.compatMode != 'BackCompat'){
        return document.documentElement.scrollLeft;
      }else if (document.body) {
        return document.body.scrollLeft;
      }
      return 0;
    },
    //窗口距离顶部
    getScrolltop: function () {
      if (window.pageYOffset) {
        return window.pageYOffset;
      }else if (document.compatMode && document.compatMode != 'BackCompat'){
        return document.documentElement.scrollTop;
      }else if (document.body) {
        return document.body.scrollTop;
      }
      return 0;
    },
    //元素宽
    getObjWidth:function(obj){
      return obj.outerWidth(true);
    },
    //元素高
    getObjHeight:function(obj){
      return obj.outerHeight(true);
    },
    //计算left
    getObjLeft: function (obj) {
      return (f.getScreenWidth() - f.getObjWidth(obj)) / 2;
    },
    //计算top
    getObjTop: function (obj) {
      return (f.getScreenHeight() - f.getObjHeight(obj)) / 2;
    },
    //移动
    movePop: function (opts, obj) {
      obj.find('.head span').on('mousedown', function (event) {
        (event || window.event).cancelBubble = true;
        (event || window.event).stopPropagation();
        return false;
      });
      var bDrag = false;
      var disX = disY = 0;
      obj.find('.head').on('mousedown', function (event) {
        var event = event || window.event;
        bDrag = true;
        disX = event.clientX - obj.offset().left;
        disY = event.clientY - obj.offset().top + f.getScrolltop();
        $('.head')[0].setCapture && $('.head')[0].setCapture();
        return false;
      });
      //移动
      $(document).on('mousemove', function (event) {
        if (bDrag) {
          var event = event || window.event;
          var iL = event.clientX - disX;
          var iT = event.clientY - disY;
          var maxL = document.documentElement.clientWidth - obj.outerWidth();
          var maxT = document.documentElement.clientHeight - obj.height();
          iL = iL < 0 ? 0 : iL;
          iL = iL > maxL ? maxL : iL;
          iT = iT < 0 ? 0 : iT;
          iT = iT > maxT ? maxT : iT;
          if(f.isIe6()){
            iT += f.getScrolltop();
          }
          obj.css({
            'margin-top': 0,
            'margin-left': 0,
            'left': iL + 'px',
            'top': iT + 'px'
          });
        }
        return;
      });
      //停止移动
      $('.head').on('mouseup', function (event) {
        bDrag = false;
        $('.head')[0].releaseCapture && $('.head')[0].releaseCapture();
      });
    }
  };

  $.fn.popFloor = function(opts){

    opts = $.extend({}, {
      id:'pop',
      str1 : '',                    //标题
      onOff:true,                  //关闭是否刷新
      isMove:true,              //是否可移动
      isMask:true,
      pop_class:'',            //样式
      pop_width:590,         //宽度
      pop_height:300,       //高度
      iframe_class: '',
      iframe_id:'popIFrameId',
      iframe_src:'', //路径
      iframe_cont: '',
      beforeShow:null,
      afterShow:null,
      beforeClose:null,
      onClose: null,
      afterClose:null
    }, opts);

    return this.each(function(){

      var _this = $(this);

      //点击事件
      _this.live('click', function(){

        if (opts.beforeShow != null && typeof opts.beforeShow === 'function') {
          var html = opts.beforeShow(_this);
          if (html == true) {

          } else if (html == false) {
              return false;
          }else if (html) {
            opts.iframe_cont = html;
          }
        }
        if($("#" + opts.id).length == 0){
          var strPop ='<div id="'+ opts.id +'">'
                      +'<div class="head"><label>'+ (opts.str1 || _this.attr('poptit')) +'</label><span>×</span></div>'
                      +'<div class="con">'
                      +'</div>'
                      +'</div>';
          $('body').append(strPop);
        };

        var odiv = $('#' + opts.id);
        var pop = '';
        if(opts.iframe_class == 'iframe' && (opts.iframe_src || _this.attr('popsrc'))){
            var pop_iframe = '<iframe class="iframe" frameborder="0" scrolling="no" src="' + (opts.iframe_src || _this.attr('popsrc')) + '" name="add_iframe" id=' + opts.iframe_id + ' style=" padding:0; margin:0 auto; width:' + opts.pop_width + 'px; height:' + opts.pop_height + 'px;"></iframe>';
          //$('body').append(pop_iframe);
          //pop = $('.' + opts.iframe_class);
          pop = $(pop_iframe);
          //设置宽
          odiv.css({
            width:f.getObjWidth(pop) + 20,
            height:f.getObjHeight(pop) + 40
          });
        }else if(opts.iframe_cont){
          //$('body').append(opts.iframe_cont);
          pop = $(opts.iframe_cont);

          //设置宽
          pop.css({
            width:opts.pop_width,
            height:opts.pop_height
          });

          odiv.addClass(opts.iframe_class);

          odiv.css({
          width:f.getObjWidth(pop) + 40,
          height:'auto'
          });
          pop.css({
              width: 'auto',
              height: 'auto'
          });
        }

        if(pop){
          pop.show();

          //clone
          odiv.find('.con').html('').append(pop.clone(true));

          pop.hide();
        }

        //添加样式
        odiv.addClass(opts.pop_class);
        if (pop) {
            //显示
            odiv.show().css({ 'left': f.getObjLeft(odiv) + 'px', 'top': f.getObjTop(odiv) + 'px' });
        }
        if(odiv.is(':visible')){
          if (opts.afterShow != null && typeof opts.afterShow === 'function') {
            opts.afterShow(_this);
          }
        }

        //遮罩
        if (pop && opts.isMask) {
          if($('.mask').length < 1){
            $('body').append('<div id="mask" class="mask"></div>');
          }
          $('.mask').width(f.getScreenWidth()).height(f.getDocumentHeight());
        }

        //关闭
        odiv.find('.head span').bind({
          click:function(){
            var bool = true;
            if (opts.beforeClose != null && typeof opts.beforeClose === 'function') {
                bool = opts.beforeClose(_this);
            }
            if(bool){
              if (opts.onClose != null && typeof opts.onClose === 'function') {
                var res = opts.onClose(_this);
                if(!res && opts.onOff){
                  window.location.reload();
                  return false;
                }
              }

              odiv.remove();
              $('.iframe').remove();
              $('.mask').remove();

              if (opts.afterClose != null && typeof opts.afterClose === 'function') {
                  opts.afterClose(_this);
              }
            }
          return false;
          }
        });

        if(opts.isMove){
          f.movePop(opts, odiv);
        }

        if(f.isIe6()){
          //鼠标滚动
          $(window).scroll(function(){
            if(odiv.is(':visible')){
              odiv.stop().animate({'left':f.getObjLeft(odiv) + f.getScrollLeft() +'px','top':f.getObjTop(odiv) + f.getScrolltop() +'px'},0).dequeue();
            }
          });
        }

        ////窗口大小改变
        //$(window).resize(function(){
        //  if(odiv.is(':visible')){
        //    odiv.stop().animate({'left':f.getObjLeft(odiv) + f.getScrollLeft() +'px','top':f.getObjTop(odiv) + f.getScrolltop() +'px'},0).dequeue();
        //  }
        //});
      });
    });
  };
})(jQuery);