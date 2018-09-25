var skuId = new Array(3);

//chooseResult();
function chooseResult() {
    //已选择显示
    var str = '<em>已选择&nbsp;</em>';
    var len = $('#choose li .dd .selected').length;
    for (var i = 0; i < len; i++) {
        if (i < len - 1)
            str += '<strong>“' + $('#choose li .dd .selected a').eq(i).text() + '”</strong>，';
        else
            str += '<strong>“' + $('#choose li .dd .selected a').eq(i).text() + '”</strong>';
        var index = parseInt($('#choose li .dd .selected').eq(i).attr('st'));
        skuId[index] = $('#choose li .dd .selected').eq(i).attr('cid');
    }
    //console.log(skuId);
    $('#choose-result .dd').html(str)
    //请求Ajax获取价格
    if (len === $(".choose-sku").length) {
        var gid = $("#gid").val();
        var sku = '';
        for (var i = 0; i < skuId.length; i++) {
            sku += ((skuId[i] == undefined ? 0 : skuId[i]) + '_');
        }
        var newSKU = gid;
        for (var i = 0; i < skuId.length; i++) {
            newSKU += ((skuId[i] == undefined ? '_' + 0 : '_' + skuId[i]));
        }
        getStock(newSKU);
        if (sku.length === 0) { sku = "0_0_0_"; }
    }
}

function getStock(skuId) {
    $.ajax({
        type: 'get',
        url: '/Product/GetStock',
        data: { skuId: skuId },
        dataType: 'json',
        cache: false,// 开启ajax缓存
        async: false,
        success: function (data) {
            $("#stockProduct").text(data.Stock);
            var stock = parseInt(data.Stock);
            var Status = parseInt(data.Status);
            var isshoweasybt = false;
            if (stock > 0 && Status == 1) {
                isshoweasybt = true;
                $("#stockProductImage").text("有货，下单后立即发货");
                $('#choose-btn-buy').show();
                $("#choose-btn-append").removeClass("disabled");
            } else {
                $("#stockProduct").html("0");
                $("#stockProductImage").html("缺货");
                $("#stockProductImage").html('<div class="dd"><strong style="color:red;">提示：无货</strong></div>');
                $("#choose-btn-append").addClass("disabled");
                $('#choose-btn-buy').hide();
            }
            showEasyBuyBt(isshoweasybt);

        },
        error: function (e) {
            //alert(e);
        }
    });

}

//处理轻松购按钮的显示
function showEasyBuyBt(isshow, isComple) {
    var isshowbt = false;
    var iscomple = isComple || false;
    isshowbt = !!isshow;
    if (isshowbt) {
        var easybuybt = $("#choose-btn-easybuy");
        easybuybt.hide();   //不启用轻松购 by DZY[150713]
        if (false) {
            var curisshow = easybuybt.is(":visible");
            if (iscomple) curisshow = true;
            if (isshowbt && curisshow) {
                easybuybt.show();
            } else {
                easybuybt.hide();
            }
        }
    }
}


function show(obj, id) {
    var y = $(obj).offset().top;
    var x = $(obj).offset().left + 170;
    var objDiv = $("#" + id + "");
    $(objDiv).css("display", "block");
    $(objDiv).css("left", x);
    $(objDiv).css("top", y);
}
function hide(obj, id) {
    var objDiv = $("#" + id + "");
    $(objDiv).css("display", "none");
}


