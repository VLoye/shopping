
$(function () {
    //loadCartInfo();
    bindAddAndReduceBtn();
    bindBatchRemove();
    bindSelectAll();

    $('#toSettlement').click(function () {
        bindToSettlement(false);
    });

    $('#toSettlementB2B').click(function () {
        bindToSettlement(true);
    });

});
var data = {};


///购物车数据加载
function loadCartInfo() {
    

        //#region 商城购物车
        data = {};
        $.each(cart.products, function (i, e) {
            if (data[e.shopId]) {
                if (!data[e.shopId]['name']) {
                    data[e.shopId]['name'] = e.shopName;
                }
                data[e.shopId]['shop'].push(e);
            } else {
                data[e.shopId] = {};
                data[e.shopId]['shop'] = [];
                data[e.shopId]['name'] = e.shopName;
                data[e.shopId]['status'] = e.productstatus;
                data[e.shopId]['shop'].push(e);
            }
        });
        var strproductstatus = $("#hidSaleStatus").val();
        var strproductauditstatus = $("#hidAuditStatus").val();
        //#endregion


        //#region B2B购物车数据展示处理
        var B2BData = {};
        $.each(cart.B2BProductInfo, function (index, currItem) {
            if (B2BData[currItem.shopId]) {
                if (!B2BData[currItem.shopId]['name']) {
                    B2BData[currItem.shopId]['name'] = currItem.shopName;
                }
                B2BData[currItem.shopId]['shop'].push(currItem);
            } else {
                B2BData[currItem.shopId] = {};
                B2BData[currItem.shopId]['shop'] = [];
                B2BData[currItem.shopId]['name'] = currItem.shopName;
                B2BData[currItem.shopId]['shopUrl'] = 'http://' + currItem.ShopComLoginName + '.cn.qipeiren.com';
                B2BData[currItem.shopId]['ComIsVip'] = currItem.ComIsVip;
                B2BData[currItem.shopId]['comVipType'] = currItem.ComVipType;
                B2BData[currItem.shopId]['status'] = currItem.status;
                B2BData[currItem.shopId]['shop'].push(currItem);
            }
        });
        //#endregion


        // 检测是否登录
        var memberId = $.cookie('qpr_mall_user');
        if (memberId) {
            $('.cart-inner .message').find('.unLogin').hide();
        }

        if (cart.products.length == 0)
        {
            $('#js_show_loading').remove();
            $(".cart-list").hide();
        }
        if (cart.B2BProductInfo.length == 0)
        {
            $('#js_show_loading').remove();
            $(".B2B-cart-list").hide();
        }
		
		
        if (cart.products.length == 0 && cart.B2BProductInfo.length == 0) {
            $('.cart-inner').addClass('cart-empty');
        } else {
            // 商城购物车总算 + 事件绑定
            if (cart.products.length != 0) {
                $('#js_show_loading').remove();
                $(".cart-list").show();

                var str = '';
                $.each(data, function (i, e) {
                    str += '\
                  <div class="cart-toolbar cl">\
                    <span class="column t-checkbox form">\
                      <input type="checkbox" class="shopSelect" value="' + i + '" name="checkShop" checked="">\
                      <label for=""><i class="norm-small-icon nsi-vip-mall"></i><a target="_blank" href="/shop/home/' + i + '" >' + e.name + '</a></label>' + ((i == 1) ? '<label class="t-mark">汽配人自营</label>' : '') + '\
                    </span>\
                  </div><div class="n-item-list">';
                    $.each(e.shop, function (j, product) {

                        if (product.productstatus != strproductstatus) {
                            str += '\
                        <div class="item item_disabled ">\
                          <div class="item_form cl">\
                            <div class="cell p-checkbox">\
                              <span status=' + product.productstatus + ' name="checkItem" class="checkbox">失效</span>\
                            </div>'
                        } else {
                            if (product.productauditstatus != strproductauditstatus) {
                                str += '\
                            <div class="item item_disabled">\
                              <div class="item_form cl">\
                                <div class="cell p-checkbox">\
                                  <span status=' + product.productauditstatus + ' name="checkItem" class="checkbox">失效</span>\
                                </div>'
                            } else {
                                str += '\
                            <div class="item item_selected ">\
                              <div class="item_form cl">\
                                <div class="cell p-checkbox">\
                                  <input class="checkbox" type="checkbox" data-cartid="'+ product.cartItemId + '" name="checkItem" checked="" value="' + product.shopId + '" sku="' + product.skuId + '" />\
                                </div>'
                            }
                        }
                        var skuStr = product.Color == "" || product.Color == null ? "" : '[颜色:' + product.Color + ']';
                        skuStr += product.Size == "" || product.Size == null ? "" : '&nbsp;&nbsp;[尺码:' + product.Size + ']';
                        skuStr += product.Version == "" || product.Version == null ? "" : '&nbsp;&nbsp;[规格:' + product.Version + ']';

                        str += '<div class="cell p-goods">\
                  <div class="p-img"><a href="/product/detail/' + product.id + '" target="_blank"><img src="' + product.imgUrl + '" alt="" /></a></div>\
                  <div class="p-name"><a href="/product/detail/' + product.id + '" target="_blank">' + product.name + '<br/>' + skuStr + '</a><br>' + (product.productstatus != 1 || product.productauditstatus == 4 ? "[已停售]" : "") + '</div>'
                        if (product.productcode.length > 0) {
                            str += '<div class="p-code">商品图号：' + product.productcode + '</div>'
                        }
                        str += '</div>\
                <div class="cell p-price"><span class="price">¥'+ product.price.toFixed(2) + '</span></div>\
                <div class="cell p-quantity">\
                  <div class="quantity-form">\
                    <a href="javascript:void(0);" class="decrement" sku="'+ product.skuId + '" >-</a>\
                    <input type="text" class="quantity-text" value="' + product.count + '" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,\'\');}).call(this)" onblur="this.v()" name="count" sku="' + product.skuId + '" />\
                    <a href="javascript:void(0);" class="increment" sku="' + product.skuId + '"  >+</a>\
                  </div>\
                </div>\
                <div class="cell p-remove"><a class="cart-remove" href="javascript:removeFromCart(\''+ product.skuId + '\',0)">删除</a></div>\
              </div>\
            </div>';
                    });
                    str += '</div>';
                });
                $('#product-list').html(str);
                $('#totalSkuPrice').html('¥' + cart.amount.toFixed(2));
                $('#selectedCount').html(cart.totalCount);
                $('#finalPrice').html('¥' + cart.amount.toFixed(2));
            }


            //B2B购车总算 + 事件绑定
            if (cart.B2BProductInfo.length != 0)
            {
                $('#js_show_loading').remove();
                $(".B2B-cart-list").show();
                var str2 = "";
                $.each(B2BData, function (index, Item) {
                    str2 += '\
                  <div class="cart-toolbar cl">\
                    <span class="column t-checkbox form">\
                      <input type="checkbox" class="shopSelect" value="' + index + '" name="checkShop" checked="">\
                      <label for=""><i class="' + ((Item.ComIsVip == 1 && Item.comVipType == 1) ? "norm-small-icon nsi-vip-basic" : ((Item.ComIsVip == 1 && Item.comVipType == 2) ? "norm-small-icon nsi-vip-standard" : "")) + '"></i><a target="_blank" href="' + Item.shopUrl + '">' + Item.name + '</a></label>\
                    </span>\
                  </div><div class="n-item-list">';
                    $.each(Item.shop, function (j, product) {
                        str2 += '\
                    <div class="item item_selected ">\
                        <div class="item_form cl">\
                        <div class="cell p-checkbox">\
                            <input class="checkbox" type="checkbox" data-cartid="' + product.cartItemId + '" name="checkItem" checked="" value="' + product.shopId + '" sku="' + product.skuId + '" proId="' + product.id + '"/>\
                        </div>'


                        var skuStr = "";
                        str2 += '<div class="cell p-goods">\
                  <div class="p-img"><a href="' + currQprUrl + '/Supply/supply-' + product.id + '.htm" target="_blank"><img src="' + product.imgUrlFull + '" alt="" /></a></div>\
                  <div class="p-name"><a href="' + currQprUrl + '/Supply/supply-' + product.id + '.htm" target="_blank">' + product.name + '<br/>' + skuStr + '</a><br>' + (product.status != 1 ? "[已停售]" : "") + '</div>'
                        str2 += '</div>\
                <div class="cell p-price"><span class="price">¥'+ product.price.toFixed(2) + '</span></div>\
                <div class="cell p-quantity">\
                  <div class="quantity-form">\
                    <a href="javascript:void(0);" class="decrement" sku="' + product.skuId + '" proId="' + product.id + '">-</a>\
                    <input type="text" class="quantity-text" value="' + product.count + '" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,\'\');}).call(this)" onblur="this.v()" name="count" proId="' + product.id + '" sku="' + product.skuId + '" />\
                    <a href="javascript:void(0);" class="increment" sku="' + product.skuId + '"  proId="' + product.id + '">+</a>\
                  </div>\
                </div>\
                <div class="cell p-remove"><a class="cart-remove" href="javascript:removeFromCart(\'' + product.skuId + '\',' + product.id + ')">删除</a></div>\
              </div>\
            </div>';
                    });
                    str2 += '</div>';
                });
                $('#B2B-product-list').html(str2);
                $('#totalSkuPriceB2B').html('¥' + cart.B2Bamount.toFixed(2));
                $('#selectedCountB2B').html(cart.B2BtotalCount);
                $('#finalPriceB2B').html('¥' + cart.B2Bamount.toFixed(2));
            }

            bindAddAndReduceBtn();
            bindBatchRemove();
            bindSelectAll();
        }
    
}


