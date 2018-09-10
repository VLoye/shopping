UE.registerUI('cloudimage', function(editor, uiName){

    var uiTitle = '插入图片';

    //创建dialog
    var dialog = new UE.ui.Dialog({
        //指定弹出层中页面的路径，这里只能支持页面,因为跟addCustomizeDialog.js相同目录，所以无需加路径
        // iframeUrl: 'http://www.qipeiren.com/User/upload/KEditorChooseImage/index?isQPR=false',
        iframeUrl: "undefined" == typeof iframeUrl ? 'http://www.qipeiren.com/User/upload/KEditorChooseImage/index?isQPR=false' :  iframeUrl,
        //需要指定当前的编辑器实例
        editor:editor,
        //指定dialog的名字
        name:'cloudimage',
        //dialog的标题
        title:uiTitle,

        //指定dialog的外围样式
        cssRules:"width:785px;height:430px;",

        //如果给出了buttons就代表dialog有确定和取消
        buttons:[
            {
                className:'edui-okbutton',
                label:'插入图片',
                onclick:function () {

                    var iframe = document.getElementById(dialog.id + '_iframe');
                    var iframeCont = iframe.contentWindow.document || iframe.contentDocument;

                    var res = {
                        srcs:[]
                    };
                    $('[isSelResult="true"] [isempty="false"] [isimg="true"] img', iframeCont).each(function(index, el) {
                        res.srcs.push($(el).attr('src'));
                    });

                    window.top.cloudImageInsert.getLastPathAjax(res, function(data){
                        var paths = data.file_name_list;
                        var html = '';
                        for(var i = 0; i < paths.length; i++){
                            html += '<img src="'+ paths[i].replace('_s', '') +'" /><br />';
                        }
                        editor.execCommand('inserthtml', html);
                        setTimeout(function() {
                            dialog.close(true);
                        }, 0);
                    });
                }
            },
            {
                className:'edui-cancelbutton',
                label:'取消',
                onclick:function () {
                    dialog.close(false);
                }
            }
        ]});

    //参考addCustomizeButton.js
    var btn = new UE.ui.Button({
        name:'dialogbutton' + uiName,
        title:uiTitle,
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules :'background-position: -726px -77px;',
        onclick:function () {
            //渲染dialog
            dialog.render();
            dialog.open();
        }
    });

    return btn;
}, 9/*index 指定添加到工具栏上的那个位置，默认时追加到最后,editorId 指定这个UI是那个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮*/);