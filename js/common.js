"use strict";

/* 
 -防抖 -节流 -从url获取参数 
 -处理时间戳 -对象根据key值排序 
 -从cookie获取数据  -判断是否是iPhone
*/
// 防抖
function debounce(fn, delay, immediate) {
  var timer = null;
  delay = delay || 500;
  return function () {
    var context = this;
    var args = arguments;

    if (timer) {
      clearTimeout(timer);
    }

    if (immediate) {
      if (!timer) {
        fn.apply(context, args);
      }

      timer = setTimeout(function () {
        timer = null;
      }, delay);
    } else {
      timer = setTimeout(function () {
        timer = fn.apply(context, args);
      }, delay);
    }
  };
}

; // 节流

function thorottle(fn, step, immediate) {
  var timer = null;
  step = step || 500;
  return function () {
    var context = this;
    var args = arguments;

    if (!timer) {
      if (immediate) {
        fn.apply(context, args);
        timer = setTimeout(function () {
          timer = null;
        }, step);
      } else {
        timer = setTimeout(function () {
          fn.apply(context, args);
          timer = null;
        }, step);
      }
    }
  };
}

; // 获取当前请求参数

function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return '';
}

; // 处理时间戳

function dateHandle(timestamp) {
  if (timestamp) {
    // timestamp = timestamp.replace(/\-/g,"/");
    var date = new Date(timestamp);
    var year = date.getFullYear(); // 获取年月日时分秒值  slice(-2)过滤掉大于10日期前面的0

    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var hour = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    var result = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes;
    var nowtime = new Date();
    var nowyear = nowtime.getFullYear();
    result = result.replace(nowyear + "-", "");
    return result;
  }

  return;
}

; // 对象排序

function objSort(obj) {
  var keys = Object.keys(obj).sort();
  var _obj = {};

  for (var i = 0; i < keys.length; i++) {
    _obj[keys[i]] = obj[keys[i]];
  }

  return _obj;
}

; // 从cookie中获取数据

function getCookie(str) {
  var cookie = document.cookie.split(';');

  for (var i = 0; i < cookie.length; i++) {
    if (cookie[i].split('=')[0].trim() === str) {
      return cookie[i].split('=')[1];
    }
  }
}

; // 判断是否需要登陆

function isEnterLogin(isLogin) {
  if (!isLogin) {
    window.location.href = 'https://passport2.chaoxing.com/mlogin?fid=&newversion=true&refer=' + window.location.href;
  }
}

; // 判断是否是iPhone

function iphoneEnv() {
  return navigator.userAgent.match(/iPhone/i) ? true : false;
}

;