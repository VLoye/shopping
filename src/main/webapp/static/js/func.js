function iimgFix(im, x, y) {
    y = y || 99999
    im.removeAttribute("width");
    im.removeAttribute("height");
    if (im.width / im.height > x / y && im.width > x) {
        im.height = im.height * (x / im.width)
        im.width = x
        im.style.height = im.height * (x / im.width) + 'px'
    } else if (im.width / im.height <= x / y && im.height > y) {
        im.width = im.width * (y / im.height)
        im.height = y
        im.style.height = y + 'px'
    }

    //im.style.visibility = 'visible'	
}

/* 搜索切换 */
$(function () {
    var $div_li = $("#z_ser");
    $div_li.mouseover(function () {
        $(this).addClass("selover").siblings().removeClass("selout");
    })
    $div_li.mouseout(function () {
        $(this).removeClass("selover").siblings().addClass("selout");
    })
});
$(function () {
    var $div_li = $("#z_ser li");
    var $in_ser = $("#in_ser");
    var $tip_cls = $("#searchbar-category-closetips");
    var a = $div_li.eq(0).text();
    var b = $div_li.eq(0).attr('cvalue');
    $div_li.eq(1).click(function () {
        $("#z_ser").removeClass("selover").siblings().addClass("selout");
        $div_li.eq(0).text($(this).text());
        $(this).text(($(this).text() == a) ? "所有类目" : a);
        document.getElementById('sel_ser').value = (document.getElementById('sel_ser').value == '') ? b : '';
    })
    $in_ser.click(function () {
        if (document.getElementById('sel_ser').value !== '') {
            document.getElementById('searchbar-category-tips')
            document.getElementById('searchbar-category-tips').style.display = 'block';
        }
    })
    $tip_cls.click(function () {
        document.getElementById('searchbar-category-tips').style.display = 'none';
    })
});

//product yxb
$(function(){ 
    $('[data-yxbck="true"]').each(function(idx, aItem){
        var a = $(aItem);
        a.attr({href:a.attr("url_ck")});
    });
});
