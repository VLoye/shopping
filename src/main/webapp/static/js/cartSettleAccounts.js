
$(function () {
    loadCartInfo();

    $('#toSettlement').click(function () {
        bindToSettlement(false);
    });

});

///购物车数据加载
function loadCartInfo() {
        bindAddAndReduceBtn();
        bindBatchRemove();
        bindSelectAll();
        var total = getCheckProductPrice(false);
        $('#finalPrice').html('¥' + total);
        $('#selectedCount').html(getCheckProductCount(false));
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

                $("#product-list").find('input[type="checkbox"]').removeAttr('checked');
                $("#product-list").find('.item').removeClass('item_selected');
                $(".cart-list").find('input[name="checkAll"]').removeAttr('checked');
                $('#finalPrice').html('¥' + "0.00");
            }
            else {
                $("#product-list").find('input[type="checkbox"]').attr('checked', '');
                $("#product-list").find('.item').addClass('item_selected');
                $(".cart-list").find('input[name="checkAll"]').attr('checked', '');
                var total = getCheckProductPrice(false);
                $('#finalPrice').html('¥' + total);

            }
            $('#selectedCount').html(getCheckProductCount(false));
        }
    });
	
	
	
    $('input[name="checkItem"]').change(function () {
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
            $(".cart-list").find('input[type="checkbox"][name="checkAll"]').attr('checked','');
            }
        }
        
		$('#finalPrice').html('¥' + getCheckProductPrice(false));
       	$('#selectedCount').html(getCheckProductCount(false));
       	
       	
        //判断店铺下的所有商品是否全选中

        /*if (sku == "" || sku == undefined) {
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


             
        }*/
        
       
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
    var memberId = $.cookie('token');
    var datas = [], str = '';
	
    if (!isB2B) {
    	var good = {};

    	var num = 0;
        $("#product-list").find('input[name="checkItem"]').each(function (i, e) {
        	
            if ($(e).attr('checked')) {
            	var arr = {};
            	arr[goodsId] = $(e).attr('sku');
                arr[count] = document.getElementById('count'+i);
                good[num++] = arr;
            }
        });
		

		
        if (memberId) {
            if (str != "")
            {
            	$.post('/shopCar/detail', good, function (result) {
            		
	                loading.close();
	                if (result.success){
	                	location.href = "/shopCar/detailData";
	                }
	                    
	                else
	                    $.dialog.errorTips(result.msg);
                    
            	});
            }
            else
                $.dialog.errorTips("没有可结算的商品！");
        }
        else {
        	
            location.href = "/login";
        }
    }
}