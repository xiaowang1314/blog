---
title: Promise和ajax的封装
---

## 代码如下:
```
/**
 * ajax函数，返回一个promise对象
 * @param {Object} optionsOverride 参数设置，支持的参数如下
 * @return {Promise}
 *   该函数注册xhr.onloadend回调函数，判断xhr.status是否属于 [200,300)&&304 ，
 *   如果属于则promise引发resolve状态，允许拿到xhr对象
 *   如果不属于，或已经引发了ontimeout,onabort,则引发reject状态，允许拿到xhr对象
 *
 * 关于reject
 * 返回一个对象，包含:
 *     errorType:错误类型
 *     abort_error:   xhr对象调用abort函数
 *     timeout_error: 请求超时
 *     onerror:       xhr对象触发了onerror事件
 *     send_error:    发送请求出现错误
 *     status_error:  响应状态不属于 [200,300)&&304
 */
function ajax(optionsOverride){
    var options = {
        url: '#',//url地址，默认"#"
        method: 'GET',//请求方法，仅支持GET,POST,默认GET
        async: true,//是否异步，默认true
        timeout: 0,//请求时限，超时将在promise中调用reject函数
        data: null,//发送的数据，该函数不支持处理数据，将会直接发送
        dataType: 'text',//接受的数据的类型，默认为text
        headers: {},//一个对象，包含请求头信息
        onprogress: function () { },//处理onprogress的函数
        onuploadprogress: function () { },//处理.upload.onprogress的函数
        xhr: null//允许在函数外部创建xhr对象传入，但必须不能是使用过的
    }

    for(var k in optionsOverride){
        options[k]=optionsOverride[k];
    }
    var xhr=options.xhr||new XMLHttpRequest();
    return new Promise(function (resolve,reject) {
        xhr.open(options.method,options.url,options.async);
        xhr.timeout=options.timeout;
        //设置请求头
        for(var j in options.headers){
            xhr.setRequestHeader(j,options.headers[j]);
        }
        //注册xhr对象事件
        xhr.onprogress=options.onprogress;
        xhr.upload.onprogress=options.onuploadprogress;
        xhr.responseType=options.dataType;
        
        xhr.onabort=function () {
            reject(new Error({
                errorType:'abort_error',
                xhr:xhr
            }));
        }
        xhr.ontimeout=function () {
            reject(new Error({
                errorType:'timeout_error',
                xhr:xhr
            }));
        }
        
        xhr.onerror=function () {
            reject(new Error({
                errorType:'onerror',
                xhr:xhr
            }));
        }

        xhr.onloadend=function () {
            if(xhr.status>=200 && xhr.status<300 || xhr.status==304){
                resolve(xhr);
            }else{
                reject(new Error({
                    errorType:'status_error',
                    xhr:xhr
                }));
            }
        }

        try {
           xhr.send(options.data);
        }catch(e){
            reject(new Error({
                errorType:'send_error',
                error:e
            }));
        }
    });
}




```