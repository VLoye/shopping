/**
 * Author: wxj 2016-08-22
 * Description: jQuery.tabs.js
 * Modified by: wxj 2015-08-25 16:46
 * Modified contents: ...
**/
!(function ($) {

    // 样式
    var style = {

        active: 'ui-panel-tabs-active',

        load: 'ui-panel-tabs-load'

    };

    // 共有的
    var factory = {

        // 获取页卡头容器宽度
        getContainerWidth: function (oHead) {

            return oHead.parent().width();

        },

        // 获取可见页卡的总宽度
        getVisibleItemsWidth: function (oItems) {

            var total = oItems.filter(':visible').length, width = total * 122 - (total - 1);

            return width;

        },

        // 获取页面路径
        getUrl: function (urls, index) {

            var url = urls[index];

            if (url != null) {

                switch (typeof url) {

                    case 'string':

                        url = url;

                        break;

                    case 'function':

                        url = url();

                        break;

                    default:

                        url = null;

                        break;

                }

                // 页面路径必须为字符串格式
                if (url && typeof url === 'string') {

                    // 添加随机数参数以防止缓存
                    if (banger && banger.page && banger.page.modifyUrl) {

                        url = banger.page.modifyUrl(url, 'random', Math.random());

                    }

                }

            }

            return url;

        },

        // 加载页面
        load: function (page, url, repeat) {

            if (page.attr('isloaded') === undefined) {

                if (url) {

                    page.addClass(style.load).load(url, function () {

                        $(this).removeClass(style.load);

                        if (!repeat) {

                            $(this).attr('isloaded', '1');

                        }

                    });

                }

            }

        },

        // 显示指定页卡
        show: function (item, page) {

            // 设置头部区域样式
            item.addClass(style.active).siblings().removeAttr('class');

            // 设置内容区域显隐
            page.css('display', 'block').siblings().removeAttr('style');

        },

        // 静态加载
        staticLoad: function (oItems, oPages, opts) {

            // 显示指定选项卡
            var index = opts.defaultShow;

            this.show(oItems.eq(index), oPages.eq(index));

        },

        // 单个加载
        batchLoad: function (oItems, oPages, opts) {

            // 显示指定选项卡
            var index = opts.defaultShow;

            this.show(oItems.eq(index), oPages.eq(index));

            // 加载默认显示的选项卡
            var page = oPages.eq(index), url = this.getUrl(opts.urls, index);

            this.load(page, url, opts.repeatLoad);

        },

        // 全部加载
        fullLoad: function (oItems, oPages, opts) {

            // 显示指定选项卡
            var index = opts.defaultShow;

            this.show(oItems.eq(index), oPages.eq(index));

            // 循环加载所有选项卡
            var i = 0, length = oPages.length;

            for (; i < length; i++) {

                var page = oPages.eq(i), url = this.getUrl(opts.urls, i);

                this.load(page, url, opts.repeatLoad);

            }

        }

    };

    $.fn.tabs = function (opts) {

        opts = $.extend({}, {

            urls: null,

            defaultShow: 0,

            firstLoad: 'single',

            repeatLoad: false,

            slidingSpeed: 200,

            beforeOnClick: null,

            onClick: null

        }, opts);

        return this.each(function () {

            var oHead = $('ul[ishead]', this), oItems = oHead.children('li'), oBody = $('div[isbody]', this), oPages = oBody.children('div');

            // 如果 urls为 null，表示页卡指向的页面已写死，不由 urls地址集合控制加载
            if (opts.urls == null) {

                factory.staticLoad(oItems, oPages, opts);

            } else {

                // 首次加载时是加载单个还是所有选项卡？
                if (opts.firstLoad == 'single') { // 单个

                    factory.batchLoad(oItems, oPages, opts);

                } else if (opts.firstLoad == 'all') { // 所有

                    factory.fullLoad(oItems, oPages, opts);

                }

            }

            //选项卡切换
            oItems.click(function () {

                var item = $(this), index = oItems.index(this), page = oPages.eq(index);

                //判断当前点击的选项卡是否已处于激活状态
                var flag = item.hasClass(style.active);

                //非激活状态下进入
                if (!flag) {

                    if (opts.beforeOnClick != null && typeof opts.beforeOnClick === 'function') {

                        var cItem = oItems.filter('.' + style.active), cPage = oPages.eq(oItems.index(cItem));

                        if (!opts.beforeOnClick(cItem, cPage)) {

                            return false;

                        }

                    }

                    // 显示指定选项卡
                    factory.show(oItems.eq(index), oPages.eq(index));

                    if (opts.urls != null) {

                        // 加载当前点击的选项卡
                        factory.load(page, factory.getUrl(opts.urls, index), opts.repeatLoad);

                    }

                }

                // 点击回调函数
                if (opts.onClick != null && typeof opts.onClick === 'function') {

                    opts.onClick(item, page);

                }

            });
        });
    };

})(jQuery);
