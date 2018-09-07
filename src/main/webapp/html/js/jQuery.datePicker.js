
document.write('<scr' + 'ipt type="text/javascript" src="script/My97DatePicker/WdatePicker.js"></scr' + 'ipt>');
/**
 * Author: wxj 2015-09-07
 * Description: jQuery.datePicker.js
 * Modified by: 
 * Modified contents: 
**/
(function ($) {

    $.fn.datePicker = function (opts) {

        opts = $.extend({}, {

            eventType: 'click',

            errDealMode: 1,

            qsEnabled: false,

            readOnly: true

        }, opts);

        return this.each(function () {

            var target = $(this), span, input, icon;

            if (target.is('span')) { // span

                span = target;

                // 查找文本框
                input = $(':text', span);

                // 为文本框赋值 id 属性
                input.attr('id', span.attr('id') + '-text');

                // 查找图标
                icon = $('i.date', span);

            } else if (target.is(':text')) { // input

                span = target.parent();

                // 查找文本框
                input = target;

                // 查找图标
                icon = input.next('i.date');

            }

            span.addClass('ui-datepicker');

            // 文本框触发日历控件
            input[opts.eventType](function () {

                // 隐藏或清除其他组件

                WdatePicker(opts);

            });

            // 图标触发日历控件
            icon.click(function () {

                // 隐藏或清除其他组件

                // 设置 el 参数，指定文本框用于存储日历值
                opts['el'] = input.attr('id');

                WdatePicker(opts);

            });
        });
    };
})(jQuery);
