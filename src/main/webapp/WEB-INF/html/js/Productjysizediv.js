// var testData = {
//     "comments": [
//       {
//           "Id": "3",
//           "OrderDate": "2014-09-09",
//           "UserName": "用户名"
//       }], "currentPage": "2", "totalPage": "5"
// };

$(function() {
    var isFirstLoad = true;
    $('.tab .jysize-li').click(function() { //产品销量
        $(this).addClass('curr').siblings().removeClass('curr');
        if (isFirstLoad) {

            $('#jysizediv').append('<div isPage="ture" class="sp-page-footer"></div>');

            //分页
            $('#jysizediv').smallPaging({
                pageSize: 5,
                pageBack: function(pageSize, pageIndex) {
                    var pageCallBack = {};
                    var url = '/Product/GetjySizeByProduct';
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
                                for (var i = 0; i < data.comments.length; i++) {
                                    var e = data.comments[i];
                                    str += '<tr>' + '<td class="w200">' + nameStrChar(e.UserName) + '</td>' + ' <td class="w320">' + '<p class="">' + e.ShopName + '</p>'
                                        //+ '<p class="w320">' + e.ShopName + '</p>'
                                        + ' </td>'
                                        //+ '<td class="w150 c0066CD">' + e.Tax + '</td>'
                                        + '<td class="w150">' + e.ShopId + '</td>' + '<td class="w150 c888">' + e.OrderDate + '</td>' + '</tr>';
                                }
                                pageCallBack.recordCounts = data.totalCount;
                                $('#jysizediv-0').html(template[0] + template[1] + str + template[2]);
                            }
                        }
                    });
                    return pageCallBack;
                }
            });

            isFirstLoad = false;
        }
        $('#jysizediv').show();
        $(document).scrollTop($('#jysizediv').offset().top - 52);
    });
});