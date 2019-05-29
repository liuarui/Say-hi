//轮播图配置
carousel(
    $('.demo1'), //必选， 要轮播模块(id/class/tagname均可)，必须为jQuery元素
    {
        type: 'leftright', //可选，默认左右(leftright) - 'leftright' / 'updown' / 'fade' (左右/上下/渐隐渐现)
        arrowtype: 'none', //可选，默认一直显示 - 'move' / 'none'	(鼠标移上显示 / 不显示 )
        autoplay: true, //可选，默认true - true / false (开启轮播/关闭轮播)
        time: 3000 //可选，默认3000
    }
);

//识别实时显示页面部分
window.onload = function () {
    // dom元素获取
    var shituBtn = document.getElementById("shitu-btn");
    var content = document.getElementById("content");
    var translate = document.getElementById("translate");
    var returnBtn = document.getElementById("return");
    var translateVideo = document.getElementById("translateVideo");
    var translateVideoBlock = document.getElementById("translateVideoBlock");
    var videoReturn = document.getElementById("videoReturn");
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var openVideo = document.getElementById("openVideo");
    var capture = document.getElementById('capture');
    var over = document.getElementById('over');

    //通用标识
    //定时器标识
    var videoFlag;
    var videoCapture;
    //开始识别元素
    var resultVideo = document.createElement("div");
    resultVideo.id = 'resultVideo';

    //界面效果实现部分
    
    shituBtn.onclick = function () {
        $(translate).fadeIn("fast");
        $(content).fadeOut("fast");
    }
    // 文件上传界面返回
    returnBtn.onclick = function () {
        $(content).fadeIn("fast");
        $(translate).fadeOut("fast");
    }
    // 视频识别界面返回
    videoReturn.onclick = function () {
        $(translateVideoBlock).fadeOut("fast");
        $(content).fadeIn("fast");
        //停止捕获图像到canvas
        window.clearInterval(videoFlag);
        //停止发送请求
        window.clearInterval(videoCapture);
        $("#translateVideoBlock")[0].removeChild(resultVideo);
    }

    //视频识别部分
    translateVideo.onclick = function () {
        $(translate).fadeOut("fast");
        $(translateVideoBlock).fadeIn("fast");
        //发起摄像头使用请求
        openCamera();
    }
    //开启摄像头按钮功能
    openVideo.onclick = function () {
        openCamera();
        context.drawImage(video, 0, 0, 480, 320);
    }


    //开始识别
    capture.onclick = function () {
        // 捕获图像到canvas
        videoFlag = setInterval(() => {
            context.drawImage(video, 0, 0, 480, 320);
        }, 100);
        //videoAjax函数功能：将canvas转成base64格式，使用ajax发送到后端,每隔0.2s发送一次识别请求
        videoCapture = setInterval(() => {
            videoAjax();
        }, 5000)
        resultVideo.innerHTML = '识别中......';

        $("#translateVideoBlock")[0].appendChild(resultVideo);
    }

    //结束识别
    over.onclick = function () {
        //停止捕获图像到canvas
        window.clearInterval(videoFlag);
        //停止发送请求
        window.clearInterval(videoCapture);

        $("#translateVideoBlock")[0].removeChild(resultVideo);
    }
}