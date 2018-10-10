hayui.use('layer', function(layer) {});
var layer = hayui.layer;
$(function() {
    $('#js_selCarBrandsBox').length > 0 && $('#js_selCarBrandsBox').selectCarBrandsLogic({
        data: carTypeSourceData
    });
});

!(function($, window, document) {

    var share = {};

    //last set values
    share.modelIdsAndSeriesIds = {
        models: [],
        series: []
    };

    //temp model id and name
    share.modelIdAndNames = [];

    //temp series id and name
    share.seriesIdAndNames = [];

    //temp brands id and name
    share.brandsIdAndNames = [];

    //temp last datas
    share.saveLastDatas = [];

    share.saveLastDatas = window.parent.addLastDatas ? window.parent.addLastDatas : [];

    //temp edit datas
    // $('#js_editBrandsVals', window.parent.document.body).val('');
    share.editParentBrandsDatas = $('#js_editBrandsVals', window.parent.document.body).val();

    share.editParentBrandsDatas = share.editParentBrandsDatas ? eval('(' + share.editParentBrandsDatas + ')') : [];
    share.editParentBrandsDatas.length > 0 ? share.saveLastDatas = share.editParentBrandsDatas : '';

    //edit update models and names
    share.updateModelIdAndNames = function(datas) {
        $.each(datas, function(i1, l1) {
            var pppid = l1.brand.id;
            share.pushBrandsIdAndName(pppid, l1.brand.name);
            $.each(l1.carSeries, function(i2, l2) {
                var ppid = l2.series.id;
                share.oprateMIASI.addSeries(ppid);
                share.pushSeriesIdAndName(pppid, ppid, l2.series.name);
                $.each(l2.yearStyle, function(i3, l3) {
                    var pid = l3.year.id;
                    $.each(l3.carType, function(i4, l4) {
                        var id = l4.id;
                        var name = l4.name;
                        share.oprateMIASI.addModels(id);
                        share.pushModelIdAndName(pppid, ppid, pid, id, name);
                    });
                });
            });
        });
        share.modelIdAndNames = share.modelIdAndNames.sort(share.sortArrObj('pid'));
        share.seriesIdAndNames = share.seriesIdAndNames.sort(share.sortArrObj('ppid'));
        share.brandsIdAndNames = share.brandsIdAndNames.sort(share.sortArrObj('pppid'))
    };

    //select car brands logic main fun
    $.fn.selectCarBrandsLogic = function(o) {

        o = $.extend({}, {
            data: {},
            cont: '[isSelCarBrandsCont="true"]',
            search: '[isSearchBox="true"]',
            initial: {
                allInitial: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
                iTaget: '[isInitialBox="true"]',
                iNonDisabled: true,
                iNonDisClass: 'initial-disabled'
            },
            tree: '[isTreeBox="true"]',
            model: '[isModelBox="true"]',
            selected: '[isAlreadySel="true"]',
            active: 'active',
            ajaxParam: {
                carSeries: {
                    url: 'http://mall.qipeiren.com/SystemWebService/Select_Brand_Chexi',
                    dataType: 'json'
                },
                carYear: {
                    url: 'http://mall.qipeiren.com/SystemWebService/Select_Brand_Chexing',
                    dataType: 'json'
                },
                carModel: {
                    url: 'http://mall.qipeiren.com/SystemWebService/Select_Brand_Chexing',
                    dataType: 'json'
                }
            },
            tips: '[isTipNum="true"]',
            btnOk: '[isBtnOk="true"]',
            result: '[isResultCont="true"]',
            backIds: ['#js_seriesIds', '#js_modelsIds'],
            mostNum: 100,
            beforeOk: $.noop,
            afterOk: $.noop,
            afterClick: $.noop
        }, o);

        return this.each(function() {
            var t = $(this);

            //get opts inline
            var dataOpts = t.attr('data-opts');
            if (dataOpts) {
                dataOpts = eval('(' + dataOpts + ')');
                o = $.extend({}, o, dataOpts);
            }

            share.opts = o;

            share.setTreeHtml(t, o);
            share.setInitialHtml(t, o);
            share.bindSearchTreeEvent(t, o);

            $(t).delegate(o.btnOk, 'click', function() {
                o.beforeOk(t, $(this), o);

                share.getTreeCheckedData(t, o);

                if (share.saveLastDatas.length < 1) {
                    layer.msg('请选择车型');
                    return false;
                }

                share.setLastTable(t, o, true);

                o.afterOk(t, $(this), o);
            });

            if (share.editParentBrandsDatas.length > 0) {
                share.updateModelIdAndNames(share.editParentBrandsDatas);
            }
            if (share.saveLastDatas.length > 0) {
                share.updateModelIdAndNames(share.saveLastDatas);
                share.updateSelectedNum(t, o);
                share.updateAlreadySeled(t, o);
            }
        });
    };

    //xj set last car brands table
    jQuery.xj = {
        setLastCarBrandsTable: function(_id, datas) {
            share.saveLastDatas = datas ? eval('(' + datas + ')') : [];
            if (share.saveLastDatas.length > 0) {
                share.setLastTable($(_id), share.opts, false);
            }
        }
    };

    //is le ie7
    share.isLtIe7 = function() {
        return ($.browser.msie && ($.browser.version <= '7.0') && !$.support.style);
    };

    //set last table
    share.setLastTable = function(t, o, bool) {

        var table = $('<table class="hayui-table hayui-mt5" hay-size="sm"  style="width:800px;"><thead><tr><th width="20%">汽车品牌</th><th width="25%">车系</th><th width="15%">年款</th><th width="40%">车型</th></tr></thead><tbody></tbody></table>');

        var tbody = $('tbody', table);

        //console.log(JSON.stringify(share.saveLastDatas));

        $.each(share.saveLastDatas, function(i1, t1) {

            var tr = '';

            var t1L = 0;
            tr += '<tr><td data-id="' + t1.brand.id + '" rowspan="{t1}">' + t1.brand.name + '</td>';

            $.each(t1.carSeries, function(i2, t2) {

                var t2L = 0;
                i2 > 0 ? tr += '<tr><td data-id="' + t2.series.id + '" rowspan="{t2}">' + t2.series.name + '</td>' : tr += '<td data-id="' + t2.series.id + '" rowspan="{t2}">' + t2.series.name + '</td>';

                $.each(t2.yearStyle, function(i3, t3) {

                    var t3L = 0;
                    i3 > 0 ? tr += '<tr><td data-id="' + t3.year.id + '" rowspan="{t3}">' + t3.year.name + '</td>' : tr += '<td data-id="' + t3.year.id + '" rowspan="{t3}">' + t3.year.name + '</td>';

                    t1L += t3.carType.length;
                    t2L += t3.carType.length;
                    t3L += t3.carType.length;

                    $.each(t3.carType, function(i4, t4) {

                        i4 > 0 ? tr += '<tr><td data-id="' + t4.id + '" class="ta-l">' + t4.name + '</td></tr>' : tr += '<td data-id="' + t4.id + '" class="ta-l">' + t4.name + '</td></tr>';

                    });

                    tr = tr.replace(/{t3}/, t3L);

                });

                tr = tr.replace(/{t2}/, t2L);
            });

            tr = tr.replace(/{t1}/, t1L);
            tbody.append(tr);
        });

        var div = $('<div></div>').append(table);
        lastTable = div.html();
        (bool && !$.isEmptyObject(o)) ? $(o.result, window.parent.document.body).html(lastTable): $('[isResultCont="true"]').html(lastTable);


        (bool && o) && $(o.backIds[0], window.parent.document.body).val(share.modelIdsAndSeriesIds.series.join(','));
        (bool && o) && $(o.backIds[1], window.parent.document.body).val(share.modelIdsAndSeriesIds.models.join(','));

        $('#js_editBrandsVals', window.parent.document.body).val(JSON.stringify(share.saveLastDatas));
        window.parent.addLastDatas = share.saveLastDatas;

        if (parent.layer) {
            var index = parent.layer.getFrameIndex(window.name);
            parent.layer.close(index);
        }
    };

    //set tree html
    share.setTreeHtml = function(t, o) {

        var treeGroupData = share.groupData(o.data);

        var tree = $(o.tree, t);

        var list = $('<ul class="brands-list"></ul>');

        $.each(treeGroupData, function(tix, tgdata) {

            $.each(tgdata.conts, function(ix, item) {

                var hasSub = true;
                var isFirst = ix == 0 ? true : false;

                var firstLetter = share.getFirstInitial(item.initial.toUpperCase());

                var isChecked1 = share.editCheckedTree(1, item.id);
                list.append('<li name="js_brand_' + item.id + '" id="js_brand_' + item.id + '" data-id="' + item.id + '" data-name="' + item.brandName + '" data-level="1" class="' + (isFirst ? 'first-alpha' : '') + (isChecked1 ? ' edit-checked' : '') + '">' + (isFirst ? '<a class="a-label" name="js_initial_' + firstLetter + '" id="js_initial_' + firstLetter + '">' + firstLetter + '</a>' : '') + '<a>' + (hasSub ? '<i class="alpha-icon"></i>' : '') + '<span class="brand-name" data-search="{name:\'' + item.brandName + '\', initial:\'' + item.initial + '\'}">' + item.brandName + '</span></a></li>');
            });

        });
        tree.html(list);
        share.bindTreeEvent(tree, t, o);
    };

    //set series html
    share.setSeriesHtml = function(li, t, o) {

        var sub = $('<ul class="submenu"></ul>');

        var id = li.attr('data-id');

        $.ajax({
            contentType: 'text/plain',
            type: 'get',
            async: false,
            url: o.ajaxParam.carSeries.url,
            data: {
                'brand_id': id
            },
            dataType: o.ajaxParam.carSeries.dataType,
            success: function(subData) {
                if (subData.success) {
                    $.each(subData.chexi, function(index, subItem) {
                        var isChecked2 = share.editCheckedTree(2, id, subItem.id);
                        sub.append('<li data-id="' + subItem.id + '" data-name="' + subItem.name + '" data-level="2" class="has-sub' + (isChecked2 ? ' edit-checked' : '') + '"><a><span>' + subItem.name + '</span></a>');
                    });
                    var subHtml = $('<div></div>').html(sub);

                    li.append(subHtml.html());

                } else {
                    layer.msg(subData.msg);
                }
            }
        });
    };

    //set year html
    share.setYearHtml = function(li, t, o) {
        var threeSub = $('<ul class="submenu"></ul>');

        var pid = li.attr('data-id');
        var ppid = li.parents('li').attr('data-id');
        var pname = li.attr('data-name');

        $.ajax({
            type: 'get',
            async: false,
            url: o.ajaxParam.carYear.url,
            data: {
                'chexi_id': pid
            },
            dataType: o.ajaxParam.carYear.dataType,
            success: function(threeSubData) {
                if (threeSubData.success) {

                    $.each(threeSubData.niankuan, function(index, niankuan) {
                        var isChecked3 = share.editCheckedTree(3, ppid, pid, niankuan);
                        threeSub.append('<li data-level="3" data-ppid="' + ppid + '" data-pname="' + pname + '" data-pid="' + pid + '" data-id="' + niankuan + '" data-name="' + (niankuan + '款') + '" class="has-sub' + (isChecked3 ? ' edit-checked' : '') + '"><a><span>' + niankuan + '款</span></a>');
                    });
                    var threeSubHtml = $('<div></div>').html(threeSub);

                    li.append(threeSubHtml.html());

                } else {
                    layer.msg(threeSubData.msg);
                }
            }
        });
    };

    //set model html
    share.setModelHtml = function(li, t, o) {
        var modelSub = $('<dl></dl>');
        modelSub.append('<dt><input name="model" isAll="true" id="model" type="checkbox" class="chk-input" /><label class="chk-label" title="全部" for="model">全部</label></dt>');

        var isChecked = function(id) {
            var arr = $.grep(share.modelIdAndNames, function(n, index) {
                return n.id == id;
            });

            return arr.length > 0 ? true : false;
        };

        var pppid = li.attr('data-ppid');
        var ppid = li.attr('data-pid');
        var pid = li.attr('data-id');
        var ppname = li.attr('data-pname');

        $.ajax({
            type: 'post',
            async: false,
            url: o.ajaxParam.carModel.url,
            dataType: o.ajaxParam.carModel.dataType,
            data: {
                niankuan: pid,
                chexi_id: ppid
            },
            success: function(modelData) {
                if (modelData.success) {

                    $.each(modelData.chexing, function(index, mItem) {
                        var isChecked4 = share.editCheckedTree(4, pppid, ppid, pid, mItem.id);
                        modelSub.append('<dt data-pppid="' + pppid + '" data-ppid="' + ppid + '" data-ppname="' + ppname + '" data-pid="' + pid + '" data-id="' + mItem.id + '"><input name="model" ' + (isChecked(mItem.id) || isChecked4 ? 'checked="true"' : '') + ' id="model_' + mItem.id + '" type="checkbox" class="chk-input" /><label class="chk-label" title="' + mItem.cname + '" for="model_' + mItem.id + '">' + mItem.cname + '</label></dt>');
                    });

                    if ($('dt [id^="model_"]:checked', modelSub).length == $('dt [id^="model_"]', modelSub).length) {
                        $('[isAll="true"]', modelSub).attr({
                            'checked': true
                        });
                    }

                    $(o.model, t).html(modelSub.html());

                } else {
                    layer.msg(threeSubData.msg);
                }
            }
        });

        share.bindModelEvent(t, o);
    };

    //set initial html
    share.setInitialHtml = function(t, o) {
        var initialData = share.getAllInitial(o.data);
        var initial = $(o.initial.iTaget, t);

        if (o.initial.allInitial.length > 0) {
            $.each(o.initial.allInitial, function(index, letter) {
                initial.append('<a>' + letter.toUpperCase() + '</a>');
            });
        }

        $('a', initial).each(function(index, el) {
            var a = $(el);
            var aTxt = a.text();
            initial.delegate(a, 'click', function() {
                var search = $(o.search, t);
                var input = $('input:text', search);
                if (input.val().length > 0) {
                    input.val('').trigger('blur');
                }

                share.helpAHref(a, t, o);

            });

            if (share.isLtIe7()) {
                a.attr({
                    'data-help': '#js_initial_' + aTxt
                });
            } else {
                a.attr({
                    href: '#js_initial_' + aTxt
                });
            }

            if (o.initial.iNonDisabled && $.inArray(aTxt, initialData) < 0) {
                a.addClass(o.initial.iNonDisClass);
            }
        });
    };

    //bind tree event
    share.bindTreeEvent = function(tree, t, o) {
        tree.delegate('li a:not(.a-label)', 'click', function() {

            $(o.model, t).html('<dt class="none">请选择</dt>');

            var li = $(this).parent();

            var level = li.attr('data-level');

            if (level == '1' && $('.submenu', li).length < 1) {
                share.setSeriesHtml(li, t, o);
            }

            if (level == '2' && $('.submenu', li).length < 1) {
                share.setYearHtml(li, t, o);
            }

            if (level == '3') {
                share.setModelHtml(li, t, o);
            }

            if (li.hasClass(o.active)) {
                if (li.hasClass('open')) {
                    li.removeClass(o.active);
                }
                //$('.submenu', li).hide();
                $('.submenu', li).removeClass(o.active);
                //li.find('li').removeClass(o.active);
            } else {
                li.parents('li').siblings().andSelf().removeClass(o.active);
                li.parents('li').find('li').removeClass(o.active);
                li.parents('li').siblings().find('li').removeClass(o.active);
                if (!li.hasClass('open')) {
                    li.addClass(o.active);
                }
                li.parents('li').addClass(o.active);
                //li.children('a').addClass(o.active);
                li.siblings().removeClass(o.active);
                //li.siblings().children('a').removeClass(o.active);
                //li.children('.submenu').show();
                // $('.submenu', li.siblings()).hide();
                $('.submenu', li.siblings()).find('li').removeClass(o.active);
                //$('.submenu', li.siblings()).find('li').children('a').removeClass(o.active);
            }

            if (li.attr('data-level') != '3') {
                if (li.hasClass('open')) {
                    li.removeClass('open');
                    li.find('li').removeClass('open');
                    $('.submenu', li).hide();
                } else {
                    li.addClass('open');
                    li.children('.submenu').show();
                }
            }
            return false;

        });
    };

    //bind model check event
    share.bindModelEvent = function(t, o) {
        var tree = $(o.tree, t);

        var model = $(o.model, t);

        var dts = $('dt', model);
        var all = $('[isAll="true"]', dts);

        var chk = $('[id^="model_"]', dts);

        if ($.browser.msie) {
            chk.on('click', function() {
                this.blur();
                this.focus();

            });
            all.on('click', function() {
                this.blur();
                this.focus();
            });
        }

        chk.on('change', function() {
            var k = $(this);
            var isChked = k.is(':checked');

            var dt = k.parents('dt');
            var id = dt.attr('data-id');
            var pid = dt.attr('data-pid');
            var ppid = dt.attr('data-ppid');
            var ppname = dt.attr('data-ppname');
            var pppid = dt.attr('data-pppid');
            var name = k.next().text();

            if (isChked) {

                //most num
                var alreadyNum = $(o.tips, t).text();
                if (parseInt(alreadyNum, 10) >= parseInt(o.mostNum, 10)) {
                    layer.msg('最多只能选择' + o.mostNum + '个');
                    k.attr({
                        checked: false
                    });
                    all.attr({
                        checked: false
                    });
                    return;
                }
                share.pushModelIdAndName(pppid, ppid, pid, id, name);
                share.pushSeriesIdAndName(pppid, ppid, ppname);
                share.pushBrandsIdAndName(pppid, share.getBrandById(pppid, o));
            } else {
                share.spliceModelIdAndName(pppid, ppid, pid, id, name);
                share.spliceSeriesIdAndName(pppid, ppid, ppname);
                share.spliceBrandsIdAndName(pppid, share.getBrandById(pppid, o));
            }

            share.updateModelIds(isChked, id);
            share.updateSerieslIds(isChked, ppid);
            share.updateSelectedNum(t, o);
            share.removeLastDatas(isChked, dt);

            //relative to check all
            if ($('[id^="model_"]:checked', dts).length < $('[id^="model_"]', dts).length) {
                all.attr({
                    checked: false
                });
            } else {
                all.attr({
                    checked: true
                });
            }

            //tree li item is add checked or not
            var isChkTreeItem = function(type) {
                var mode = 0;
                var tempChk = [];
                switch (type) {
                    case 3:
                        mode = $('dt[data-pid="' + pid + '"][data-ppid="' + ppid + '"]', model);
                        break;
                    case 2:
                        mode = $('dt[data-ppid="' + ppid + '"]', model);
                        break;
                    case 1:
                        mode = $('dt[data-pppid="' + pppid + '"]', model);
                        break;
                    default:
                        break;
                }
                if (mode != 0) {
                    mode.each(function(index, ck) {
                        var ckItem = $('[id^="model_"]:checked', ck);
                        if (ckItem.length > 0) {
                            tempChk.push(ckItem.attr('id'));
                        }
                    });
                };
                return tempChk.length > 0 ? true : false;
            };

            var tree3 = $('li[data-id="' + pid + '"][data-pid="' + ppid + '"][data-level="3"]', tree);
            var tree2 = $('li[data-id="' + ppid + '"][data-level="2"]', tree);
            var tree1 = $('li[data-id="' + pppid + '"][data-level="1"]', tree);

            isChkTreeItem(3) ? tree3.addClass('checked') : tree3.removeClass('checked').removeClass('edit-checked');
            isChkTreeItem(2) ? tree2.addClass('checked') : tree2.removeClass('checked').removeClass('edit-checked');
            isChkTreeItem(1) ? tree1.addClass('checked') : tree1.removeClass('checked').removeClass('edit-checked');

            share.updateAlreadySeled(t, o);
        });

        all.on('change', function() {
            var l = $(this);
            var isChked = l.is(':checked');

            if (isChked) {

                //most num
                var alreadyNum = $(o.tips, t).text();
                if (parseInt(alreadyNum, 10) >= parseInt(o.mostNum, 10)) {
                    layer.msg('最多只能选择' + o.mostNum + '个');
                    all.attr({
                        checked: false
                    });
                    return;
                }

                if ($.browser.msie) {
                    chk.not(':checked').trigger('click').trigger('change');
                } else {
                    chk.not(':checked').trigger('click');
                }

            } else {
                if ($.browser.msie) {
                    chk.filter(':checked').trigger('click').trigger('change');
                } else {
                    chk.filter(':checked').trigger('click');
                }
            }
        });
    };

    //search tree
    share.bindSearchTreeEvent = function(t, o) {
        var search = $(o.search, t);
        var input = $('input:text', search);
        var tree = $(o.tree, t);

        search.delegate(input, 'keyup blur', function() {
                var txt = input.val();
                txt = $.trim(txt.toUpperCase());

                $(o.model, t).html('');

                if (txt.length > 0) {
                    $('li[data-level="1"] .brand-name', tree).each(function(index, el) {
                        var name = $(el).text();
                        var li = $(el).parents('li');

                        var searchData = eval('(' + $(el).attr('data-search') + ')');

                        searchData = {
                            name: searchData.name.toUpperCase(),
                            initial: searchData.initial.toUpperCase()
                        };

                        $('[id^="js_initial"]', li).hide();
                        //$(o.initial.iTaget, t).hide();
                        $('.submenu', li).hide();
                        li.removeClass(o.active);
                        $('.submenu li', li).removeClass(o.active);

                        if (searchData.name.search(txt) < 0 && searchData.initial.search(txt) < 0) {
                            li.hide();
                        } else {
                            li.show();
                        }
                    });
                } else {
                    $('li[data-level="1"]:hidden', tree).show();
                    $('[id^="js_initial"]', tree).show();
                    //$(o.initial.iTaget, t).show();
                }
        });
    };

    //initial href help
    share.helpAHref = function(a, t, o) {
        if (share.isLtIe7()) {
            var tree = $(o.tree, t);
            var tagt = a.removeAttr('href').attr('data-help');
            if (tagt) {
                var top = tree.scrollTop() + $(tagt).offset().top - tree.offset().top;
                tree.scrollTop(top);
            }
        }
        return false;
    };

    //get tree last checked datas
    share.getTreeCheckedData = function(t, o) {
        var tree = $(o.tree, t);

        share.saveLastDatas = [];

        $.each(share.brandsIdAndNames, function(index, el) {
            var item = {
                brand: {},
                carSeries: []
            };

            var id1 = el.pppid;
            var text1 = el.pppname;

            var brand = {
                id: id1,
                name: text1
            };

            $.each(share.seriesIdAndNames, function(i2, el2) {
                if (el2.pppid == id1) {

                    var id2 = el2.ppid;
                    var text2 = el2.ppname;

                    var carSeries = {};
                    carSeries.series = {
                        id: id2,
                        name: text2
                    };
                    carSeries.yearStyle = [];

                    //series ids
                    share.oprateMIASI.addSeries(id2);

                    var tempIds = [];
                    $.each(share.modelIdAndNames, function(index, man) {

                        if (man.ppid == id2 && $.inArray(man.pid, tempIds) < 0) {

                            tempIds.push(man.pid);

                            var yearStyle = {};

                            yearStyle.year = {
                                id: man.pid,
                                name: man.pid + '款'
                            };

                            yearStyle.carType = $.grep(share.modelIdAndNames, function(cur, i) {
                                return cur.ppid == man.ppid && cur.pid == man.pid;
                            });

                            yearStyle.carType.length > 0 && carSeries.yearStyle.push(yearStyle);
                        }
                    });

                    carSeries.yearStyle.length > 0 && item.carSeries.push(carSeries);
                }
            });

            item.brand = brand;

            item.carSeries.length > 0 && share.saveLastDatas.push(item);
        });
    };

    //is in last data
    share.isInLastData = function(dt) {
        var pppid = dt.attr('data-pppid');
        var ppid = dt.attr('data-ppid');
        var pid = dt.attr('data-pid');
        var id = dt.attr('data-id');

        var bool = false;

        $.each(share.saveLastDatas, function(i1, l1) {
            if (l1.brand.id == pppid) {
                $.each(l1.carSeries, function(i2, l2) {
                    if (l2.series.id == ppid) {
                        $.each(l2.yearStyle, function(i3, l3) {
                            if (l3.year.id == pid) {
                                $.each(l3.carType, function(i4, l4) {
                                    if (l4.id == id) {
                                        bool = true;
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });

        return bool;
    };

    //reomve from last data
    share.removeLastDatas = function(isChked, dt) {

        if (!isChked && share.isInLastData(dt)) {

            var pppid = dt.attr('data-pppid');
            var ppid = dt.attr('data-ppid');
            var pid = dt.attr('data-pid');
            var id = dt.attr('data-id');

            $.each(share.saveLastDatas, function(i1, l1) {
                if (!$.isEmptyObject(l1) && l1.brand.id == pppid) {
                    $.each(l1.carSeries, function(i2, l2) {
                        if (!$.isEmptyObject(l2) && l2.series.id == ppid) {
                            $.each(l2.yearStyle, function(i3, l3) {
                                if (!$.isEmptyObject(l3) && l3.year.id == pid) {
                                    $.each(l3.carType, function(i4, l4) {
                                        if (!$.isEmptyObject(l4) && l4.id == id) {
                                            l3.carType.splice(i4, 1);
                                        }
                                    });
                                    if (l3.carType.length < 1) {
                                        l2.yearStyle.splice(i3, 1);
                                    }
                                }
                            });
                            if (l2.yearStyle.length < 1) {
                                l1.carSeries.splice(i2, 1);
                            }
                        }
                    });
                    if (l1.carSeries.length < 1) {
                        share.saveLastDatas.splice(i1, 1);
                    }
                }
            });
        }
    };

    //edit tree is checked
    share.editCheckedTree = function(level, id1, id2, id3, id4) {

        var editDatas = share.saveLastDatas;

        if (editDatas.length < 1) {
            return false;
        }

        var data1 = $.grep(editDatas, function(l1, i1) {
            return l1.brand.id == id1;
        });

        var data2 = [];
        if (data1.length > 0) {
            data2 = $.grep(data1[0].carSeries, function(l2, i2) {
                return l2.series.id == id2;
            });
        }

        var data3 = [];
        if (data2.length > 0) {
            data3 = $.grep(data2[0].yearStyle, function(l3, i3) {
                return l3.year.id == id3;
            });
        }
        var data4 = [];
        if (data3.length > 0) {
            data4 = $.grep(data3[0].carType, function(l4, i4) {
                return l4.id == id4;
            });
        }

        switch (level) {
            case 1:
                return data1.length > 0 ? true : false;
                break;
            case 2:
                return data1.length > 0 && data2.length > 0 ? true : false;
                break;
            case 3:
                return data1.length > 0 && data2.length > 0 && data3.length > 0 ? true : false;
                break;
            case 4:
                return data1.length > 0 && data2.length > 0 && data3.length > 0 && data4.length > 0 ? true : false;
                break;
        }
        return false;
    };

    //update the selected number
    share.updateSelectedNum = function(t, o) {
        $(o.tips, t).text(share.modelIdAndNames.length);
    };

    // already selected set type all
    share.alreadySeledTypeAll = function(a, t, o) {

        var dd = a.parents('dd');
        var id1 = dd.attr('data-id');
        var txt1 = dd.attr('data-name');

        var carTypes = $.grep(share.modelIdAndNames, function(cur, i) {
            return cur.pppid == id1;
        });

        var modelSub = $('<dl></dl>');
        modelSub.append('<dt><input name="model" isAll="true" id="model" type="checkbox" class="chk-input" /><label class="chk-label" title="全部" for="model">全部</label></dt>');

        $.each(carTypes, function(index, mItem) {

            var pppid = mItem.pppid;
            var ppid = mItem.ppid;
            var pid = mItem.pid;
            var ppname = txt1;

            var isChecked4 = share.editCheckedTree(4, pppid, ppid, pid, mItem.id);
            modelSub.append('<dt data-pppid="' + pppid + '" data-ppid="' + ppid + '" data-ppname="' + ppname + '" data-pid="' + pid + '" data-id="' + mItem.id + '"><input name="model" ' + (isChecked4 ? 'checked="true"' : '') + ' id="model_' + mItem.id + '" type="checkbox" class="chk-input" /><label class="chk-label" title="' + mItem.name + '" for="model_' + mItem.id + '">' + mItem.name + '</label></dt>');
        });

        if ($('dt [id^="model_"]:checked', modelSub).length == $('dt [id^="model_"]', modelSub).length) {
            $('[isAll="true"]', modelSub).attr({
                'checked': true
            });
        }

        $(o.model, t).html(modelSub.html());
        share.bindModelEvent(t, o);
    };

    //update already selected
    share.updateAlreadySeled = function(t, o) {

        share.getTreeCheckedData(t, o);

        var selected = $(o.selected, t);

        $('dl', selected).html('');
        $.each(share.saveLastDatas, function(i1, l1) {
            var id1 = l1.brand.id;
            var txt1 = l1.brand.name;
            var carTypes = $.grep(share.modelIdAndNames, function(cur, i) {
                return cur.pppid == id1;
            });

            //console.log(JSON.stringify(carTypes));

            var num = carTypes.length;
            if (num > 0) {
                var dd = $('<dl></dl>').append('<dd data-name="' + txt1 + '" data-id="' + id1 + '"><a><span>' + txt1 + '</span><em>(' + (num) + ')</em></a></dd>');
                if (share.isLtIe7()) {
                    $('a', dd).attr({
                        'data-help': '#js_brand_' + id1
                    });
                } else {
                    $('a', dd).attr({
                        href: '#js_brand_' + id1
                    });
                }

                $('dl', selected).append(dd.html());
            }
        });

        $('dl', selected).prepend('<dt>已选车型：</dt>');

        selected.delegate('dl a','click', function() {
                var a = $(this);
                share.helpAHref(a, t, o);
                share.alreadySeledTypeAll(a, t, o);
        });
    };

    //update model ids
    share.updateModelIds = function(isChked, id) {
        if (isChked) {
            share.oprateMIASI.addModels(id);
        } else {
            share.oprateMIASI.spliceModels(id);
        }
    };

    //update series ids
    share.updateSerieslIds = function(isChked, ppid) {
        if (isChked) {
            share.oprateMIASI.addSeries(ppid);
        } else {
            share.oprateMIASI.spliceSeries(ppid);
        }
    };

    // oprate modles id and series id
    share.oprateMIASI = {
        addModels: function(id) {
            share.modelIdsAndSeriesIds.models.push(id);
            share.modelIdsAndSeriesIds.models = share.uniQueue(share.modelIdsAndSeriesIds.models);
        },
        spliceModels: function(id) {
            share.modelIdsAndSeriesIds.models.splice($.inArray(id, share.modelIdsAndSeriesIds.models), 1);
        },
        addSeries: function(ppid) {
            share.modelIdsAndSeriesIds.series.push(ppid);
            share.modelIdsAndSeriesIds.series = share.uniQueue(share.modelIdsAndSeriesIds.series);
        },
        spliceSeries: function(ppid) {
            share.modelIdsAndSeriesIds.series.splice($.inArray(ppid, share.modelIdsAndSeriesIds.series), 1);
        }
    };

    // get brands name by id
    share.getBrandById = function(id, o) {
        var arr = $.grep(o.data, function(cur, i) {
            return cur.id == id;
        }, false);
        return arr.length > 0 ? arr[0].brandName : '';
    };

    //is repeat brands
    share.isRepeatBrandsIdAndName = function(pppid) {
        var arr = $.grep(share.brandsIdAndNames, function(cur, i) {
            return cur.pppid == pppid;
        });
        return arr.length > 0 ? true : false;
    };

    // push brands id and nane
    share.pushBrandsIdAndName = function(pppid, pppname) {
        if (!share.isRepeatBrandsIdAndName(pppid)) {
            share.brandsIdAndNames.push({
                pppid: pppid,
                pppname: pppname
            });
        }
        share.brandsIdAndNames = share.brandsIdAndNames.sort(share.sortArrObj('pppid'));
    }

    //del brands id and name
    share.spliceBrandsIdAndName = function(pppid, pppname) {

        var subs = $.grep(share.seriesIdAndNames, function(cur, i) {
            return cur.pppid == pppid;
        });

        if (subs.length < 1) {
            share.brandsIdAndNames = $.grep(share.brandsIdAndNames, function(cur, i) {
                return cur.pppid == pppid;
            }, true);
        }

        share.brandsIdAndNames = share.brandsIdAndNames.sort(share.sortArrObj('pppid'));
    };

    //is repeat series
    share.isRepeatSeriesIdAndName = function(ppid) {
        var arr = $.grep(share.seriesIdAndNames, function(cur, i) {
            return cur.ppid == ppid;
        });
        return arr.length > 0 ? true : false;
    };

    // push series id and nane
    share.pushSeriesIdAndName = function(pppid, ppid, ppname) {
        if (!share.isRepeatSeriesIdAndName(ppid)) {
            share.seriesIdAndNames.push({
                pppid: pppid,
                ppid: ppid,
                ppname: ppname
            });
        }
        share.seriesIdAndNames = share.seriesIdAndNames.sort(share.sortArrObj('ppid'));
    }

    //del series id and name
    share.spliceSeriesIdAndName = function(pppid, ppid, ppname) {

        var subs = $.grep(share.modelIdAndNames, function(cur, i) {
            return cur.ppid == ppid;
        });

        if (subs.length < 1) {
            share.seriesIdAndNames = $.grep(share.seriesIdAndNames, function(cur, i) {
                return cur.ppid == ppid;
            }, true);
        }

        share.seriesIdAndNames = share.seriesIdAndNames.sort(share.sortArrObj('ppid'));
    };

    //is repeat model id and name
    share.isRepeatModelIdAndName = function(id) {
        var arr = $.grep(share.modelIdAndNames, function(cur, i) {
            return cur.id == id;
        });
        return arr.length > 0 ? true : false;
    };

    //push model id and name
    share.pushModelIdAndName = function(pppid, ppid, pid, id, name) {

        if (!share.isRepeatModelIdAndName(id)) {
            share.modelIdAndNames.push({
                pppid: pppid,
                ppid: ppid,
                pid: pid,
                id: id,
                name: name
            });
        }
        share.modelIdAndNames = share.modelIdAndNames.sort(share.sortArrObj('pid'));
    };

    //del model id and name
    share.spliceModelIdAndName = function(pppid, ppid, pid, id, name) {

        share.modelIdAndNames = $.grep(share.modelIdAndNames, function(cur, i) {
            return cur.id == id;
        }, true);

        share.modelIdAndNames = share.modelIdAndNames.sort(share.sortArrObj('pid'));
    };

    //sort obj
    share.sortArrObj = function(name) {
        return function(obj1, obj2) {
            var v1 = obj1[name];
            var v2 = obj2[name];
            if (v2 > v1) {
                return -1;
            } else if (v2 < v1) {
                return 1;
            } else {
                return 0;
            }
        }
    };

    //get first initial
    share.getFirstInitial = function(str) {
        return str.substr(0, 1);
    };

    //get all initial
    share.getAllInitial = function(array) {
        arr = [];
        for (var i = 0; i < array.length; i++) {
            arr.push(share.getFirstInitial(array[i].initial.toUpperCase()));
        }
        arr = share.uniQueue(arr.sort());
        return arr;
    };

    //get group data by initial
    share.groupData = function(array) {
        var dataArr = [];
        var arr = share.getAllInitial(array);

        for (var j = 0; j < arr.length; j++) {
            var g = {};
            g.initial = arr[j];
            g.conts = [];
            for (var k = 0; k < array.length; k++) {
                if (share.getFirstInitial(array[k].initial.toUpperCase()) == arr[j]) {
                    g.conts.push(array[k]);
                }
            }
            dataArr.push(g);
        }
        return dataArr;
    };

    //unique array
    share.uniQueue = function(array) {
        var arr = [],
            m;
        while (array.length > 0) {
            m = array[0];
            arr.push(m);
            array = $.grep(array, function(n, i) {
                return n == m;
            }, true);
        }
        return arr;
    };

})(jQuery, window, document);