///店铺、商品、全选 checkBox
function bindSelectAll() {
    $('input[name="checkAll"]').change(function () {
        var checked = $(this).attr('checked');
        checked = checked ? true : false;
        var sku = $(this).attr("sku");
        if (sku == "1") {
            if (checked) {
                $("#B2B-product-list").find('input[type="checkbox"]').attr('checked', checked);
                $("#B2B-product-list").find('.item').addClass('item_selected');
                $(".B2B-cart-list").find('input[name="checkAll"]').attr('checked', checked);
                var total = getCheckProductPrice(true);
                $('#finalPriceB2B').html('¥' + total);
            }
            else {
                $("#B2B-product-list").find('input[type="checkbox"]').removeAttr('checked');
                $("#B2B-product-list").find('.item').removeClass('item_selected');
                $(".B2B-cart-list").find('input[name="checkAll"]').removeAttr('checked');
                $('#finalPriceB2B').html('¥' + "0.00");
            }
            $('#selectedCountB2B').html(getCheckProductCount(true));
        } else {
            if (checked) {
                $("#product-list").find('input[type="checkbox"]').attr('checked', checked);
                $("#product-list").find('.item').addClass('item_selected');
                $(".cart-list").find('input[name="checkAll"]').attr('checked', checked);
                var total = getCheckProductPrice(false);
                $('#finalPrice').html('¥' + total);
            }
            else {
                $("#product-list").find('input[type="checkbox"]').removeAttr('checked');
                $("#product-list").find('.item').removeClass('item_selected');
                $(".cart-list").find('input[name="checkAll"]').removeAttr('checked');
                $('#finalPrice').html('¥' + "0.00");

            }
            $('#selectedCount').html(getCheckProductCount(false));
        }
    });

    $('input[name="checkShop"]').change(function () {
        var checked = $(this).attr('checked'),
            v = $(this).val();
        checked = checked ? true : false;
        var sku = $(this).parent().parent().parent()[0].id;
        if (sku == "B2B-product-list") {
            if (checked) {
                var total = priceAll(this, false, checked);
                var t = $('#finalPriceB2B').html();
                var s = t.replace('¥', '');
                $('#finalPriceB2B').html('¥' + (+parseFloat(s) + parseFloat(total)).toFixed(2));
            } else {
                var total = priceAll(this, false, checked);
                var t = $('#finalPriceB2B').html();
                var s = t.replace('¥', '');
                $('#finalPriceB2B').html('¥' + (+parseFloat(s) - parseFloat(total)).toFixed(2));
            }

            $('#B2B-product-list input[type="checkbox"]').each(function (i, e) {
                var a = $(e).val();
                if (a == v) {
                    $(e).attr('checked', checked);
                    if(checked){
                        $(e).parents('.item').addClass('item_selected');
                    }else{
                        $(e).parents('.item').removeClass('item_selected');
                    }
                }
            });
            var allShopChecked = true;
            $('#B2B-product-list input[type="checkbox"]').each(function (i, e) {
                if (!$(this).attr('checked')) {
                    allShopChecked = false;
                }
            });
            if (allShopChecked)
                $('.B2B-cart-list input[name="checkAll"]').attr('checked', checked);
            else
                $('.B2B-cart-list input[name="checkAll"]').removeAttr('checked');
            $('#selectedCountB2B').html(getCheckProductCount(true));
        }
        else {
            if (checked) {
                var total = priceAll(this, false, checked);
                var t = $('#finalPrice').html();
                var s = t.replace('¥', '');
                $('#finalPrice').html('¥' + (+parseFloat(s) + parseFloat(total)).toFixed(2));
            } else {
                var total = priceAll(this, false, checked);
                var t = $('#finalPrice').html();
                var s = t.replace('¥', '');
                $('#finalPrice').html('¥' + (+parseFloat(s) - parseFloat(total)).toFixed(2));
            }

            $('#product-list input[type="checkbox"]').each(function (i, e) {
                var a = $(e).val();
                if (a == v) {
                    $(e).attr('checked', checked);
                    if(checked){
                        $(e).parents('.item').addClass('item_selected');
                    }else{
                        $(e).parents('.item').removeClass('item_selected');
                    }
                }
            });

            var allShopChecked = true;
            $('#product-list input[type="checkbox"]').each(function (i, e) {
                if (!$(this).attr('checked')) {
                    allShopChecked = false;
                }
            });
            if (allShopChecked)
                $('.cart-list input[name="checkAll"]').attr('checked', checked);
            else
                $('.cart-list input[name="checkAll"]').removeAttr('checked');
            $('#selectedCount').html(getCheckProductCount(false));
        }
    });

    $('input[name="checkItem"]').change(function () {
        var checked = $(this).attr('checked');
        var sku = $(this).attr('sku');
            v = $(this).val();
        checked = checked ? true : false;
        if (checked) {
            $(this).attr('checked', checked);
            $(this).parents('.item').addClass('item_selected')
        } else {
            $(this).removeAttr('checked');
            $(this).parents('.item').removeClass('item_selected')
        }

        //判断店铺下的所有商品是否全选中

        if (sku == "" || sku == undefined) {
            var allProductChecked = true;
            $(".B2B-cart-list").find('input[name="checkItem"]').each(function (i, e) {
                if ($(e).val() == v) {
                    if (!$(e).attr('checked'))
                        allProductChecked = false;
                }
            });
            if (allProductChecked)
                $(".B2B-cart-list").find('input[name="checkShop"]').each(function () {
                    if ($(this).val() == v){
                        $(this).attr('checked', checked);
                    }
                });
            else {
                $(".B2B-cart-list").find('input[name="checkShop"]').each(function () {
                    if ($(this).val() == v){
                        $(this).removeAttr('checked');
                    }
                });
            }

            //判断所有店铺是否都选中了
            var allShopChecked = true;
            $('#B2B-product-list input[type="checkbox"]').each(function (i, e) {
                if (!$(this).attr('checked')) {
                    allShopChecked = false;
                }
            });
            if (allShopChecked)
                $('.B2B-cart-list input[name="checkAll"]').attr('checked', checked);
            else
                $('.B2B-cart-list input[name="checkAll"]').removeAttr('checked');


            $('#finalPriceB2B').html('¥' + getCheckProductPrice(true));
            $('#selectedCountB2B').html(getCheckProductCount(true));
        }
        else {
            var allProductChecked = true;
            $(".cart-list").find('input[name="checkItem"]').each(function (i, e) {
                if ($(e).val() == v) {
                    if (!$(e).attr('checked'))
                        allProductChecked = false;
                }
            });
            if (allProductChecked)
                $(".cart-list").find('input[name="checkShop"]').each(function () {
                    if ($(this).val() == v)
                        $(this).attr('checked', checked);
                });
            else {
                $(".cart-list").find('input[name="checkShop"]').each(function () {
                    if ($(this).val() == v)
                        $(this).removeAttr('checked');
                });
            }

            //判断所有店铺是否都选中了
            var allShopChecked = true;
            $('#product-list input[type="checkbox"]').each(function (i, e) {
                if (!$(this).attr('checked')) {
                    allShopChecked = false;
                }
            });
            if (allShopChecked)
                $('.cart-list input[name="checkAll"]').attr('checked', checked);
            else
                $('.cart-list input[name="checkAll"]').removeAttr('checked');


            $('#finalPrice').html('¥' + getCheckProductPrice(false));
            $('#selectedCount').html(getCheckProductCount(false));
        }
    });

}