//详情页右侧店铺信息
function loadShopInfo() {
    //计算规则：
    //高 （店铺得分-同行业平均分）/（同行业商家最高得分-同行业平均分）
    //低 （同行业平均分-店铺得分）/（同行业平均分-同行业商家最高低分）
    var isSellerAdminProdcut = $("#isSellerAdminProdcut").val() == "1" ? true : false;
    var upImage = "up";
    var dowmImage = "down";
    var red = "red";
    var green = "green";

    var productAndDescription = parseFloat($('#ProductAndDescription').val()).toFixed(2);
    var productAndDescriptionPeer = parseFloat($('#ProductAndDescriptionPeer').val()).toFixed(2);
    var productAndDescriptionMax = parseFloat($('#ProductAndDescriptionMax').val()).toFixed(2);
    var productAndDescriptionMin = parseFloat($('#ProductAndDescriptionMin').val()).toFixed(2);
    var productAndDescriptionContrast = 0;
    var productAndDescriptionColor = "";
    if (productAndDescription > productAndDescriptionPeer) {
        if (productAndDescriptionMax - productAndDescriptionPeer == 0) {
            productAndDescriptionContrast = "持平";
        } else {
            productAndDescriptionContrast = (((productAndDescription - productAndDescriptionPeer) / (productAndDescriptionMax - productAndDescriptionPeer)) * 100).toFixed(2) + '%';
        }
        productAndDescriptionColor = red;
    }
    else {
        if (productAndDescriptionPeer - productAndDescriptionMin == 0) {
            productAndDescriptionContrast = "持平";
            productAndDescriptionColor = red;
        }
        else {
            productAndDescriptionContrast = ((productAndDescriptionPeer - productAndDescription) / (productAndDescriptionPeer - productAndDescriptionMin) * 100).toFixed(2) + '%';
            productAndDescriptionColor = green;
        }


    }


    var sellerServiceAttitude = parseFloat($('#SellerServiceAttitude').val()).toFixed(2);
    var sellerServiceAttitudePeer = parseFloat($('#SellerServiceAttitudePeer').val()).toFixed(2);
    var sellerServiceAttitudeMax = parseFloat($('#SellerServiceAttitudeMax').val()).toFixed(2);
    var sellerServiceAttitudeMin = parseFloat($('#SellerServiceAttitudeMin').val()).toFixed(2);
    var sellerServiceAttitudeContrast = 0;
    var sellerServiceAttitudeColor = "";

    if (sellerServiceAttitude > sellerServiceAttitudePeer) {
        if (sellerServiceAttitudeMax - sellerServiceAttitudePeer == 0) {
            sellerServiceAttitudeContrast = "持平";
        } else {
            sellerServiceAttitudeContrast = (((sellerServiceAttitude - sellerServiceAttitudePeer) / (sellerServiceAttitudeMax - sellerServiceAttitudePeer)) * 100).toFixed(2) + '%';
        }

        sellerServiceAttitudeColor = red;
    }
    else {
        if (sellerServiceAttitudePeer - sellerServiceAttitudeMin == 0) {
            sellerServiceAttitudeContrast = "持平";
            sellerServiceAttitudeColor = red;
        } else {
            sellerServiceAttitudeContrast = ((sellerServiceAttitudePeer - sellerServiceAttitude) / (sellerServiceAttitudePeer - sellerServiceAttitudeMin) * 100).toFixed(2) + '%';
            sellerServiceAttitudeColor = green;
        }

    }



    var sellerDeliverySpeed = parseFloat($('#SellerDeliverySpeed').val()).toFixed(2);
    var sellerDeliverySpeedPeer = parseFloat($('#SellerDeliverySpeedPeer').val()).toFixed(2);
    var sellerDeliverySpeedMax = parseFloat($('#SellerDeliverySpeedMax').val()).toFixed(2);
    var sellerDeliverySpeedMin = parseFloat($('#SellerDeliverySpeedMin').val()).toFixed(2);
    var sellerDeliverySpeedContrast = 0;
    var sellerDeliverySpeedColor = "";
    if (sellerDeliverySpeed > sellerDeliverySpeedPeer) {
        if (sellerDeliverySpeedMax - sellerDeliverySpeedPeer == 0) {
            sellerDeliverySpeedContrast = "持平";
        }
        else {
            sellerDeliverySpeedContrast = (((sellerDeliverySpeed - sellerDeliverySpeedPeer) / (sellerDeliverySpeedMax - sellerDeliverySpeedPeer)) * 100).toFixed(2) + '%';
        }
        sellerDeliverySpeedColor = red;
    }
    else {
        if (sellerDeliverySpeedPeer - sellerDeliverySpeedMin == 0) {
            sellerDeliverySpeedContrast = "持平";
            sellerDeliverySpeedColor = red;
        } else {
            sellerDeliverySpeedContrast = ((sellerDeliverySpeedPeer - sellerDeliverySpeed) / (sellerDeliverySpeedPeer - sellerDeliverySpeedMin) * 100).toFixed(2) + '%';
            sellerDeliverySpeedColor = green;
        }
    }

    var productAndDescriptionImage = productAndDescription >= productAndDescriptionPeer ? upImage : dowmImage;
    var sellerServiceAttitudeImage = sellerServiceAttitude >= sellerServiceAttitudePeer ? upImage : dowmImage;
    var sellerDeliverySpeedImage = sellerDeliverySpeed >= sellerDeliverySpeedPeer ? upImage : dowmImage;
    var showShop = $( '#showShop' ).val();
    showShop = !!showShop;

    //平台直营店铺信息
    if (isSellerAdminProdcut) {
        $.ajax({
            type: 'get',
            url: '/Product/GetShopInfo',
            data: { sid: $("#shopid").val(), productId: $("#gid").val() },
            dataType: 'json',
            cache: true,// 开启ajax缓存
            success: function (data) { 
                if (data && data.IsSelf == true) {//
                    var brandLogo = data.BrandLogo;
                    var html = ""; 
                        if (brandLogo == "") {
                            html = '<dl id="seller">' +

                                '</dl>' +
                                '<dl id="evaluate">' +
                                '<dt style=" margin-bottom:10px;color:#fff;background-color:#0078F0; padding:2px 5px; border-radius:2px;">平台直营</dt>' +
                                '</dl>' +
                                ' <dl id="hotline">' + $("#online-service").html() +
                                '</dl>';
                        }
                        else {
                            html = '<dl id="seller">' +
                                '<a href="/Search/?b_id=' + data.BrandId + '"> <img  height="70" width="190" src="' + data.BrandLogo + '"     /> </a>' +
                                '</dl>' +
                                '<dl id="evaluate">' +
                                '<dt style="margin-bottom:10px;color:#fff;background-color:#0078F0; padding:2px 5px; border-radius:2px;">平台直营</dt>' +
                                '</dl>' +
                                ' <dl id="hotline">' + $("#online-service").html() +
                                '</dl>';
                        }                  
                    $("#brand-bar-pop").show().append($(html));
                }

            },
            error: function (e) {
                //alert(e);
            }
        });
        return;
    }

    //汽城自营店铺信息
    $.ajax({
        type: 'get',
        url: '/Product/GetShopInfo',
        data: { sid: $("#shopid").val() },
        dataType: 'json',
        cache: true,// 开启ajax缓存
        success: function (data) {
            if (data && data.IsSelf !== true) {
                //console.log(data);
                var html = '';
                
                if (data.GradeId == 1 && data.shopImg != "") {
                    html = '<div class="malllogo"><img src="' + data.shopImg + '" /></div>' +
                 '<dl id="pop-company">' +
                    '<dd class="mallname"><span>' + data.Name + '</span><a target="_blank" href="/Shop/Home/' + data.Id.toString() + '">汽配人自营</a></dd>' +
                     $("#online-service").html() +  
                    '</dl>' +                                  
                       '<div id="enter-shop">' +
                                    '<a target="_blank" href="/Shop/Home/' + data.Id + '">进入店铺</a>' +
                                    '<a href="javascript:addFavorite(' + data.Id + ')">关注店铺</a>' +
                                    '</div>';
                } else {
                  var   shopinfo = '<dd><a target="_blank" style="color:#62afe4;" href="/Shop/Home/' + data.Id.toString() + '">' + data.Name + '</a></dd>';
                    if (showShop) {
                        shopinfo = '<dd>' + data.Name + '</dd>';
                    }
                      html = '<dl id="seller">' +
                            //'<dt>卖　　家：</dt>' +
                            shopinfo +
                            '</dl>' +
                            '<div id="evaluate-detail">' +
                            '<div class="mc">' +
                            '<dl >' +
                                '<dt>描述相符</dt>' +
                                '<dd title="（商家得分-行业平均得分）/（行业商家最高得分-行业平均得分）">' +
                                '<span class="' + productAndDescriptionColor + '">' + productAndDescription + '</span>' +
                                '<i class="' + productAndDescriptionImage + '"></i>' +
                                '<span class="' + productAndDescriptionColor + '">' + productAndDescriptionContrast + '</span>' +
                                '</dd>' +
                                '</dl>' +
                                '<dl>' +
                                '<dt>发货速度</dt>' +
                                '<dd title="（行业平均得分-商家得分）/（行业平均得分-行业商家最低得分）">' +
                                '<span class="' + sellerDeliverySpeedColor + '">' + sellerDeliverySpeed + '</span>' +
                                '<i class="' + sellerDeliverySpeedImage + '"></i>' +
                                '<span class="' + sellerDeliverySpeedColor + '">' + sellerDeliverySpeedContrast + '</span>' +
                                '</dd>' +
                                '</dl>' +
                                '<dl>' +
                                '<dt>服务态度</dt>' +
                                    '<dd title="（行业平均得分-商家得分）/（行业平均得分-行业商家最低得分）">' +
                                     '<span class="' + sellerServiceAttitudeColor + '">' + sellerServiceAttitude + '</span>' +
                                    '<i class="' + sellerServiceAttitudeImage + '"></i>' +
                                     '<span class="' + sellerServiceAttitudeColor + '">' + sellerServiceAttitudeContrast + '</span>' +
                                    '</dd>' +
                                    '</dl>' +
                                    '</div>' +
                                    '</div>' +
                                    '<dl id="online-service"><div class="line"></div>' +
                                    '</dl>' +
                                    //'<dl id="pop-company"><dt>公司名称：</dt><dd>' + data.CompanyName + '</dd></dl>' +
                                      '<dl id="pop-company">' + $("#online-service").html() + '</dl>' +
                                      '<dl id="pop-address"><dt>公司名称：</dt><dd>' + data.CompanyName + '</dd></dl>' +
                                    '<dl id="pop-address"><dt>所 在 地：</dt><dd id="regionAddressId">' + data.Address + '</dd></dl>' +
                                    ' <dl id="hotline">' +
                                    '<dt>联系电话：</dt>' +
                                    '<dd>' + data.Phone + '</dd>' +
                                    '</dl>' +
                                    '<div id="enter-shop">' +
					//'<dl id="pop-company">' + $("#online-service").html() + '</dl>';
                    //  if (data.IsSevenDayNoReasonReturn || data.IsCustomerSecurity || data.TimelyDelivery) {
                    //      html += '<h3>服务支持：</h3>';
                    //      if (data.IsSevenDayNoReasonReturn) {
                    //          html += '<dl class="pop-ensure"><dt><a href="/Article/Category"><img src="/Images/SevenDay.jpg">  七天无理由退换货</a></dt></dl>';
                    //      }
                    //      if (data.IsCustomerSecurity) {
                    //          html += '<dl class="pop-ensure"><dt><a href="/Article/Category"><img src="/Images/Security.jpg">  消费者保障服务</a></dt></dl>';
                    //      }
                    //      if (data.TimelyDelivery) {
                    //          html += '<dl class="pop-ensure"><dt><a href="/Article/Category"><img src="/Images/TimelyDelivery.jpg"> 及时发货</a></dt></dl>';
                    //      }
                    //  }
                    //  html += '<div id="enter-shop">' +
                                    '<a target="_blank" href="/Shop/Home/' + data.Id + '">进入店铺</a>' +
                                    '<a href="javascript:addFavorite(' + data.Id + ')">关注店铺</a>' +
                                    '</div>';
                }
                $("#brand-bar-pop").show().append($(html));
                if ($('#online-service').html() == '<div class="line"></div>') { $('#online-service').hide() }
                if (showShop) { $("#enter-shop").hide(); }
            }

        },
        error: function (e) {
            //alert(e);
        }
    });
}

