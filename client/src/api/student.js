import fetch from "./fetch";

// 登录用户信息
export function getUserInfo() {
  return fetch("/account/me", {}, "get");
}

// 用户登录
export function login(params) {
  return fetch("/account/login", params);
}