function priceAll(tag, bool, checked) {

    var t = 0;
    if (bool) {
        $(tag).parent().parent().parent().find('.item_form').each(function (i, e) {
            var a = $(this).find('.price').html(),
                b = a.replace('¥', ''),
                c = $(this).find('input[name="count"]').val(),
                d = (+b) * (+c);
            t += d;
        });
        return t.toFixed(2);
    }
    if (typeof tag == 'string') {
        $(tag).each(function (i, e) {
            if ($(this).find(".checkbox").attr("status") == $("#hidSaleStatus").val() && $(this).find(".checkbox").attr("status") != $("#hidAuditStatus").val()) {
                var a = $(this).find('.price').html(),
                b = a.replace('¥', ''),
                c = $(this).find('input[name="count"]').val(),
                d = (+b) * (+c);
                t += d;
            }
        });
    } else {
        if (checked) {
            $(tag).parent().parent().parent().find('input[name="checkItem"]').not("input:checked").each(function (i, e) {
                if ($(tag).val() == $(e).val()) {
                    var a = $(this).parent().parent().find('.price').eq(0).html(),
                        b = a.replace('¥', ''),
                        c = $(this).parent().parent().find('input[name="count"]').val(),
                        d = (+b) * (+c);
                    t += d;
                }
            });
        }
        else {
            $(tag).parent().parent().parent().find('input[name="checkItem"]:checked').each(function (i, e) {
                if ($(tag).val() == $(e).val()) {
                    var a = $(this).parent().parent().find('.price').eq(0).html(),
                        b = a.replace('¥', ''),
                        c = $(this).parent().parent().find('input[name="count"]').val(),
                        d = (+b) * (+c);
                    t += d;
                }
            });
        }
        return t.toFixed(2);
    }
    return t.toFixed(2);
}