//店内分类
function loadShopCate() {
    $.ajax({
        type: 'get',
        url: '/Product/GetShopCate',
        data: { gid: $("#gid").val() },
        dataType: 'json',
        cache: true,// 开启ajax缓存
        success: function (data) {
            if (data) {
                //console.log(data);
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    var text = '<dl><dt><a href="/Shop/Search?cid=' + data[i].Id + '&sid=' + $('#shopid').val() + '&pageNo=1" target="_blank"><s></s>' + data[i].Name + '</a></dt>';
                    if (data[i].SubCategory.length > 0) {
                        for (var j = 0; j < data[i].SubCategory.length; j++) {
                            text += '<dd><a href="/Shop/Search?cid=' + data[i].SubCategory[j].Id + '&sid=' + $('#shopid').val() + '&pageNo=1" target="_blank">' + data[i].SubCategory[j].Name + '</a></dd>';
                        }
                    }
                    text += '</dl>';
                    html += text;
                }
                $("#shopCateDiv").empty().append($(html));
            }
        },
        error: function (e) {
            //alert(e);
        }
    });
}

//加载热销产品
function loadHotSaleProduct() {
    $.ajax({
        type: 'get',
        url: '/Product/GetHotSaleProduct',
        data: { sid: $("#shopid").val() },
        dataType: 'json',
        cache: true,// 开启ajax缓存
        success: function (data) {
            if (data) {
                //console.log(data);
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    var text = '<li class="fore1">' +
                    '<div class="p-img"><a href="/Product/Detail/' + data[i].Id.toString() + '" target="_blank"><img alt="' + data[i].Name + '" src="' + data[i].ImgPath + '/1_220.png" /></a></div>' +
                            '<div class="p-name"><a href="/Product/Detail/' + data[i].Id.toString() + '" target="_blank" title="">' + data[i].Name + '</a></div>' +
                            '<div class="p-info p-bfc">' +
                                '<div class="p-count fl"><s>' + (i + 1).toString() + '</s><b>热销' + data[i].SaleCount.toString() + '件</b></div>' +
                                '<div class="p-price fr"><strong>￥+' + data[i].Price.toString + '</strong></div>' +
                            '</div>' +
                        '</li>';
                    html += text;
                }
                $("#hotsaleDiv").empty().append($(html));
            }
        },
        error: function (e) {
            //alert(e);
        }
    });
}


