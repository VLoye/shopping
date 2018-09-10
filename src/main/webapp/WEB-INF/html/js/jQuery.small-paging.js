!(function($) {
    var factory = {
        //设置分页
        setPage: function(opts, t){
            //定义分页
            var content = $('<ul class="'+ opts.pageStyle +'"></ul>', t.find('[isPage="ture"]'));
            var startPageIndex = 1;
            //获取参数
            var recordCounts = opts.recordCounts, pageIndex = opts.pageIndex, pageSize = opts.pageSize, isShowPageNumber = opts.isShowPageNumber, isSimple = opts.isSimple;
            //页码超出
            if (recordCounts <= 0){
                return;
                //recordCounts = pageSize;
            }
            //末页
            var endPageIndex = parseInt(recordCounts % parseInt(pageSize)) > 0 ? parseInt(recordCounts / parseInt(pageSize)) + 1 : recordCounts / parseInt(pageSize);
            if (pageIndex > endPageIndex){
                pageIndex = endPageIndex;
            }
            if (pageIndex <= 0){
                pageIndex = startPageIndex;
            }
            var nextPageIndex = pageIndex + 1;
            var prevPageIndex = pageIndex - 1;
            if (pageIndex == startPageIndex) {
                if(!isSimple){
                    content.append($('<li><span class="beginEnd">|&lt;&lt;</span></li>'));
                }
                content.append($('<li><span class="beginEnd">&lt;&lt;</span></li>'));
            } else {
                if(!isSimple){
                    content.append(factory.setBtn(opts, recordCounts, 1, '|&lt;&lt;', t));
                }
                content.append(factory.setBtn(opts, recordCounts, prevPageIndex, '&lt;&lt;', t));
            }
            //是否显示页码
            if (isShowPageNumber) {
                if (endPageIndex <= 5 && pageIndex <= 5) {
                    for (var i = 1; i <= endPageIndex; i++) {
                        if (i == pageIndex) {
                            content.append($('<li><span class="current">' + i + '</span></li>'));
                        } else {
                            content.append(factory.setBtn(opts, recordCounts, i, i, t));
                        }
                    }
                } else if (endPageIndex > 5 && endPageIndex - pageIndex <= 2) {
                    if(!isSimple){
                        content.append($('<li><span class="dotted">...</span></li>'));
                    }
                    for (var i = endPageIndex - 4; i <= endPageIndex; i++) {
                        if (i == pageIndex) {
                            content.append($('<li><span class="current">' + i + '</span></li>'));
                        } else {
                            content.append(factory.setBtn(opts, recordCounts, i, i, t));
                        }
                    }
                } else if (endPageIndex > 5 && pageIndex > 3) {
                    if(!isSimple){
                        content.append($('<li><span class="dotted">...</span></li>'));
                    }
                    for (var i = pageIndex - 2; i <= pageIndex + 2; i++) {
                        if (i == pageIndex) {
                            content.append($('<li><span class="current">' + i + '</span></li>'));
                        } else {
                            content.append(factory.setBtn(opts, recordCounts, i, i, t));
                        }
                    }
                    if(!isSimple){
                        content.append($('<li><span class="dotted">...</span></li>'));
                    }
                } else if (endPageIndex > 5 && pageIndex <= 3) {
                    for (var i = 1; i <= 5; i++) {
                        if (i == pageIndex) {
                            content.append($('<li><span class="current">' + i + '</span></li>'));
                        } else {
                            content.append(factory.setBtn(opts, recordCounts, i, i, t));
                        }
                    }
                }
            }
            if (pageIndex == endPageIndex) {
                content.append($('<li><span class="beginEnd">&gt;&gt;</span></li>'));
                if(!isSimple){
                    content.append($('<li><span class="beginEnd">&gt;&gt;|</span></li>'));
                }

            } else {
                content.append(factory.setBtn(opts, recordCounts, nextPageIndex, '&gt;&gt;', t));
                if(!isSimple){
                    content.append(factory.setBtn(opts, recordCounts, endPageIndex, '&gt;&gt;|', t));
                }
            }
            return content;
        },

        //设置下拉
        setSelect: function(opts, t){
            var html='<label>'+ opts.changeSizeText.split('_')[0] +'</label><select isChangeSize="true">';
            if(opts.sizeNum.length>0){
                for(var i=0; i<opts.sizeNum.length; i++){
                    html +='<option>'+ opts.sizeNum[i] +'</option>';
                }
            }
            html +='</select>';
            t.find('[isSelectArea="ture"]').append(html);

            var val = $('[isChangeSize="true"]').val();
            if(val){
                opts = $.extend({}, opts, {
                    pageSize: val
                });
            }

            //下拉值改变事件
            $('[isChangeSize="true"]').change(function(){
                var val = $(this).val();
                if(val){
                    opts = $.extend({}, opts, {
                        pageSize: val
                    });
                }
                //回调
                factory.exCallBack(opts, 1, t);
            });
        },

        //设置页码
        setBtn: function(opts, recordCounts, goPageIndex, text, t) {
            var gotoPage = $('<li><span title="第' + goPageIndex + '页">' + text + '</span></li>"');
            gotoPage.one('click', function() {
                //执行点击
                factory.papeClick(opts, recordCounts, goPageIndex, t);
            });
            return gotoPage;
        },

        //设置simple页脚 index/total
        setSimplePageInfo:function(opts, t){
            var recordIndex = opts.pageIndex, pageSize = opts.pageSize, pageTotal = opts.recordCounts, pageInfoText = opts.simplePageInfo.txt.split('_');
            pageSize = parseInt(pageSize, 10);
            pageTotal = parseInt(pageTotal, 10);
            var recordIndexTotal = parseInt(pageTotal / pageSize, 10) +　((pageTotal % pageSize) > 0 ? 1 : 0);
            var simplePageInfo = $('<div class="simplePageInfo"><span>'+ recordIndex +'</span>'+ pageInfoText[2] +'<span>'+ recordIndexTotal +'</span></div>');
            return simplePageInfo;
        },

        //设置页脚信息
        setPageInfo: function(opts, t){
            var recordStart = 1, recordEnd = opts.pageIndex * opts.pageSize, recordTotal = opts.recordCounts, pageInfoText = opts.pageInfoText.split('_');
            if(opts.pageIndex > 1){
                recordStart = (opts.pageIndex - 1) * opts.pageSize;
            }
            if(recordEnd > recordTotal){
                recordEnd = recordTotal;
            }
            if(recordTotal == 0){
                recordStart = 0;
            }
            var pageInfo = $('<div class="pagesInfo">' + pageInfoText[0] + '<span>'+ recordStart +'</span>'+ pageInfoText[2] +'<span>'+ recordEnd +'</span>'+ pageInfoText[4] +'<span>'+ recordTotal +'</span>'+ pageInfoText[6] +'</div>');
            return pageInfo;
        },

        //分页点击
        papeClick: function(opts, recordCounts, goPageIndex, t){
            opts = $.extend({}, opts, {
                recordCounts:recordCounts,
                pageIndex: goPageIndex
            });

            if(opts.isChangeSize){
                var val = $('[isChangeSize="true"]').val();
                if(val){
                    opts = $.extend({}, opts, {
                        pageSize: val
                    });
                }
            }
            //执行回调
            factory.exCallBack(opts, goPageIndex, t);
        },

        //显示分页
        showPage: function(opts, t){
            var pages = t.find('[isPage="ture"]');
            //清空页脚
            pages.empty();

            //显示页脚信息
            if(opts.isShowPageInfo){
                pages.append(factory.setPageInfo(opts, t));
            }
            //绘制分页
            pages.append(factory.setPage(opts, t));

            //显示simple页脚
            if(opts.isShowSimplePageInfo){
                switch(opts.simplePageInfo.pos) {
                    case 'prev':
                        pages.prepend(factory.setSimplePageInfo(opts, t));
                        break;
                    case 'next':
                        pages.append(factory.setSimplePageInfo(opts, t));
                        break;
                }
            }
        },

        // 回调方法
        exCallBack: function(opts, goPageIndex, t){
            if(opts.pageBack != null && typeof opts.pageBack === 'function'){
                var pageCallBack = opts.pageBack(opts.pageSize, goPageIndex);
                if(pageCallBack){
                    opts = $.extend({}, opts, {
                        recordCounts: pageCallBack.recordCounts,
                        pageIndex: goPageIndex
                    });
                }
                //设置分页
                factory.showPage(opts, t);
            }
        }
    };

    $.fn.smallPaging = function(opts) {
        opts = $.extend({}, {
            //总数
            recordCounts: 0,
            //默认显示第几页
            pageIndex: 1,
            //每页显示几条
            pageSize: 5,
            //分页样式
            pageStyle:'sp-pages',
            //是否显示数字
            isShowPageNumber:true,
            //pageInfo的说明文字
            pageInfoText:'显示_RStart_到_Rend_条，共_RTotal_条记录',
            //是否显示页脚信息
            isShowPageInfo:false,
            //是否显示全部
            isSimple:true,
            isShowSimplePageInfo:false,
            simplePageInfo:{
                pos:'prev', //prev, next
                txt:'_PIndex_/_RTotal_'
            },
            //是否可以改变每页显示条数
            isChangeSize:false,
            //select的说明文字
            changeSizeText:'每页显示：_Size_',
            //定义改变数组
            sizeNum:[10,20,50,100],
            //首次是否自动加载
            isAutoLoad:true,
            //回调
            pageBack:null
        }, opts);

        return this.each(function(){
            var t = $(this);
            //禁用自带的双击文字选中
            t.attr({onselectstart:'return false'}).css({
                '-moz-user-select':'none'
            });
             //改变大小
            if(opts.isChangeSize){
                //设置改变大小select
                factory.setSelect(opts, t);
            }

            //首次设置pageSize
            if(opts.isChangeSize && opts.sizeNum.length > 0){
                opts = $.extend({}, opts, {
                    pageSize: opts.sizeNum[0]
                });
            }

            //首次自动加载
            if(opts.isAutoLoad){
                //执行回调
                factory.exCallBack(opts, opts.pageIndex, t);
            }else{
                factory.showPage(opts, t);
            }

        });
    };
})(jQuery);