/// 购物车商品数量操作
function bindAddAndReduceBtn() {
    var lastTime_1;
    $('a.decrement').click(function (event) {
        lastTime_1 = event.timeStamp;

        var skuId = $(this).attr('sku');
        if (skuId == "") {
            var proId = $(this).attr('proId');
            var textBox = $('input[name="count"][proId="' + proId + '"]');
            var count = parseInt(textBox.val());
            if (count > 1) {
                count -= 1;
                textBox.val(count);
                window.setTimeout(function() {
                    if(lastTime_1 - event.timeStamp == 0){
                        updateCartItem(skuId, count, proId);
                    }
                }, 500);
                if ($(this).parent().parent().parent().find('input[name="checkItem"]').is(":checked")) {
                    $('#finalPriceB2B').html('¥' + getCheckProductPrice(true));
                    $('#selectedCountB2B').html(getCheckProductCount(true));
                }
            }
        }
        else {
            var textBox = $('input[name="count"][sku="' + skuId + '"]');
            var count = parseInt(textBox.val());
            if (count > 1) {
                count -= 1;
                textBox.val(count);

                window.setTimeout(function() {
                    if(lastTime_1 - event.timeStamp == 0){
                        updateCartItem(skuId, count,"");
                    }
                }, 500);
                if ($(this).parent().parent().parent().find('input[name="checkItem"]').is(":checked")) {
                    $('#finalPrice').html('¥' + getCheckProductPrice(false));
                    $('#selectedCount').html(getCheckProductCount(false));
                }
            }
        }

    });
    var lastTime_2;
    $('a.increment').click(function (event) {
        lastTime_2 = event.timeStamp;

        var skuId = $(this).attr('sku');
        if (skuId == "") {
            var proId = $(this).attr('proId');
            var textBox = $('input[name="count"][proId="' + proId + '"]');
            var count = parseInt(textBox.val());

            if (count > 0) {
                count += 1;
                textBox.val(count);

                window.setTimeout(function() {
                    if(lastTime_2 - event.timeStamp == 0){
                        updateCartItem(skuId, count, proId);
                    }
                }, 500);

                if ($(this).parent().parent().parent().find('input[name="checkItem"]').is(":checked")) {
                    $('#finalPriceB2B').html('¥' + getCheckProductPrice(true));
                    $('#selectedCountB2B').html(getCheckProductCount(true));
                }
            } else {
                $.dialog.errorTips('不能小于 1 件');
                textBox.val(1);
            }
        } else {
            var textBox = $('input[name="count"][sku="' + skuId + '"]');
            var count = parseInt(textBox.val());

            if (count > 0) {
                count += 1;
                textBox.val(count);

                window.setTimeout(function() {
                    if(lastTime_2 - event.timeStamp == 0){
                        updateCartItem(skuId, count,"");
                    }
                }, 500);

                if ($(this).parent().parent().parent().find('input[name="checkItem"]').is(":checked")) {
                    $('#finalPrice').html('¥' + getCheckProductPrice(false));
                    $('#selectedCount').html(getCheckProductCount(false));
                }
            } else {
                $.dialog.errorTips('不能小于 1 件');
                textBox.val(1);
            }
        }
    });

    var lastTime_3;
    $('input[name="count"]').blur(function (event) {
        lastTime_3 = event.timeStamp;

        var skuId = $(this).attr('sku');
        if (skuId == "") {
            var proId = $(this).attr('proId');
            var count = parseInt($(this).val());
            if (count > 0) {

                window.setTimeout(function() {
                    if(lastTime_3 - event.timeStamp == 0){
                        updateCartItem(skuId, count, proId);
                    }
                }, 500);

                if ($(this).parent().parent().parent().find('input[name="checkItem"]').is(":checked")) {
                    $('#finalPriceB2B').html('¥' + getCheckProductPrice(true));
                    $('#selectedCountB2B').html(getCheckProductCount(true));
                }
            }
            else {
                $(this).val('1');

                window.setTimeout(function() {
                    if(lastTime_3 - event.timeStamp == 0){
                        updateCartItem(skuId, 1, proId);
                    }
                }, 500);

                $('#finalPriceB2B').html('¥' + getCheckProductPrice(true));
                $('#selectedCountB2B').html(getCheckProductCount(true));
            }
        }
        else {
            var count = parseInt($(this).val());
            if (count > 0) {

                window.setTimeout(function() {
                    if(lastTime_3 - event.timeStamp == 0){
                        updateCartItem(skuId, count,"");
                    }
                }, 500);

                if ($(this).parent().parent().parent().find('input[name="checkItem"]').is(":checked")) {
                    $('#finalPrice').html('¥' + getCheckProductPrice(false));
                    $('#selectedCount').html(getCheckProductCount(false));
                }
            }
            else {
                $(this).val('1');

                window.setTimeout(function() {
                    if(lastTime_3 - event.timeStamp == 0){
                        updateCartItem(skuId, 1,"");
                    }
                }, 500);

                $('#finalPrice').html('¥' + getCheckProductPrice(false));
                $('#selectedCount').html(getCheckProductCount(false));
            }
        }
    });
}
/// 购物车商品数量更新
function updateCartItem(skuId, count,proId) {
    //var loading = showLoading();

    if (skuId == "") {
        $.post('/cart/UpdateB2BCartItem', { productId: proId, count: count }, function (result) {
            //loading.close();
            if (result.success) {
                var countCookie = $.cookie('qpr_mall_cart_count');
                $('#shopping-amount-self').html(countCookie)
            }
            else {
                $.dialog.errorTips(result.msg);
            }
        });
    }
    else {
        $.post('/cart/UpdateCartItem', { skuId: skuId, count: count }, function (result) {
            //loading.close();
            if (result.success) {
                var countCookie = $.cookie('qpr_mall_cart_count');
                $('#shopping-amount-self').html(countCookie)
            }
            else {
                $.dialog.errorTips(result.msg);
            }
        });
    }
}