//加载浏览记录产品
function LogProduct() {

    $.ajax({
        type: 'post',
        url: '/Product/LogProduct',
        data: { pid: $("#gid").val() },
        dataType: 'json',
        cache: false,// 开启ajax缓存
        success: function (data) {
            if (data) {
                //console.log(data);
            }
        },
        error: function (e) {
            //alert(e);
        }
    });
}

//加载热门关注产品
function loadHotConcernedProduct() {
    $.ajax({
        type: 'get',
        url: '/Product/GetHotConcernedProduct',
        data: { sid: $("#shopid").val() },
        dataType: 'json',
        cache: true,// 开启ajax缓存
        success: function (data) {
            if (data) {
                //console.log(data);
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    var text = '<li class="fore1">' +
                    '<div class="p-img"><a href="/Product/Detail/' + data[i].Id.toString() + '" target="_blank"><img alt="' + data[i].Name + '" src="' + data[i].ImgPath + '/1_220.png" /></a></div>' +
                            '<div class="p-name"><a href="/Product/Detail/' + data[i].Id.toString() + '" target="_blank" title="">' + data[i].Name + '</a></div>' +
                            '<div class="p-info p-bfc">' +
                                '<div class="p-count fl"><s>' + (i + 1).toString() + '</s><b>关注' + data[i].SaleCount.toString() + '次</b></div>' +
                                '<div class="p-price fr"><strong>￥+' + data[i].Price.toString + '</strong></div>' +
                            '</div>' +
                        '</li>';
                    html += text;
                }
                $("#hotConcerned").empty().append($(html));
            }
        },
        error: function (e) {
            //alert(e);
        }
    });
}


//加载产品描述
function loadGetProductDesc() {
    $.ajax({
        type: 'get',
        url: '/Product/GetProductDesc',
        data: { pid: $("#gid").val() },
        dataType: 'json',
        cache: true,// 开启ajax缓存
        success: function (data) {
            if (data) {
                //console.log(data);
                $("#product-html").append($(data.DescriptionPrefix));
                $("#product-html").append($(data.ProductDescription));
                $("#product-html").append($(data.DescriptiondSuffix));
                $('.mb-l').fixedNav({
                    upSpace: 34
                });
            }
        },
        error: function (e) {
            //alert(e);
        }
    });
}

function loadGetEnableBuyInfo() {
    if ($('#IsExpiredShop').val()) {
        $('#summary-price').html('<div class="dd"><strong style="font-size:25px;color:red;">提示：该商品所在店铺已过期！</strong></div>');
        $('#choose-btn-buy').hide();
        $("#choose-btn-append").addClass("disabled");
    } else {
        $.ajax({
            type: 'get',
            url: '/Product/GetEnableBuyInfo',
            data: { gid: $("#gid").val() },
            dataType: 'json',
            cache: true,// 开启ajax缓存
            async: false,//同步
            success: function (data) {
                if (data) {
                    //console.log(data);
                    if (!data.hasSKU) {
                        $("#stockProductImage").html("缺货");
                        $("#stockProduct").html("0");
                    }
                    else if (data.IsOnSale === false) {
                        $('#summary-price').html('<div class="dd"><strong style="font-size:25px;color:red;">提示：该商品已经下架！</strong></div>');
                        $("#stockProductImage").html('<div class="dd"><strong style="color:red;">提示：无货</strong></div>');
                    }
                    else {
                        $("#choose-btn-append").removeClass("disabled");
                        $('#choose-btn-buy').show();
                    }
                    if (data.IsOnSale && data.Logined == 1 && data.hasQuick === 1 && data.hasSKU) {
                        showEasyBuyBt(true, true);
                    }

                }

            },
            error: function (e) {
                //alert(e);
            }
        });
    }


}



