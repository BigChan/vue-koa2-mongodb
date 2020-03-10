import fetch from './fetch';

// 插入信息
export function createStudent(params) {
  return fetch('/api/student/add', params);
}

// 用户登录
export function login(params) {
  return fetch('/account/login', params);
}