///购物车商品删除
function removeFromCart(skuId, proId) {
    $.dialog.confirm('确定要删除该商品吗?', function () {
        var loading = showLoading();

        if (skuId == "") {
            $.post('/cart/UpdateB2BCartItem', { productId: proId, count: 0 }, function (result) {
                loading.close();
                if (result.success) {
                    loadCartInfo();
                    var countCookie = $.cookie('qpr_mall_cart_count');
                    $('#shopping-amount-self').html(countCookie);
                }
                else {
                    $.dialog.errorTips(result.msg);
                }
            });
        }
        else {
            $.post('/cart/RemoveFromCart', { skuId: skuId }, function (result) {
                loading.close();
                if (result.success) {
                    loadCartInfo();
                    var countCookie = $.cookie('qpr_mall_cart_count');
                    $('#shopping-amount-self').html(countCookie);
                }
                else {
                    $.dialog.errorTips(result.msg);
                }
            });
        }
    });
}
///购物车批量删除
function bindBatchRemove() {
    $('#remove-batch').click(function () {
        var skuIds = [];
        $.each($('#product-list input[type="checkbox"][name="checkItem"]:checked'), function (i, checkBox) {
            skuIds.push($(checkBox).attr('sku'));
        });
        if (skuIds.length < 1) {
            $.dialog.errorTips("请选择要删除的商品！");
            return;
        }
        $.dialog.confirm('确定要删除选中的商品吗?', function () {
            var loading = showLoading();
            $.post('/cart/BatchRemoveFromCart', { skuIds: skuIds.toString() }, function (result) {
                loading.close();
                if (result.success) {
                    loadCartInfo();
                    var countCookie = $.cookie('qpr_mall_cart_count');
                    $('#shopping-amount-self').html(countCookie)
                }
                else {
                    $.dialog.errorTips(result.msg);
                }
            });
        });
    });

    $('#B2B-remove-batch').click(function () {
        var proids = [];
        $.each($('#B2B-product-list input[type="checkbox"][name="checkItem"]:checked'), function (i, checkBox) {
            proids.push($(checkBox).attr('proid'));
        });
        if (proids.length < 1) {
            $.dialog.errorTips("请选择要删除的商品！");
            return;
        }
        $.dialog.confirm('确定要删除选中的商品吗?', function () {
            var loading = showLoading();
            $.post('/cart/BatchRemoveFromB2BCart', { productIds: proids.toString() }, function (result) {
                loading.close();
                if (result.success)
                    loadCartInfo();
                else
                    $.dialog.errorTips(result.msg);
            });
        });
    });
}