//加载产品销量评价评分
function loadGetCommentsNumber() {
    $.ajax({
        type: 'get',
        url: '/Product/GetCommentsNumber',
        data: { gid: $("#gid").val() },
        dataType: 'json',
        cache: true,// 开启ajax缓存
        success: function (data) {
            if (data) {
                $("#Comments").html(data.Comments.toString());
                $("#CommentsU").html("(" + data.Comments.toString() + ")");
                $("#ConsU").html("(" + data.Consultations.toString() + ")");
                $("#jysize").html("(" + data.jysize.toString() + ")"); 
            }
        },
        error: function (e) {
            //alert(e);
        }
    });
}

//加载产品属性
function loadProductAttr() {
    $.ajax({
        type: 'get',
        url: '/Product/GetProductAttr',
        data: { pid: $("#gid").val() },
        dataType: 'json',
        cache: true,// 开启ajax缓存
        success: function (data) {
            if (data) {
                //console.log(data);
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    var values = "";
                    for (var j = 0; j < data[i].AttrValues.length; j++) {
                        values += data[i].AttrValues[j].Name + ",";
                    }
                    values = values.substr(0, values.length - 1)
                    var text = '<li>' + data[i].Name + '：' + values + (data[i].Unit == "" ? "" : '&nbsp;') + data[i].Unit + '</li>';

                    html += text;
                }
                //console.log(data);
                $("#detail-list").append($(html));
            }
        },
        error: function (e) {
            //alert(e);
        }
    });
}

