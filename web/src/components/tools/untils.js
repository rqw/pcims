import Base64 from "./base64.js";
let $namespace = {
  token: "haojiankang.usercenter.session.token",
  header: "haojiankang.usercenter.session.header",
  body: "haojiankang.usercenter.session.body",
  refresh: "haojiankang.usercenter.session.refresh",
  sign: "haojiankang.usercenter.session.sign",
  expire: "haojiankang.usercenter.session.expire"
};
const put = function(k, v) {
  localStorage.setItem(k, v);
};
const get = function(k) {
  return localStorage.getItem(k);
};
const remove = function(k) {
  return localStorage.removeItem(k);
};
const session = {
  token: {}
};

session.token.init = function(token) {
  let arr = token.split(".");
  put($namespace.token, Base64.decode(token));
  put($namespace.token, token);
  put($namespace.header, Base64.decode(arr[0]));
  put($namespace.body, Base64.decode(arr[1]));
  put($namespace.sign, arr[2]);
  let now = new Date().getTime();
  put($namespace.refresh, now);
  put($namespace.expire, now + JSON.parse(get($namespace.header)).age * 1000);
};
session.token.getToken = function() {
  return get($namespace.token);
};

// 获取用户身份信息

session.token.getBody = function() {
  return get($namespace.body) ? JSON.parse(get($namespace.body)) : {};
};

// 判断当前是否存在会话

session.token.exist = function() {
  if (!get($namespace.token)) {
    return false;
  }
  let now = new Date().getTime();
  if (now < get($namespace.expire)) {
    return true;
  }
  return false;
};

// 摧毁会话信息

session.token.destroy = function() {
  remove($namespace.token);
  remove($namespace.header);
  remove($namespace.body);
  remove($namespace.sign);
  remove($namespace.refresh);
  remove($namespace.expire);
};

export default session;
