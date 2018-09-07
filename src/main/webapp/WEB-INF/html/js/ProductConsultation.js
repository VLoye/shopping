// var testData1 = {
//     "successful": true,
//     "consults": [
//       {
//           "UserName": "007",
//           "ConsultationContent": "联想智能电视画面超清晰，还有非常多的电影电视剧可以看",
//           "ConsultationDate": "2014-09-08 12:00:00",
//           "ReplyContent": "6665487",
//           "ReplyDate": "2014-09-19 12:00:00"
//       }
//     ],
//     "totalPage": 72,
//     "currentPage": 14
// };

function html_decode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/<[^>]+>/g, "");
    /*s = str.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<br\/>/g, "\n");*/
    return s;
}

$(function() {
    var isFirstLoad = true;
    $('.tab .consult-li').click(function() { //商品咨询
        $(this).addClass('curr').siblings().removeClass('curr');
        if (isFirstLoad) {

            $('#consult').append('<div isPage="ture" class="sp-page-footer"></div>');

            //分页
            $('#consult').smallPaging({
                pageSize: 10,
                pageBack: function(pageSize, pageIndex) {
                    var pageCallBack = {};
                    var url = '/Product/GetConsultationByProduct';
                    var pid = $('#gid').val();
                    var template = [
                        '<div class="spxq-busy-recod"><table class="spxpbr-table">',
                        '<thead><tr><th class="w200">采购商</th><th class="w320">商品规格</th><th class="w150">数量</th><th class="w150">成交时间</th></tr></thead><tbody>',
                        '</tbody></table></div>',
                    ];

                    $.ajax({
                        type: 'get',
                        async: false,
                        url: url + '?pId=' + pid + '&pageNo=' + pageIndex + '&pageSize=' + pageSize,
                        dataType: 'json',
                        cache: true,
                        success: function(data) {
                            if (data) {
                                var str = '';
                                for (var i = 0; i < data.consults.length; i++) {
                                    var e = data.consults[i];
                                    str += '<div class="item"><div class="user"><span class="u-name">网　　友：' + nameStrChar(e.UserName) + '</span>' + '<span class="date-ask">' + e.ConsultationDate + '</span>' + '<dl class="ask"><dt>咨询内容：</dt><dd>' + html_decode(e.ConsultationContent) + '</dd></dl>';

                                    if (e.ReplyContent != "暂无回复") {
                                        str += '<dl class="answer"><dt>商家回复：</dt><dd><div class="content">' + html_decode(e.ReplyContent) + '</></div><div class="date-answer">' + e.ReplyDate + '</div></dd></dl>';
                                    }
                                    str += '</div></div>';
                                }
                                pageCallBack.recordCounts = data.totalCount;
                                $('#consult-0').html(str);
                            }
                        }
                    });
                    return pageCallBack;
                }
            });

            isFirstLoad = false;
        }
        $('#consult').show();
        $(document).scrollTop($('#consult').offset().top - 52);
    });
});