$(function () {
    //if ($(".choose-sku").length == 0) {
    //    var skuIdZero = $("#gid").val() + "_0_0_0";
    //    getStock(skuIdZero);
    //}


    $("#OrderNow").click(bindToSettlement);
    $("#buy-num").blur(function () {
        checkBuyNum();
        //if(parseInt($('#buy-num').val())>parseInt($("#stockProduct").html()))
        //{
        //    $.dialog.errorTips('不能大于库存数量');
        //    $('#buy-num').val(parseInt($("#stockProduct").html()));
        //    return false;
        //}
        calcFreight();
    });

    //购买数量加减
    $('.wrap-input .btn-reduce').click(function () {
        if (parseInt($('#buy-num').val()) > 1) {
            $('#buy-num').val(parseInt($('#buy-num').val()) - 1);
        }
        calcFreight();
    });
    $('.wrap-input .btn-add').click(function () {
        if (parseInt($('#buy-num').val()) === 100) {
            $.dialog.errorTips('最多不能大于 100 件');
            $('#buy-num').val(100);
        } else {
            $('#buy-num').val(parseInt($('#buy-num').val()) + 1);
        }
        calcFreight();
        //alert(parseInt($('#buy-num').val())+1)
    });

    $("#easyBuyBtn").click(function () {
        if (parseInt($('#buy-num').val()) > parseInt($("#stockProduct").html())) {
            $.dialog.errorTips('不能大于库存数量');
            $('#buy-num').val(parseInt($("#stockProduct").html()));
            return false;
        }
        var has = $("#has").val();
        var dis = $(this).parent("#choose-btn-append").hasClass('disabled');
        if (has != 1 || dis) return;
        var len = $('#choose li .dd .selected').length;
        if (len === $(".choose-sku").length) {
            var sku = getskuid();
            if (checkBuyNum()) {
                var num = $("#buy-num").val();
                location.href = "/Order/EasyBuyToOrder?skuId=" + sku + "&count=" + num;
                //   alert('SKUId：'+sku+'，购买数量：'+num);
            }
        } else {
            $.dialog.errorTips('请选择商品规格');

        }
    });

    loadGetEnableBuyInfo();
    //loadShopCate();    //店内分类  用页面的方式载入
    //loadShopInfo();    //右侧店铺信息
    //loadHotSaleProduct();   //热销产品   用页面的方式载入
    //loadHotConcernedProduct();  //热门关注   用页面的方式载入
    //loadProductAttr();    //产品属性   用页面的方式载入
    //loadGetProductDesc();  //产品介绍 用页面的方式再载入
    //loadGetCommentsNumber();    //加载商品详情页 交易记录、评价、咨询
    LogProduct();

    //导航切换
    //$('.tab .comment-li').click(function () {
    //    $('#product-detail .mc').hide();
    //    $(this).addClass('curr').siblings().removeClass('curr');
    //    $(document).scrollTop($('#comment').offset().top - 52);
    //});
    //$('.tab .consult-li').click(function () {
    //    $('#product-detail .mc').hide();
    //    $(this).addClass('curr').siblings().removeClass('curr');
    //    $(document).scrollTop($('#consult').offset().top - 52);
    //});
    //$('.tab .jysize-li').click(function () {//产品销量
    //    $('#product-detail .mc').hide();
    //    $(this).addClass('curr').siblings().removeClass('curr');
    //    //$(document).scrollTop($('#jysizediv').offset().top - 52);
    //});

    $('.tab .goods-li').click(function () {
        $('#product-detail .mc').show();
        $(this).addClass('curr').siblings().removeClass('curr');
        $(document).scrollTop($('#product-detail').offset().top);
    });

    //导航浮动
    $(window).scroll(function () {
        if ($(document).scrollTop() >= $('#product-detail').offset().top)
            $('#product-detail .mt').addClass('nav-fixed');
        else
            $('#product-detail .mt').removeClass('nav-fixed');
    });


    $("#shopInSearch").click(function () {
        Search();
    });

    $('#sp-keyword').keydown(function (e) {
        if (e.keyCode == 13) {
            Search();
        }
    });

    $('#sp-price').keydown(function (e) {
        if (e.keyCode == 13) {
            Search();
        }
    });

    $('#sp-price1').keydown(function (e) {
        if (e.keyCode == 13) {
            Search();
        }
    });


    //关注商品
    $("#choose-btn-coll .btn-coll").click(function () {
        checkLogin(function (func) {
            addFavoriteFun(func);
        });
    });


    function Search() {
        var start = isNaN(parseFloat($("#sp-price").val())) ? 0 : parseFloat($("#sp-price").val());
        var end = isNaN(parseFloat($("#sp-price1").val())) ? 0 : parseFloat($("#sp-price1").val());
        var shopid = $("#shopid").val();

        var keyword = $("#sp-keyword").val();
        if (keyword.length === 0 && start == end) {
            $.dialog.errorTips('请输入关键字或者价格区间');
            return;
        }
        location.href = "/Shop/Search?pageNo=1&sid=" + shopid + "&keywords=" + keyword + "&startPrice=" + start + "&endPrice=" + end;
    }

    function addFavoriteFun(callBack) {
        $.post('/Product/AddFavoriteProduct', { pid: $("#gid").val() }, function (result) {
            if (result.successful == true) {
                if (result.favorited == true) {
                    $.dialog.tips(result.mess);
                } else {
                    $.dialog.succeedTips(result.mess);
                }
                (function () { callBack && callBack(); })();
            }

        });
    }

    function checkLogin(callBack) {
        var memberId = $.cookie('qpr_mall_user');
        var member = "UUUyNXppN2l2c2tEK2d2OTF3cnFOUT09";  //memberId=0时加密的PC端的memberId
        if (memberId != member) {
            callBack();
        }
        else {
            $.fn.login({}, function () {
                callBack(function () { location.reload(); });
            }, '', '', '/Login/Login');
        }
    }



    //加入购物车
    $("#InitCartUrl").click(function (e) {
        if (parseInt($('#buy-num').val()) > parseInt($("#stockProduct").html())) {
            $.dialog.errorTips('不能大于库存数量');
            $('#buy-num').val(parseInt($("#stockProduct").html()));
            return false;
        }
        var has = $("#has").val();
        var dis = $(this).parent("#choose-btn-append").hasClass('disabled');
        if (has != 1 || dis) return;
        var len = $('#choose li .dd .selected').length;
        if (len === $(".choose-sku").length) {
            var sku = getskuid();
            if (checkBuyNum()) {
                var num = $("#buy-num").val();
                //location.href = "/cart/addToCart?skuId=" + sku + "&count=" + num;
                //   alert('SKUId：'+sku+'，购买数量：'+num);

                var loading = showLoading();
                $.ajax({
                    type: 'POST',
                    url: "/cart/AddProductToCart?skuId=" + sku + "&count=" + num,
                    dataType: 'json',
                    success: function (data) {
                        loading.close();
                        if (data.success == true) {
                            var cartOffset = $("#right_cart").offset(),
								h = $(document).scrollTop();
                            flySrc = $('#spec-list li').first().find('img')[0].src,
                            flyer = $('<img class="cart-flyer" src="' + flySrc + '"/>');
                            flyer.fly({
                                start: {
                                    left: e.pageX,
                                    top: e.pageY - h - 30
                                },
                                end: {
                                    left: cartOffset.left,
                                    top: cartOffset.top - h + 30,
                                    width: 20,
                                    height: 20
                                },
                                onEnd: function () {
                                    this.destory(); //移除dom 
                                    refreshCartProducts();
                                }
                            });


                            //$.dialog.succeedTips('添加成功')
                        } else {
                            loading.close();
                            $.dialog.errorTips(data.msg);
                        }
                    },
                    error: function (e) {
                        loading.close();
                        $.dialog.errorTips('加入购物车失败');
                    }
                });
            }
        } else {
            $.dialog.errorTips("请选择商品规格！");
        }
    });

    //加入购物车
    $("#justBuy").click(function () {
        if (parseInt($('#buy-num').val()) > parseInt($("#stockProduct").html())) {
            $.dialog.errorTips('不能大于库存数量');
            $('#buy-num').val(parseInt($("#stockProduct").html()));
            return false;
        }
        var has = $("#has").val();
        var dis = $(this).hasClass('disabled');
        if (has != 1 || dis) return;
        var len = $('#choose li .dd .selected').length;
        if (len === $(".choose-sku").length) {
            var sku = getskuid();
            if (checkBuyNum()) {
                var num = $("#buy-num").val();
                location.href = "/Order/SubmitByProductId?skuIds=" + sku + "&counts=" + num;
                //alert('SKUId：'+sku+'，购买数量：'+num);
            }
        } else {
            $.dialog.errorTips("请选择商品规格！");
        }
    });

    //自营店产品详情跟普通店铺不一样显示
    //changeShowView();

    
});

