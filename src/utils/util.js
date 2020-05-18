import Cookies from "js-cookie";

const TokenKey = "Authorization";
/*
 * 设置setLocalStorage
 * */
export function setLocalStorage (key, value) {
  window.localStorage.setItem(key, window.JSON.stringify(value));
}
/*
 * 获取getLocalStorage
 * */
export function getLocalStorage (key) {
  return window.JSON.parse(window.localStorage.getItem(key) || "[]");
}
/*
 * 设置setSessionStorage
 * */
export function setSessionStorage (key, value) {
  window.sessionStorage.setItem(key, window.JSON.stringify(value));
}
/*
 * 获取getSessionStorage
 * */
export function getSessionStorage (key) {
  return window.JSON.parse(window.sessionStorage.getItem(key) || "[]");
}
/*
 * 获取getToken
 * */
export function getToken () {
  return Cookies.get(TokenKey);
}
/*
 * 设置setToken
 * */
export function setToken (token) {
  return Cookies.set(TokenKey, token);
}
/*
 * 移除removeToken
 * */
export function removeToken () {
  return Cookies.remove(TokenKey);
}

/**
 *转换long值为日期字符串
 * @param longtime 时间
 * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss
 * @return 符合要求的日期字符串
 */

export function getFormatDateByLong (longTime, pattern) {
  return getFormatDate(new Date(longTime), pattern);
}
/**
 *转换日期对象为日期字符串
 * @param l long值
 * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss
 * @return 符合要求的日期字符串
 */

export function getFormatDate (date, pattern) {
  if (date == undefined) {
    date = new Date();
  }
  if (pattern == undefined) {
    pattern = "yyyy-MM-dd";
  }

  var o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  };
  if (/(y+)/.test(pattern)) {
    pattern = pattern.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(pattern)) {
      pattern = pattern.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }

  return pattern;
}
