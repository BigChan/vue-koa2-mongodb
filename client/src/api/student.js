import fetch from './fetch';

// 插入信息
export function createStudent(params) {
  return fetch('/api/student/add', params);
}

// 获取列表
export function getStudentList() {
  return fetch('/api/student/list', {}, 'get');
}

// 删除
export function deleteStudent(id) {
  return fetch(`/api/student/delete/${id}`, {}, 'get');
}

// 更新
export function updateStudent(params) {
  return fetch('/api/student/update', params);
}
