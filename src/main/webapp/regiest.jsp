<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://cdn.bootcss.com/jquery/2.1.1/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="kindeditor/kindeditor-all-min.js"></script>
<script src="kindeditor/lang/zh-CN.js"></script>
<script>
    KindEditor.ready(function(K) {
            window.editor = K.create(
                    '#editor_id', {
                        uploadJson : 'kindeditor/jsp/upload_json.jsp',
                        fileManagerJson : 'kindeditor/jsp/file_manager_json.jsp',
                        allowImageUpload : true, //多图上传
                        allowFileManager : true, //浏览图片空间
                        filterMode : false, //HTML特殊代码过滤
                        afterBlur : function() {
                            this.sync();
                        }, //编辑器失去焦点(blur)时执行的回调函数（将编辑器的HTML数据同步到textarea）
                        afterUpload : function(url, data, name) { //上传文件后执行的回调函数，必须为3个参数
                            if (name == "image" || name == "multiimage") { //单个和批量上传图片时
                                if (K("#pic").length > 0) { //文本框存在
                                    document.getElementById('piclist').options[document.getElementById('piclist').length] = new Option(url, url); //下拉列表框增加一条
                                    document.getElementById('piclist').selectedIndex += 1; //选定刚新增的这一条
                                    K("#indexpicimg").html("<img alt='无法显示'src='" + url + "' width='150' height='95' />"); //重置图片展示区DIV的HTML内容
                                    K("#pic").val(url); //重置文本框值
                                }
                            }
                        }
                    });
        });
</script>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
</head>
<body>
<form class="form-horizontal" role="form"  action="articleAdd" method="post" >

    <div class="form-group">
        <label class="col-sm-2 control-label">内容</label>
        <div class=" col-sm-5">
                <textarea id="editor_id" name="details"
                          class="form-control" >
                     &lt;strong&gt;HTML内容&lt;/strong&gt;
                </textarea>
        </div>
    </div>
    <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
            <button type="submit" class="btn btn-default">保存草稿</button>
        </div>
    </div>
</form>
</body>
</html>

</body>