///购物车汇总价格更新
function getCheckProductPrice(isB2B) {
    if (!isB2B) {
        var t = 0;
        $.each($("#product-list").find('input[name="checkItem"]:checked'), function () {
            var a = $(this).parent().parent().find('.price').html(),
                b = a.replace('¥', ''),
                c = $(this).parent().parent().find('input[name="count"]').val(),
                d = (+b) * (+c);
            t += d;
        })
        return t.toFixed(2);
    }
    else {
        var t = 0;
        $.each($("#B2B-product-list").find('input[name="checkItem"]:checked'), function () {
            var a = $(this).parent().parent().find('.price').html(),
                b = a.replace('¥', ''),
                c = $(this).parent().parent().find('input[name="count"]').val(),
                d = (+b) * (+c);
            t += d;
        })
        return t.toFixed(2);
    }
}
///购物车汇总数量更新
function getCheckProductCount(isB2B) {
    if (!isB2B) {
        var t = 0;
        $.each($("#product-list").find('input[name="checkItem"]:checked'), function () {
            var c = $(this).parent().parent().find('input[name="count"]').val();
            d = parseInt(c);
            t += d;
        })
        return t;
    }
    else {
        var t = 0;
        $.each($("#B2B-product-list").find('input[name="checkItem"]:checked'), function () {
            var c = $(this).parent().parent().find('input[name="count"]').val();
            d = parseInt(c);
            t += d;
        })
        return t;
    }

}


