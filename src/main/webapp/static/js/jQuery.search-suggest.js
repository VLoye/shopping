// search suggest pc & mobile
$(function() {
    var lastTime;
    $('[isSugBox="true"]').each(function(index, el) {
        var sb = $(el);
        var inpt = $('[isSugInput="true"]', sb);
        var sugItemBox = $('[isSugItemBox="true"]', sb);
        var sItemIn = $('[isSIBIn="true"]', sugItemBox);

        inpt.on('focus input propertychange', function(event) {

            var ts = $(this);

            lastTime = event.timeStamp;
            window.setTimeout(function() {
                var opts = sb.attr('data-opts');
                opts = eval('(' + opts + ')');

                var txt = ts.val();
                if ($.trim(txt).length && (lastTime - event.timeStamp == 0)) {
                    $.ajax({
                        type: 'get',
                        url: opts.sugUrl,
                        async: false,
                        data: {
                            keyword: txt,
                            show_count: opts.show_count
                        },
                        dataType: 'json',
                        success: function(result) {
                            if (result.isOk) {
                                var htmlArr = [];

                                var resultUrl = opts.resultUrl;
                                resultUrl += (resultUrl.indexOf('?') != -1) ? '&' : '?';
                                resultUrl += opts.isWap ? 'keywords=' : 'keyword=';

                                if (result.suggest_class && result.suggest_class.length) {
                                    var paramname = opts.isWap ? '&cid=' : '&classid=';
                                    var arr = [];
                                    $.each(result.suggest_class, function(index, item){
                                        var aurl = resultUrl + txt + paramname + item.classid;
                                        arr.push('<a href="' + aurl + '" title="' + item.classname + '">'+ item.classname + '</a>');
                                    });
                                    htmlArr.push('<li class="li-cate"><label>在以下品类中查看"<span class="c-F60">'+ txt +'</span>"相关产品：</label><div class="cate-items">'+ arr.join('') +'</div></li>');
                                }

                                if (result.suggest_result.length) {
                                    $.each(result.suggest_result, function(index, item) {
                                        var aurl = resultUrl + item;
                                        htmlArr.push('<li class="li-item"><a href="' + aurl+ '" title="' + item + '">' + item + '</a></li>');
                                    });
                                }

                                if (htmlArr.length) {
                                    sItemIn.html(htmlArr.join(''));
                                    sugItemBox.is(':hidden') && sugItemBox.slideDown(300);
                                } else {
                                    sugItemBox.is(':visible') && sugItemBox.slideUp(300);
                                }
                            }
                        }
                    });
                }
            }, 500);
        });

        $(document).on({
            click: function(event) {
                var e = event.target || window.event.target;
                var ep = $(e).parents('[isSugBox="true"]');
                var e2 = $(e).parents('[isSugSel="true"]');
                if (ep.length || $(e).is(ep)) {} else {
                    $('[isSugItemBox="true"]', '[isSugBox="true"]').hide();
                }
            },
            mouseover: function(event) {
                var e = event.target || window.event.target;
                var ep = $(e).parents('[isSugBox="true"]');
                var sb = $('[isSugBox="true"]');
                sb.each(function(index, el) {
                    var inpt = $('[isSugInput="true"]', $(el));
                    var txt = inpt.val();
                    if (!$.trim(txt).length && !ep.length && !$(e).is(ep)) {
                        $('[isSugItemBox="true"]', $(el)).hide();
                    }
                });
            }
        });
    });
});