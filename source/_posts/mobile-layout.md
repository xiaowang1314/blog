title: webapp隐藏滚动条、滚动事件(scroll)没有实时触发、ios(position:fixed)被键盘覆盖
---
下面我要介绍webapp上的布局方法：
可以解决想隐藏滚动条、ios滚动事件(scroll)没有实时触发、ios(position:fixed)被键盘覆盖或者被撑的老远等问题
(安卓机有个问题：input获取焦点时会被软键盘覆盖，暂时未想到好方案)
下面这种布局目前来说我感觉是比较好的基础布局方式


## 先上示例代码
~~~bash
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <title>关于</title>
    <style>
        *{margin: 0;padding: 0;}
        html{font-size: 10px;}
       .page,html, body{
           width: 100%;
           height: 100%;
            overflow: hidden;
        }
        .page{overflow-y: auto;}
        .layer{position: fixed;bottom:0;width: 100%;background: rgba(0,0,0,.5);color: #FFF;}
        .layer input{height: 50px;}
        .layer .sendBtn{-webkit-appearance:none;width: 100px;background: rgba(0,0,0,.5);color: #FFF;border-width: 0;font-size:1rem;}
    </style>
</head>
<body>
<div class="page">
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>2</p>
<p>3</p>
<p>3</p>
<p>3</p>
<p>3</p>
<p>3</p>
<p>3</p>
<p>3</p>
<p>3</p>
<p>3</p>
<p>3</p>
<p>3</p>
<p>3</p>
<p>3</p>
</div>
<div class="layer">
    <input type="text" >
    <input type="button"  class="sendBtn" value="发送">
</div>
<script src="jquery-2.2.4.min.js"></script>
<script>
$(function () {
	//检查是否实时触发滚动事件
    $('.page').scroll(function () {
	  //$('.layer').html($('.page').scrollTop());
    });

   

});
</script>
</body>
</html>

~~~