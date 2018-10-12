
$(document).ready(function () {
    loadCartInfo();
    var total = getCheckProductPrice(false);
    $('#finalPrice').html('¥' + total);
    $('#selectedCount').html(getCheckProductCount(false));

    $('#toSettlement').on("click",null,function () {
        bindToSettlement(false);
    }
    )
})

///购物车数据加载
function loadCartInfo() {
    //bindAddAndReduceBtn();
    bindBatchRemove();
    bindSelectAll();
}


///店铺、商品、全选 checkBox
function bindSelectAll() {
    var ILength = $('.item').length;

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

                /*$("#product-list").find('input[type="checkbox"]').removeAttr('checked');
                $("#product-list").find('.item').removeClass('item_selected');*/
                $("#content1").find('input[name="checkItem"]').removeAttr('checked');
                $("#content1").find('input[name="checkItem"]').prop('checked',false);

                $("#content1").find('.item').removeClass('item_selected');
                //$("#plist").find('input[type="checkbox"]').removeAttr('checked');
                //$("#plist").find('.item').removeClass('item_selected');
                $(".cart-list").find('input[name="checkAll"]').removeAttr('checked');
                $(".cart-list").find('input[name="checkAll"]').prop('checked',false);
                $("input:checkbox").removeAttr("checked");
                var total = getCheckProductPrice(false);
                $('#finalPrice').html('¥' + total);
            }
            else {
                /*$("#product-list").find('input[type="checkbox"]').attr('checked', 'checked');
                $("#product-list").find('.item').addClass('item_selected');*/
                $("#content1").find('input[name="checkItem"]').prop('checked', true);
                $("#content1").find('input[name="checkItem"]').attr('checked', 'checked');

                $("#content1").find('.item').addClass('item_selected');
                //$("#plist").find('input[type="checkbox"]').attr('checked', 'checked');
                //$("#plist").find('.item').addClass('item_selected');
                $(".cart-list").find('input[name="checkAll"]').prop('checked', true);
                $(".cart-list").find('input[name="checkAll"]').attr('checked', 'checked');
                $("input:checkbox").prop('checked',true);
                var total = getCheckProductPrice(false);
                $('#finalPrice').html('¥' + total);

            }
            $('#selectedCount').html(getCheckProductCount(false));
        }
    });



    /*$('input[name="checkItem"]').change(function () {
        var checked = $(this).attr('checked');
        var sku = $(this).attr('sku');
        v = $(this).val();
        checked = checked ? true : false;
        if (checked) {
            $(this).attr('checked', false);
            $(this).parents('.item').removeClass('item_selected');

            $(".cart-list").find('input[name="checkAll"]').removeAttr('checked');


        } else {
            $(this).attr('checked',true);
            $(this).parents('.item').addClass('item_selected');

            var ItemLength = $('.item_selected').length;
            if(ItemLength == ILength){
                $("#pdlist").find('input[type="checkbox"][name="checkAll"]').attr('checked','');
            }
        }

        $('#finalPrice').html('¥' + getCheckProductPrice(false));
        $('#selectedCount').html(getCheckProductCount(false));

    });*/

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

var decrement = function (skuId) {

    if (skuId == "") {
        var proId = $(this).attr('proId');
        var textBox = $('input[name="count"][proId="' + proId + '"]');
        var count = parseInt(textBox.val());
        if (count > 1) {
            count -= 1;
            textBox.val(count);
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
            $('#finalPrice').html('¥' + getCheckProductPrice(false));
            $('#selectedCount').html(getCheckProductCount(false));

        }
    }

}

var increment = function (skuId) {

    if (skuId == "") {
        var proId = $(this).attr('proId');
        var textBox = $('input[name="count"][proId="' + proId + '"]');
        var count = parseInt(textBox.val());

        if (count > 0) {
            count += 1;
            textBox.val(count);

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
            $('#finalPrice').html('¥' + getCheckProductPrice(false));
            $('#selectedCount').html(getCheckProductCount(false));

        } else {
            $.dialog.errorTips('不能小于 1 件');
            textBox.val(1);
        }
    }
}

/// 购物车商品数量操作
function bindAddAndReduceBtn() {

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
function removeFromCart(goodsId) {
    $.dialog.confirm('确定要删除该商品吗?', function () {
        var loading = showLoading();
        var url = '/shopCar/del/' + goodsId;
        $.post(url, function (result) {
            loading.close();
            if (result.success) {
                loadCartInfo();
                /*var countCookie = $.cookie('qpr_mall_cart_count');
                $('#shopping-amount-self').html(countCookie);*/
            }
            else {
                $.dialog.errorTips(result.msg);
            }
        });
    });
}
///购物车批量删除
function bindBatchRemove() {
    $('#remove-batch').click(function () {
        var goodsIds = [];
        $.each($('#product-list input[type="checkbox"][name="checkItem"]:checked'), function (i, checkBox) {
            goodsIds.push($(checkBox).attr('sku'));
        });
        if (goodsIds.length < 1) {
            $.dialog.errorTips("请选择要删除的商品！");
            return;
        }
        $.dialog.confirm('确定要删除选中的商品吗?', function () {
            var loading = showLoading();

            $.post('/shopCar/delSelect', { goodsIds: goodsIds.toString() }, function (result) {
                loading.close();
                if (result.success) {
                    loadCartInfo();
                    /*var countCookie = $.cookie('qpr_mall_cart_count');
                    $('#shopping-amount-self').html(countCookie)*/
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
    // var memberId = $.cookie('token');

    if (!isB2B) {
        var ids = new Array();
        var counts = new Array();
        var num = 0;
        $("#product-list").find('input[name="checkItem"]').each(function (i, e) {

            if ($(e).attr('checked')) {
                console.log($(e).attr('sku'));
                ids[num] = $(e).attr('sku');
               counts[num] = document.getElementById('count'+i).value;
                num++;
            }

        });

        console.log(ids);
        console.log(counts);
        window.location.href = "/shopCar/detailData?ids="+ids+"&counts="+counts;


    }
}