/*function changeShowView() {
    if (isSellerAdminProdcut == "true") {
        $("#sp-search,#sp-category").hide();
        $("#shopname").attr("href", "#")
        bindOfficialView();
    }
    else {
        $("#sp-brand-official,#sp-category-official").hide();
    }
}*/

function checkBuyNum() {
    var num = 0;
    var result = true;
    try {
        num = parseInt($("#buy-num").val());
    } catch (ex) {
        num = 0;
    }
    if (num < 1) {
        $.dialog.errorTips('购买数量有误');
        $('#buy-num').val(1);
        result = false;
    }
    if (num > 100) {
        $.dialog.errorTips('最多不能大于 100 件');
        $('#buy-num').val(100);
        result = false;
    }

    return result;
}

function bindOfficialView() {
    loadShopCateOfficial();
    loadBrandOfficial();
}

function loadBrandOfficial() {

    $.ajax({
        type: 'get',
        url: '/Product/GetBrandOfficial',
        data: { gid: $("#gid").val() },
        dataType: 'json',
        cache: true,// 开启ajax缓存
        success: function (data) {
            if (data) {
                $("#brandDivOfficial").empty();
                //console.log(data);
                var html = '';
                var dataLength = data.length;
                for (var i = 0; i < data.length; i++) {
                    html += '<dd style="width:33%;float:left;text-align:center;"><a href="/Search/?b_id=' + data[i].Id + '" target="_blank"><s></s>' + data[i].Name + '</a></dd>';
                }

                $("#brandDivOfficial").append($(html));
            }
        },
        error: function (e) {
            //alert(e);
        }
    });
}

function loadShopCateOfficial() {

    $.ajax({
        type: 'get',
        url: '/Product/GetShopCateOfficial',
        data: { gid: $("#gid").val() },
        dataType: 'json',
        cache: true,// 开启ajax缓存
        success: function (data) {
            if (data) {
                $("#shopCateDivOfficial").empty();
                //console.log(data);
                var html = '';
                var dataLength = data.length;
                for (var i = 0; i < data.length; i++) {
                    html += '<dd style="width:50%;float:left;text-align:center;"><a href="/Search/?cid=' + data[i].Id + '" target="_blank"><s></s>' + data[i].Name + '</a></dd>';
                }

                $("#shopCateDivOfficial").append($(html));
            }
        },
        error: function (e) {
            //alert(e);
        }
    });
}

function bindToSettlement() {
    if (parseInt($('#buy-num').val()) > parseInt($("#stockProduct").html())) {
        $.dialog.errorTips('不能大于库存数量');
        $('#buy-num').val(parseInt($("#stockProduct").html()));
        return false;
    }
    var has = $("#has").val();
    var dis = $(this).parent("#choose-btn-append").hasClass('disabled');
    if (has != 1 || dis) return;
    var len = $('#choose li .dd .selected').length;
    if (len === $(".choose-sku").length) {

        var memberId = $.cookie('qpr_mall_user');

        if (memberId) {

            var sku = getskuid();
            if (checkBuyNum()) {
                var num = $("#buy-num").val();
                var loading = showLoading();
                ajaxRequest({
                    type: 'POST',
                    url: "/cart/AddToCartForOrderNow?skuId=" + sku + "&count=" + num,
                    dataType: "json",
                    success: function (data) {
                        loading.close();
                        if (data.success == true) {

                            location.href = '/order/submit?' + 'cartItemIds=' + data.value;
                        } else {
                            $.dialog.errorTips(data.msg);
                        }
                    }, error: function () {
                        loading.close();
                    }
                });

                //location.href = "/cart/addToCart?skuId=" + sku + "&count=" + num;
                //location.href = '/order/submit?' + 'cartItemIds=' + str;
            }
        }
        else {

            $.fn.login({}, function () {
                location.href = window.location.href;
            }, '', '', '/Login/Login');
        }

        //   alert('SKUId：'+sku+'，购买数量：'+num);
    } else {
        $.dialog.errorTips("请选择商品规格！");
    }



}

function getskuid() {
    var gid = $("#gid").val();
    var sku = '';
    for (var i = 0; i < skuId.length; i++) {
        sku += ((skuId[i] == undefined ? 0 : skuId[i]) + '_');
    }
    if (sku.length === 0) { sku = "0_0_0_"; }
    sku = gid + '_' + sku.substring(0, sku.length - 1);
    return sku;
}


function addFavorite(shopId) {
    checkLogin(function (func) {
        addFavoriteFun(shopId, func);
    });
}

function addFavoriteFun(shopId, callBack) {

    var loading = showLoading();
    $.post('/Product/AddFavorite', { shopId: shopId }, function (result) {
        loading.close();
        if (result.success)
            $.dialog.succeedTips('关注店铺成功', function () { callBack && callBack(); });
        else
            $.dialog.succeedTips(result.msg, function () { callBack && callBack(); });

    });
}

