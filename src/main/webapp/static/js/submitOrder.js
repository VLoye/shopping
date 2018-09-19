$(function () {
    bindSubmit();
    initAddress();
    bindAddressRadioClick();
    InvoiceInit();
    InvoiceOperationInit();
    bindAddAndReduceBtn();
})

function bindSubmit() {
	$('#submit').on('click',function (){
		var addressid = $(':radio[name="address"]:checked').val();
		if(!addressid)
		{
			$.dialog.tips('请选择或新建收货地址');
		}
		else{
			var goodsids = {};
			var goodscounts = {};
			$.each($('input[type="radio"][name="ngoodsid"]'), function() {
				goodsids.push($(this).val());
			});
			$.each($('input[type="radio"][name="ngoodscount"]'), function() {
				gooodsconts.push($(this).val());
			});
			$.ajax({
	            type: "post",
	            url: "/shopCar/submit",
	            async: false,
	            data: {
	            	addressid:addressid,
	                goodsid:JSON.stringify(goodsids),
	                goodscount: JSON.stringify(goodscounts)
	            },
	            success: function (result) {
	                if (result.success) {
	                    window.location.href = "SubmitSuccess.html";
	                }
	                else {
	                    loading.close();
	                    $.dialog.errorTips(result.msg);
	                }
	                isFirstSubmit = true;
	                $(this).removeAttr('disabled');
	            }
	        });
			
		}
		
		
	});
}

/*function bindSubmit() {
    var isFirstSubmit = true;
    $('#submit').on('click', function () {
        var remarkDataString = [];
        var remarkData$ = $(".OrderRemark");
        $.each(remarkData$, function (index, Item) {
            var remark = {};
            remark.shopId = $(Item).attr("rema");
            remark.shopRemark = $(Item).val();

            remarkDataString.push(remark);
        });


        var fn = function () {
            var arr = [];
            $('.shopb').each(function (i, e) {
                $(e).children().each(function (l, k) {
                    if ($(k).attr('selected')) {
                        var b = $(k).val();
                        arr.push(b);
                    }
                });
            });
            return arr.join(',');
        };

        if ($("#IsB2BHide").val() == 0) {
            var skuIds = QueryString('skuIds');
            var counts = QueryString('counts');
            
            var action = "SubmitOrder";
            var couponIds = fn();

            var cartItemIds = QueryString('cartItemIds');
            var recieveAddressId = $('#shippingAddressId').val();

            var integral = parseInt($("#integral").val());
            integral = isNaN(integral) ? 0 : integral;

            recieveAddressId = parseInt(recieveAddressId);
            recieveAddressId = isNaN(recieveAddressId) ? null : recieveAddressId;

            $('input:radio[name="sex"]').is(":checked")

            var invoiceType = $("input[name='isInvoce']:checked").val();
            var invoiceTitle = $("#invoiceTitle").html();
            if (invoiceTitle == null || invoiceTitle == '') {
                invoiceTitle = "";
                //$.dialog.tips( '请选择发票抬头' );
                //return false;
            }
            var invoiceContext = $("#invoiceContext").html();
            if (invoiceContext == null || invoiceContext == '') {
                invoiceContext = "";
                //$.dialog.tips( '请选择发票内容' );
                //return false;
            }
            //if ($("#isInvoice").attr('checked')) {
            //    if (!$("input[name='invoiceType']").is(":checked")) {
            //        $.dialog.tips('请选择发票类型');
            //        return false;
            //    }
            //    if ( invoiceTitle == null || invoiceTitle == '' )
            //    {
            //        $.dialog.tips('请输入发票抬头');
            //        return false;
            //    }
            //}

            if (!recieveAddressId)
                $.dialog.tips('请选择或新建收货地址');
            else {
                if (skuIds) {
                    action = "SubmitOrderByProductId";
                }
                var loading = showLoading();

                if(isFirstSubmit){
                    $(this).attr({'disabled':'disabeld'});
                    isFirstSubmit = false;
                    $.ajax({
                        type: "post",
                        url: "/order/" + action,
                        async: false,
                        data: {
                            integral: integral,
                            couponIds: couponIds,
                            skuIds: skuIds,
                            counts: counts,
                            cartItemIds: cartItemIds,
                            recieveAddressId: recieveAddressId,
                            invoiceType: invoiceType,
                            invoiceTitle: invoiceTitle,
                            invoiceContext: invoiceContext,
                            orderRemark: JSON.stringify(remarkDataString)
                        },
                        success: function (result) {
                            if (result.success) {
                                window.location.href = result.msg;
                            }
                            else {
                                loading.close();
                                $.dialog.errorTips(result.msg);
                            }
                            isFirstSubmit = true;
                            $(this).removeAttr('disabled');
                        }
                    });
                }
            }
        } else {
            var productIds = QueryString('productIds');
            var productCount = QueryString('productCount') == "" ? "0" : QueryString('productCount');
            var recieveAddressId = $('#shippingAddressId').val();
            recieveAddressId = parseInt(recieveAddressId);
            recieveAddressId = isNaN(recieveAddressId) ? null : recieveAddressId;

            $('input:radio[name="sex"]').is(":checked")

            var invoiceType = $("input[name='isInvoce']:checked").val();
            var invoiceTitle = $("#invoiceTitle").html();
            if (invoiceTitle == null || invoiceTitle == '') {
                invoiceTitle = "";
            }
            var invoiceContext = $("#invoiceContext").html();
            if (invoiceContext == null || invoiceContext == '') {
                invoiceContext = "";
            }

            if (!recieveAddressId)
                $.dialog.tips('请选择或新建收货地址');
            else {
                var action = "SubmitB2BOrder";
                //if (skuIds) {
                //    action = "SubmitOrderByProductId";
                //}
                var loading = showLoading();

                if(isFirstSubmit){
                    $(this).attr({'disabled':'disabeld'});
                    isFirstSubmit = false;
                    $.ajax({
                        type: "post",
                        url: "/order/" + action,
                        async: false,
                        data: {
                            isByProductId: $("#IsB2BHide").val(),
                            productCount : productCount,
                            productIds: productIds,
                            recieveAddressId: recieveAddressId,
                            orderRemark: JSON.stringify(remarkDataString)
                        },
                        success: function (result) {
                            if (result.success) {
                                window.location.href = result.msg;
                            }
                            else {
                                loading.close();
                                $.dialog.errorTips(result.msg);
                            }
                            isFirstSubmit = true;
                            $(this).removeAttr('disabled');
                        }
                    });
                }
            }
        }
    });
}*/



