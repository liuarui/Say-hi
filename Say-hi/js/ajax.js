var elem = document.createElement("div");
elem.id = 'loading';
elem.innerHTML = '图像火速上传并识别中，请耐心等待';

// function commonAjax(data, success, error) {
//     $.ajax({
//         type: "post",
//         data: data,
//         url: 'http://9qhqdu.natappfree.cc/translate',
//         dataType: 'json',
//         contentType: false, //必须
//         processData: false, //必须
//         success: success,
//         error: error
//     })
// }
//文件上传ajax
function login() {
    $("#translate")[0].appendChild(elem);
    var formData = new FormData($("#translateForm")[0]);
    $.ajax({
        type: "post",
        data: formData,
        url: 'http://9qhqdu.natappfree.cc/translate',
        dataType: 'json',
        contentType: false, //必须
        processData: false, //必须
        success: function (result) {
            // var json = JSON.stringify(result);
            // var str = /trace/;
            // result.(\u9884\u6d4b\u7ed3\u679c\u4e3a)
            $("#translate")[0].removeChild(elem);
            if (result.trace) {
                alert("识别失败，失败原因：输入图像格式不支持")
            } else {
                alert(`识别成功！识别结果为：${result.\u9884\u6d4b\u7ed3\u679c\u4e3a}`);
            }

            // alert(json);
        },
        error: function () {
            alert("识别失败，失败原因：服务器请求失败，请联系管理员")
            $("#translate")[0].removeChild(elem);
        }
    });
}
//视频识别ajax
function videoAjax() {
    var strDataURI = canvas.toDataURL("image/jpeg");
    //过滤头部
    var arr = strDataURI.split(",");
    // console.log(strDataURI);
    console.log(arr[1]);
    $.ajax({
        type: "post",
        data: arr[1],
        url: 'http://e7k7fj.natappfree.cc/translate',
        dataType: 'json',
        contentType: false, //必须
        processData: false, //必须
        //识别成功逻辑实现
        success: function (result) {
            // var json = JSON.stringify(result);
            // var str = /trace/;
            // result.(\u9884\u6d4b\u7ed3\u679c\u4e3a)
            console.log(result);
            if (result.trace) {
                resultVideo.innerHTML = "识别失败，失败原因：输入图像格式不支持";
            } else {
                resultVideo.innerHTML = `识别成功！识别结果为：${result.\u9884\u6d4b\u7ed3\u679c\u4e3a}`;
            }

            // alert(json);
        },
        //识别识别逻辑实现
        error: function () {
            resultVideo.innerHTML = "识别失败，失败原因：服务器请求失败，请联系管理员";
        }
    });
}