function checkLogin(callBack) {
    var memberId = $.cookie('qpr_mall_user');
    var member = "UUUyNXppN2l2c2tEK2d2OTF3cnFOUT09";  //memberId=0时加密的PC端的memberId
    if (memberId != member && memberId != undefined) {
        callBack();
    }
    else {
        $.fn.login({}, function () {
            callBack(function () { location.reload(); });
        }, './', '', '/Login/Login');
    }
}

//组合购
$(function () {
    var minCollTotal,
		maxCollTotal,
		minSaleTotal,
		maxSaleTotal;
    if ($('.p-group-list').length > 0)
        GroupPriceChange();

    $('.p-group-child input').change(function () {
        GroupPriceChange();
    });
});
function GroupPriceChange() {
    var mCheck = $('.p-group-main input:checked')
    minCollTotal = mCheck.data('mincollprice');//批发组合购价格
    maxCollTotal = mCheck.data('maxcollprice');//零售组合购价格
    minSaleTotal = mCheck.data('minsaleprice');//批发价格
    maxSaleTotal = mCheck.data('maxsaleprice');//零售价格

    $('.p-group-child input:checked').each(function () {
        minCollTotal += $(this).data('mincollprice');
        maxCollTotal += $(this).data('maxcollprice');
        minSaleTotal += $(this).data('minsaleprice');
        maxSaleTotal += $(this).data('maxsaleprice');
    });
    if (minCollTotal != maxCollTotal)
        $('#collTotalPrice').text('¥' + minCollTotal.toFixed(2) + '-' + maxCollTotal.toFixed(2));
    else
        $('#collTotalPrice').text('¥' + minCollTotal.toFixed(2));
    if (minSaleTotal != maxSaleTotal)
        $('#saleTotalPrice').text(minSaleTotal.toFixed(2) + '-' + maxSaleTotal.toFixed(2));
    else
        $('#saleTotalPrice').text(minSaleTotal.toFixed(2));
    if (minSaleTotal - minCollTotal != maxSaleTotal - maxCollTotal)
        $('#groupPriceMinus').text('¥' + (minSaleTotal - minCollTotal).toFixed(2) + '-' + (maxSaleTotal - maxCollTotal).toFixed(2))
    else
        $('#groupPriceMinus').text('¥' + (minSaleTotal - minCollTotal).toFixed(0))
}


function CollocationBuy() {
    var chk = $(".collochk:checked");
    var pids = "";
    var colloPids = "";
    if (chk.length < 2) {
        $.dialog.errorTips("请至少选择一个商品组合购买！");
        return;
    }
    else {
        chk.each(function (index, item) {
            if (index < chk.length - 1) {
                pids += $(item).val() + ",";
                colloPids += $(item).data("collpid") + ",";
            }
            else {
                pids += $(item).val();
                colloPids += $(item).data("collpid");
            }
        });
    }
    $.ajax({
        url: "/Product/GetCollocationProducts",
        data: { productIds: pids, colloPids: colloPids },
        async: false,
        success: function (data) {
            $("#addCollocation").html(data);
        }
    });
    $.dialog({
        title: '组合购选择',
        width: 908,
        padding: 0,
        id: 'Collocation',
        content: document.getElementById("addCollocation"),
        lock: true,
        okVal: '确定购买套餐',
        init: function () {
            var groupPrice = 0;
            for (var i = 0; i < $('.group-item').length; i++) {
                groupPrice += parseFloat($('.product-price').eq(i).text());
            }
            $('.group-price span').data('groupprice', groupPrice).text(groupPrice.toFixed(2));

            var len = $('.group-item').length;
            for (var i = 0; i < len; i++) {
                setSKUGroup($('.product-item').eq(i).data('productid'), $('.SKUgroup' + i), $('.product-item').eq(i).data('colloproductid'));
            }



            $('#groupCounts').keyup(function () {
                var groupPrice = $('.group-price span').data('groupprice');
                this.value = this.value.replace(/[^0-9]+/, '');
                if (this.value == '' || this.value < 1) {
                    this.value = '1';
                }
                $('.group-price span').text((this.value * groupPrice).toFixed(2));
            });

        },
        ok: function () {
            //创建订单页面
            var flag = 1,
				groupSkuids = '',
				collpids = '',
				groupcounts = '';
            $('.group-item').each(function () {
                $(this).removeClass('error');
                if ($(this).find('.selected').length != $(this).find(".choose-sku").length) {
                    $(this).addClass('error');
                    flag = 2;
                }
                if (parseInt($(this).find('.group-stock').text()) < parseInt($('#groupCounts').val())) {
                    $(this).addClass('error');
                    flag = 3;
                }
                groupSkuids += $(this).find('.group-skuId').val() + ',';
                collpids += $(this).find('.product-item').data('colloproductid') + ',';
                groupcounts += $('#groupCounts').val() + ','
            });
            if (flag == 2) {
                $.dialog.errorTips("有未选择规格的商品");
                return false;
            }
            if (flag == 3) {
                $.dialog.errorTips("购买数大于商品库存");
                return false;
            }

            groupSkuids = groupSkuids.substring(0, groupSkuids.length - 1);
            collpids = collpids.substring(0, collpids.length - 1);
            groupcounts = groupcounts.substring(0, groupcounts.length - 1);
            $('#skuids').val(groupSkuids);
            $('#counts').val(groupcounts);
            $('#collpids').val(collpids);
            checkLogin(function () {
                $('#CollProducts').submit();
            })

        }
    });
}