///去结算按钮
function bindToSettlement(isB2B) {
    var memberId = $.cookie('qpr_mall_user');
    var arr = [], str = '';

    if (!isB2B) {
        $("#product-list").find('input[name="checkItem"]').each(function (i, e) {
            if ($(e).attr('checked')) {
                arr.push($(e).attr('data-cartid'));
            }
        });

        str = (arr && arr.join(','));

        if (memberId) {
            if (str != "")
                location.href = '/order/submit?' + 'cartItemIds=' + str + '&FromCart=1';
            else
                $.dialog.errorTips("没有可结算的商品！");
        }
        else {
            $.fn.login({}, function () {
                location.href = '/order/submit';
            }, '', '', '/Login/Login');
        }
    }
    else {
        $("#B2B-product-list").find('input[name="checkItem"]').each(function (i, e) {
            if ($(e).attr('checked')) {
                arr.push($(e).attr('proId'));
            }
        });

        str = (arr && arr.join(','));

        if (memberId) {
            if (str != "")
                location.href = '/order/submit?' + 'productIds=' + str + '&FromCart=1';
            else
                $.dialog.errorTips("没有可结算的商品！");
        }
        else {
            $.fn.login({}, function () {
                location.href = '/order/submit';
            }, '', '', '/Login/Login');
        }
    }




}