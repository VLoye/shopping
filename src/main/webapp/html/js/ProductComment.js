// var testData = {
//     "comments":
//     [
//       {
//           "UserName": "用户名",
//           "ReviewContent": "评价内容",
//           "ReviewDate": "2014-09-09",
//           "ReplyContent": "答复内容",
//           "ReplyDate": "2014-10-10",
//           "BuyDate": "2014-10-10",
//           "ReviewMark": 4  /*评价星级*/
//       },
//       {
//           "UserName": "11111111111",
//           "ReviewContent": "评价内容",
//           "ReviewDate": "2014-09-09",
//           "ReplyContent": "答复内容",
//           "ReplyDate": "2014-10-10",
//           "BuyDate": "2014-10-10",
//           "ReviewMark": 4  /*评价星级*/
//       }
//     ],
//     "totalPage": 5,       /*总页数*/
//     "currentPage": 5,      /*当前页码*/
//     "goodComment": 125,    /*好评条数*/
//     "commentType": 0,      /* 0 1 2 3 */
//     "badComment": 7,       /*差评条数*/
//     "comment": 123        /*中评条数*/
// };

function nameStrChar(str) {
    if (str.length > 2 && str.length <= 5) {
        return "**" + str.substr(1, 2) + "**";
    } else if (str.length > 4) {
        return str.substr(0, 1) + "**" + str.substr(str.length - 1);
    } else return "***";
}

$(function() {
    var isFirstLoad = true;
    var uuid = 1;
    $('.tab .comment-li').click(function() { //商品评价

        $(this).addClass('curr').siblings().removeClass('curr');

        if (isFirstLoad) {
            $('#comments-list').append('<div id="comments-conts"></div><div isPage="ture" class="sp-page-footer"></div>');

            //分页
            $('#comments-list').smallPaging({
                pageSize: 10,
                pageBack: function(pageSize, pageIndex) {
                    var pageCallBack = {};
                    var url = '/Product/GetCommentByProduct';
                    var pid = $('#gid').val();
                    var template = [
                        '<div id="comment-0" class="mc">',
                        '<div class="item">',
                        '<div class="user">',
                        '<div class="u-icon">',
                        '<a target="_blank" title="查看TA的全部评价">',
                        '<div class="u-name">',
                        '<span class="u-level">',
                        '<span class="u-address">',
                        '<div class="i-item">',
                        '<div class="o-topic">',
                        '<span class="date-comment">',
                        '<div class="comment-content">'
                    ];
                    var commenttype = 0;
                    $.ajax({
                        type: 'get',
                        async: false,
                        url: url + '?pId=' + pid + '&pageNo=' + pageIndex + '&pageSize=' + pageSize + '&commentType=' + commenttype,
                        dataType: 'json',
                        cache: true,
                        success: function(data) {
                            if (data) {
                                var str = '';
                                for (var i = 0; i < data.comments.length; i++) {
                                    var e = data.comments[i];
                                    str += template[1] + template[2] + template[3] + template[4] + '<img width="50" height="50" src="/Areas/Web/images/avatar.png" title="' + e.UserName + '"/></a></div>' + template[5] + nameStrChar(e.UserName) + '</div></div>' + template[8] + template[9] + '<span class="star sa' + e.ReviewMark + '"></span>' + template[10] + e.ReplyDate + '</span></div>' + template[11] + '<dl><dt>心得：</dt><dd>' + e.ReviewContent + '</dd></dl>' + '<dl><dt>购买日期：</dt><dd>' + e.BuyDate + '</dd></dl>';
                                    if (e.ReplyContent != "暂无回复") {
                                        str += '<dl class="shop-reply"><dt>商家回复：</dt><dd><div class="content">' + e.ReplyContent + '</></div><div class="date-answer">' + e.ReplyDate + '</div></dd></dl>'
                                    }
                                    str += '</div></div><div class="corner tl"></div></div>';
                                }
                                pageCallBack.recordCounts = data.totalCount;
                                $('#comments-conts').html(str);

                                //计算好评度
                                if (uuid === 1) {
                                    var total = data.goodComment + data.badComment + data.comment,
                                        g = data.goodComment,
                                        c = data.comment,
                                        b = data.badComment,
                                        e = Math.round((g / total).toFixed(2) * 100), // 取整 误差为1
                                        f = Math.round((c / total).toFixed(2) * 100),
                                        j = 100 - e - f,
                                        arr = [total, g, c, b],
                                        arr1 = [e, f, j];
                                    $('#id_comment_btn').find('li').each(function(i, e) {
                                        $(e).find('a').append('<em>(' + arr[i] + ')</em>');
                                    });
                                    $('#i-comment strong').empty().prepend(e + '%');
                                    $('#praiseRate').empty().prepend(e + '%');
                                    $('#i-comment .percent').find('span').each(function(i, e) {
                                        $(e).html('(' + arr1[i] + '%)');
                                    });
                                    $('#i-comment .percent').find('div').each(function(i, e) {
                                        $(e).css({
                                            width: arr1[i] + 'px'
                                        });
                                    });
                                }
                                uuid++;
                            }
                        }
                    });
                    return pageCallBack;
                }
            });
            isFirstLoad = false;
        }

        $('#comment').show();
        $('#comments-list').show();
        $(document).scrollTop($('#comment').offset().top - 52);
    });
});
