/*
jQuery.fakePage.js
nav fake paging
@xj 2016.10.17
*/
!(function($) {
    $.fn.fakePage = function(o) {
        o = $.extend({}, {
            fpCont: '[isPageCont="true"]',
            fpContChild: 'li',
            pageSize: 10,
            pageIndex: 0,
            fpFoot: '[isPageFoot="true"]',
            fpFootPrev: '[isPrev="true"]',
            fpFootPage: '[isPage="true"]',
            fpFootNext: '[isNext="true"]',
            event: 'click'
        }, o);
        return this.each(function() {
            var t = $(this);
            var cont = $(o.fpCont, t);
            var cChild = $(o.fpContChild, cont);
            var totalCount = cChild.length;
            var pageNum = Math.ceil(totalCount / o.pageSize);
            var currNum = 1;

            var foot = $(o.fpFoot, t);
            var fPrev = $(o.fpFootPrev, foot);
            var fPage = $(o.fpFootPage, foot);
            var fNext = $(o.fpFootNext, foot);

            //default
            if (o.pageIndex > -1) {
                cChild.addClass('hide');
                cChild.slice(o.pageIndex, o.pageSize).removeClass('hide');
                //o.pageIndex = o.pageSize;
                fPage.html(currNum + '\/' + pageNum);
            }
            //set height
            t.css({
                height:pageNum > 1 ? cChild.outerHeight(true) * o.pageSize + foot.outerHeight(true) : cChild.outerHeight(true) * totalCount
            });
            pageNum  <= 1 && foot.remove();

            //bind
            fPrev.bind(o.event, function() {
                if (currNum > 1) {
                    cChild.addClass('hide');
                    currNum -= 1;
                    cChild.slice(currNum * o.pageSize - o.pageSize, currNum * o.pageSize).removeClass('hide');
                    fPage.html(currNum + '\/' + pageNum);
                }
            });

            //bind
            fNext.bind(o.event, function() {
                if (currNum < pageNum) {
                    cChild.addClass('hide');
                    cChild.slice(currNum * o.pageSize, currNum * o.pageSize + o.pageSize).removeClass('hide');
                    currNum += 1;
                    fPage.html(currNum + '\/' + pageNum);
                }
            });
        });
    };
})(jQuery);