/// 购物车商品数量操作
function bindAddAndReduceBtn() {
    $('a.decrement').click(function () {
        var skuId = $(this).attr('sku');
        if (skuId == "") {
            var proId = $(this).attr('proId');
            var shopId = $(this).attr('shopid');
            var textBox = $('input[name="count"][proId="' + proId + '"]');
            var count = parseInt(textBox.val());
            if (count > 1) {
                count -= 1;
                textBox.val(count);
                updateCartItem(skuId, count, proId);

                var currPriceSingle = $(this).attr('price');

                var $temp = $("#orderdata_" + shopId).find("div.shopd");
                $temp.html('￥' + currPriceSingle * count)

                var allSourcePrice = $("#payPriceId").html().replace('￥', '');
                $("#payPriceId").html('￥' + ((+allSourcePrice) - (+currPriceSingle)));
                $("#warePriceId").html('￥' + ((+allSourcePrice) - (+currPriceSingle)));

                var counttemp = parseInt($("#span-skuNum").html());
                $("#span-skuNum").html(counttemp - 1);
            }
        }
        else {
            var textBox = $('input[name="count"][sku="' + skuId + '"]');
            var count = parseInt(textBox.val());
            if (count > 1) {
                count -= 1;
                textBox.val(count);
                updateCartItem(skuId, count, "");
                

                var counttemp = parseInt($("#span-skuNum").html());
                $("#span-skuNum").html(counttemp - 1);
            }
            window.location.reload();
        }
    });

    $('a.increment').click(function () {
        var skuId = $(this).attr('sku');
        if (skuId == "") {
            var proId = $(this).attr('proId');
            var shopId = $(this).attr('shopid');
            var textBox = $('input[name="count"][proId="' + proId + '"]');
            var count = parseInt(textBox.val());

            if (count > 0) {
                count += 1;
                textBox.val(count);
                updateCartItem(skuId, count, proId);


                var currPriceSingle = $(this).attr('price');

                var $temp = $("#orderdata_" + shopId).find("div.shopd");
                $temp.html('￥' + currPriceSingle * count)

                var allSourcePrice = $("#payPriceId").html().replace('￥', '');
                $("#payPriceId").html('￥' + ((+allSourcePrice) + (+currPriceSingle)));
                $("#warePriceId").html('￥' + ((+allSourcePrice) + (+currPriceSingle)));

                var counttemp = parseInt($("#span-skuNum").html());
                $("#span-skuNum").html(counttemp + 1);
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
                updateCartItem(skuId, count, "");
                
                var counttemp = parseInt($("#span-skuNum").html());
                $("#span-skuNum").html(counttemp + 1);
            } else {
                $.dialog.errorTips('不能小于 1 件');
                textBox.val(1);
            }
            window.location.reload();
        }
    });

    $('input[name="count"]').blur(function () {
        var currPriceSingle = $(this).attr('price');
        var shopId = $(this).attr('shopid');
        var skuId = $(this).attr('sku');
        if (skuId == "") {
            var proId = $(this).attr('proId');
            var textBox = $('input[name="count"][proId="' + proId + '"]');
            var count = parseInt($(this).val());
            if (count > 0) {
                updateCartItem(skuId, count, proId);

                var $temp = $("#orderdata_" + shopId).find("div.shopd");
                $temp.html('￥' + (+currPriceSingle) * count)

                $("#payPriceId").html('￥' + ((+currPriceSingle) * count));
                $("#warePriceId").html('￥' + ((+currPriceSingle) * count));

                var counttemp = parseInt($("#span-skuNum").html());
                $("#span-skuNum").html(count);
            }
            else {
                $.dialog.errorTips('不能小于 1 件');
                textBox.val(1);
                count = 1;
                updateCartItem(skuId, count, proId);

                var $temp = $("#orderdata_" + shopId).find("div.shopd");
                $temp.html('￥' + (+currPriceSingle) * count)

                $("#payPriceId").html('￥' + ((+currPriceSingle) * count));
                $("#warePriceId").html('￥' + ((+currPriceSingle) * count));

                var counttemp = parseInt($("#span-skuNum").html());
                $("#span-skuNum").html(count);
            }
        }
        else {
            var count = parseInt($(this).val());
            var textBox = $('input[name="count"][sku="' + skuId + '"]');
            if (count > 0)
            {
                updateCartItem(skuId, count, "");

                var $temp = $("#orderdata_" + shopId).find("div.shopd");
                $temp.html('￥' + (+currPriceSingle) * count)

                $("#payPriceId").html('￥' + ((+currPriceSingle) * count));
                $("#warePriceId").html('￥' + ((+currPriceSingle) * count));

                var counttemp = parseInt($("#span-skuNum").html());
                $("#span-skuNum").html(count);
            }
            else {
                $.dialog.errorTips('不能小于 1 件');
                textBox.val(1);
                count = 1;
                updateCartItem(skuId, count, "");

                var $temp = $("#orderdata_" + shopId).find("div.shopd");
                $temp.html('￥' + (+currPriceSingle) * count)

                $("#payPriceId").html('￥' + ((+currPriceSingle) * count));
                $("#warePriceId").html('￥' + ((+currPriceSingle) * count));

                var counttemp = parseInt($("#span-skuNum").html());
                $("#span-skuNum").html(count);
            }
            window.location.reload();
        }
    });
}
/// 购物车商品数量更新
function updateCartItem(skuId, count, proId) {
    //var loading = showLoading();

    if (skuId == "") {
        $.ajax({
            type: "post",
            url: "/cart/UpdateB2BCartItem",
            data: { productId: proId, count: count },
            async: false,
            success: function (result) {
                //loading.close();
                if (result.success) {
                    var countCookie = $.cookie('qpr_mall_cart_count');
                    $('#shopping-amount-self').html(countCookie)
                }
                else {
                    $.dialog.errorTips(result.msg);
                }
            }
        });
    }
    else {
        $.ajax({
            type: "post",
            url: "/cart/UpdateCartItem",
            data: { skuId: skuId, count: count },
            async: false,
            success: function (result) {
                //loading.close();
                if (result.success) {
                    var countCookie = $.cookie('qpr_mall_cart_count');
                    $('#shopping-amount-self').html(countCookie)
                }
                else {
                    $.dialog.errorTips(result.msg);
                }
            }
        });
    }
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


///#region   收货地址管理
function initAddress() {
    if (!$('#selectedAddress').html()) {
        $('#editReciever').click();
    }
}

var shippingAddress = [];

function bindRecieverEdit() {
    $('#editReciever').click(function () {
        $.post('/order/GetUserShippingAddresses', {}, function (addresses) {
            var html = '';
            var currentSelectedId = parseInt($('#shippingAddressId').val());
            $.each(addresses, function (i, address) {
                shippingAddress[address.id] = address;
                html += '<div class="item" name="li-' + address.id + '">\
                        <label>\
                            <input type="radio" class="hookbox" name="address" '+ (address.id == currentSelectedId ? 'checked="checked"' : '') + ' value="' + address.id + '" />\
                            <b>' + address.shipTo + '</b>&nbsp;<s>' + address.fullRegionName + '</s>&nbsp;<i>' + address.address + ' </i>&nbsp;<var>' + address.phone + '</var>&nbsp\
                        </label>\
                        <span class="item-action">\
                            <a href="javascript:;" onclick="showEditArea(\'' + address.id + '\')">编辑</a> &nbsp;\
                            <a href="javascript:;" onclick="deleteAddress(\'' + address.id + '\')">删除</a>&nbsp;\
                        </span>\
                    </div>';
            });
                          //  <a href="javascript:;" onclick="showEditArea(\'' + address.id + '\')">编辑</a> &nbsp;\
            $('#consignee-list').html(html).show();
            $('#step-1').addClass('step-current');
            $('#addressListArea').show();

            $('input[name="address"]').change(function () {
                var shippingAddressId = $(this).val();
                $('#shippingAddressId').val(shippingAddressId);
            });
        });
    });
}

function bindAddressRadioClick() {
    $('#consignee-list').on('click', 'input[type="radio"]', function () {
        $('#addressEditArea').hide();
    });
}
function deleteAddress(id) {
    $.dialog.confirm('您确定要删除该收货地址吗？', function () {
        var loading = showLoading();
        $.post('/shopCar/del', { id: id }, function (result) {
            loading.close();
            if (result.success) {
                var current = $('div[name="li-' + id + '"]');
                if ($('input[type="radio"][name="address"]:checked').val() == id) {
                    $('input[type="radio"][name="address"]').first().click();
                    $('#selectedAddress').html('');
                    $('#shippingAddressId').val('');
                }
                current.remove();
            }
            else
                $.dialog.errorTips(result.msg);
        });
    });
}
function saveAddress(adid,linkman, tel, detailedaddress, province, city, area , userid , callBack) {
    id = isNaN(parseInt(adid)) ? '' : parseInt(adid);

    var url = '/order/saveorupdateaddress';

    var data = {};
    if (id)
        data['addressid'] = id;
    data['linkman'] = linkman;
    data['detailedaddress'] = detailedaddress;
    data['tel'] = tel;
    data['province']=province;
	data['city']=city;
	data['area']=area;
	data['userid']=userid;

    var loading = showLoading();
    $.post(url, data, function (result) {
        loading.close();
        if (result.success)
            callBack(result);
        else
            $.dialog.errorTips('保存失败!' + result.msg);
    });
}
function showEditArea(id) { 
	if(id != 0){
	    var detailedaddress = document.getElementById("detailedaddress-"+id).innerText;
	    var shipTo = document.getElementById("linkman-"+id).innerText;
	    var fullregion = document.getElementById("region-"+id).innerText;
	    var phone = document.getElementById("tel-"+id).innerText;
	    var adid = id;
	    if (fullregion) {
	        var arr = fullregion.split(' ');
	    }
	
	    var fullRegionName = fullregion == null ? '<i></i><em></em><s></s>' : '<i id = "editprovince">' + arr[0] + ' </i><em id = "editcity">' + arr[1] + ' </em><s id = "editarea">' + arr[2] + '</s>';
	
	    $('input[name="shipTo"]').val(shipTo);
	    $('input[type="text"][name="address"]').val(detailedaddress);
	    $('input[name="phone"]').val(phone);
	    $('span[name="regionFullName"]').html('');
	    $('span[name="regionFullName"]').html(fullRegionName);
	    $('#adid').val(adid);
	
	    $('#addressEditArea').show();
	    $('#s_province').val(arr[0]);
	    $('#s_province').trigger('change');
	    $('#s_city').val(arr[1]);
	    $('#s_city').trigger('change');
	    
	    if (arr.length == 3) {
	        $('#s_county').val(arr[2]);
	        $('#s_county').trigger('change');
	    }
    }
	else{
    	$('#s_province').val("省份");
        $('#s_city').val("地级市");
        $('#s_county').val("市、县级市");
        $('input[name="shipTo"]').val('');
	    $('input[type="text"][name="address"]').val('');
	    $('input[name="phone"]').val('');
	    $('span[name="regionFullName"]').html('');
    	$('#addressEditArea').show();
    }
}
///#endregion


; (function ($, data) {
    var getOption = function (elem, bool) {
        var s, t;
        if (bool) {
            elem.children().each(function (i, e) {
                s = e.selected;
                if (s == true && i>0) {
                    t = $(e).html();
                    return;
                }
            });
        } else {
            elem.children().each(function (i, e) {
                s = e.selected;
                if (s == true) {
                    t = $(e).val();
                    return;
                }
            });
        }
        return t;
    };
    setProvince($('#consignee_province'), $('#consignee_city'), $('#consignee_county'));
  
    $('#saveConsigneeTitleDiv').bind('click', function () {
        var a = getOption($('#s_province'), 0),
            b = getOption($('#s_city'), 0),
            c = getOption($('#s_county'), 0),
            value = a + ',' + b + ',' + c,
            str = province + ' ' + city + ' ' + county,
            indexId = $('input[type="radio"][name="address"]:checked').val(); 
            
            
            var adid = "0";
            adid= $('#adid').val();
            
            if ($("#consignee_radio_new").attr("checked") == "checked"||tttt!="0") {
            
                var linkman = $('input[name="shipTo"]').val();
                var regTel = /([\d]{11}$)|(^0[\d]{2,3}-?[\d]{7,8}$)/;
                var tel = $('input[name="phone"]').val();
                var detailedaddress = $('input[type="text"][name="address"]').val();
                var region = $('#s_province').val() +" "+ $('#s_city').val() +" "+ $('#s_county').val();
                var province = $('#s_province').val();
                var city = $('#s_city').val();
                var area = $('#s_county').val(); 
                var userid = document.getElementById("userid");
                 
                if (!shipTo) {
                    $.dialog.tips('请填写收货人');
                    return false;
                }
                else if ($.trim(shipTo).length == 0) {
                    $.dialog.tips('请填写收货人');
                    return false;
                }
                else if (!phone) {
                    $.dialog.tips('请填写电话');
                    return false;
                }
                else if (!regTel.test(phone)) {
                    $.dialog.tips('请填写正确的电话');
                    return false;
                }
                else{ //RegionBind.js
                	var isprovince = ($('#s_province').val()=="省份")?false:true;
                	var iscity = ($('#s_province').val()=="地级市")?false:true;
                	var iscounty = ($('#s_province').val()=="市、县级市")?false:true;
                    if (!isprovince || !iscity || !county) {
                        $.dialog.tips('请填选择所在地区');
                        return false;
                    }
                    else if (!address) {
                        $.dialog.tips('请填写详细地址');
                        return false;
                    }
                    else if ($.trim(address).length == 0) {
                        $.dialog.tips('请填写详细地址');
                        return false;
                    }
                    else { 
                        regionId = regionId == '0' ? b : regionId;
                        saveAddress(indexId, regionId, shipTo, address, phone, function (result) {

                            var newSelectedText = shipTo + ' &nbsp;' + phone + ' &nbsp;' + str + ' &nbsp;' + address + '&nbsp;';
                            $('#selectedAddress').html(newSelectedText);

                            indexId = isNaN(parseInt(indexId)) ? '' : parseInt(indexId);
                            if (indexId == 0) {
                                indexId = result.id;
                                shippingAddress[indexId] = {};
                            }

                            $('#selectedAddress').val(indexId);
                            $('#addressEditArea').hide();
                            $('#selectedAddress').html(newSelectedText);
                            $('#addressListArea').hide();
                            $('#consignee-list').hide();
                            $('#step-1').removeClass('step-current');
                            if (shippingAddress) {
                                shippingAddress[indexId].fullRegionIdPath = value;
                                shippingAddress[indexId].fullRegionName = str;
                            }

                            var regionId = $("#shippingAddressId").val();
                            var cartItemIds = window.location.search.replace(/.*cartItemIds=([^&?]+).*/i, "$1");
                            if (/cartItemIds/i.test(window.location.search) == false) cartItemIds = undefined;
                            if (cartItemIds) {
                                window.location.href = "/order/submit?cartItemIds=" + cartItemIds + "&regionId=" + regionId;
                            } else {
                                window.location.reload();
                            }
                            //CalcFright();

                        });
                    }
               	}
            }
            else { 
                var selectedAddress = shippingAddress[indexId];

                var newSelectedText = selectedAddress.shipTo + ' &nbsp;' + selectedAddress.phone + '&nbsp;' + selectedAddress.fullRegionName + ' &nbsp;' + selectedAddress.address + '&nbsp;';
                $('#shippingAddressId').val(indexId);
                $('#addressEditArea').hide();
                $('#selectedAddress').html(newSelectedText);
                $('#addressListArea').hide();
                $('#consignee-list').hide();
                $('#step-1').removeClass('step-current');

                var regionId = $("#shippingAddressId").val();
                var cartItemIds = $("#cartItemIds").val();
                var cartItemIds = window.location.search.replace(/.*cartItemIds=([^&?]+).*/i, "$1");
                if (/cartItemIds/i.test(window.location.search) == false) cartItemIds = undefined;
                if (cartItemIds) {
                    window.location.href = "/order/submit?cartItemIds=" + cartItemIds + "&regionId=" + regionId;
                } else {
                    window.location.reload();
                }
                CalcFright();
            }
    });
}(jQuery, province));



///#region  发票管理（暂时无用）
function InvoiceInit() {
    $("#invoceMsg").hide();
    $("input[name='isInvoce']").click(function () {
        var id = $(this).attr("id");
        if (id == "isInvoce1") {
            $("#invoceMsg").hide();
        }
        else if (id == "isInvoce2") {
            $("#invoceMsg").show();
        }
    })

    $("#dvInvoice .invoice-list div:eq(0)").addClass("invoice-item-selected");
    $("#dvInvoice .invoice-list div").click(function () {
        $("#dvInvoice .invoice-list div").removeClass("invoice-item-selected");
        $(this).addClass("invoice-item-selected");
    })

    $("#dvInvoice .invoice-tit-list div").click(function () {
        $("#dvInvoice .invoice-tit-list div").removeClass("invoice-item-selected");
        $(this).addClass("invoice-item-selected");
    })

    $("#btnAddInvoice").click(function () {
        var html = '<div class="invoice-item invoice-item-selected">';
        html += '<input type="text" value="">';
        html += '<div class="item-btns">';
        html += '<a href="javascript:void(0);" class="ftx-05 update-tit">保存</a>';
        html += '<a href="javascript:void(0);" class="ftx-05 ml10 del-tit hide">删除</a>';
        html += '</div>';
        html += '</div>';

        $("#dvInvoice .invoice-tit-list .invoice-item").removeClass("invoice-item-selected");
        $("#dvInvoice .invoice-tit-list").prepend(html);
        $("#dvInvoice .invoice-tit-list .invoice-item-selected input")[0].focus();

        InvoiceOperationInit();
    })

    $("#btnOk").click(function () {
        var title = $("#dvInvoice .invoice-tit-list .invoice-item-selected input").val();
        var context = $("#dvInvoice .invoice-list .invoice-item-selected span").html();
        if (title == null || context == null) {

        }
        else if (title.length > 0 && context.length > 0) {
            $("#invoiceTitle").html(title);
            $("#invoiceContext").html(context);
            $('.thickbox,.thickdiv').hide();
        }
        else {
            $.dialog.tips("请选择发票信息");
        }

    })
}

function InvoiceOperationInit() {
    $("#dvInvoice .invoice-tit-list .del-tit").click(function () {
        var self = this;
        var id = $(self).attr("key");
        $.dialog.confirm("确定删除该发票抬头吗？", function () {
            var loading = showLoading();
            $.post("./DeleteInvoiceTitle", { id: id }, function (result) {
                loading.close();
                if (result) {
                    $(self).parents(".invoice-item").remove();
                    $.dialog.tips('删除成功');
                }
            })
        });
    })

    $("#dvInvoice .invoice-tit-list .update-tit").click(function () {
        var self = this;
        var name = $(this).parents(".invoice-item").find("input").val();
        var loading = showLoading();
        $.post("./SaveInvoiceTitle", { name: name }, function (result) {
            loading.close();
            if (result) {
                $(self).parents(".invoice-item").find(".del-tit").removeClass("hide");
                $(self).addClass("hide");
                $(self).parents(".invoice-item").find("input").attr("disabled", true);
                $(self).parents(".invoice-item").addClass("invoice-item-selected");
                $.dialog.tips('保存成功');
            }
        })
    })
}
///#endregion