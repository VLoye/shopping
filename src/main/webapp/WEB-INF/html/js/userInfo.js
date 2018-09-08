var currentUser;


$(function () {
    initUserInfo();
});

function initUserInfo() {
    try {
        $.ajax({
            type: 'post',
            url: '/userinfo/GetCurrentUserInfo',
            cache: false,
            async: true,
            data: {},
            dataType: "json",
            success: function (result) {
                if (result.success) {
                    $("#sayhello").html("Hi! " + result.name);
                    $(".login-bt .btn").hide();
                    $("#loginOut").show();
                }
                else {
                    $(".login-bt .btn").show();
                    $("#loginOut").hide();
                }
            },
            error: function () {
            }
        });


        //$.post('/userinfo/GetCurrentUserInfo', {}, function (result) {
        //    if (result.success) {
        //        $("#sayhello").html("Hi! " + result.name);
        //        $(".login-bt .btn").hide();
        //        $("#loginOut").show();
        //    }
        //    else {
        //        $(".login-bt .btn").show();
        //        $("#loginOut").hide();
        //    }
        //});
    }
    catch (e) {
        $("#sayhello").html("Hi! 你好");
        $(".login-bt .btn").show();
    }
}

function logout() {
    $.removeCookie('qpr_mall_user', { path: '/' });
    $.removeCookie('qpr_mall_seller', { path: "/" });
    $.removeCookie('qpr_mall_uname', { path: '/' });
    $.removeCookie('qpr_mall_sname', { path: "/" });
    $.removeCookie('qpr_mall_cart_count', { path: "/" });

    $.removeCookie('qpr_mall_user_comid', { path: '/' });
    $.removeCookie('qpr', { path: "/" });

    location.reload();
}