import axios from 'axios';
// import Vue from 'vue';

import { message } from 'ant-design-vue';

// 配置
axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.baseURL = 'http://127.0.0.1:3000';
// axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  const newConfig = {
    ...config,
    headers: {
      ...config.headers,
      // Authorization: Vue.ls.get('authorization'),
    },
  };
  return newConfig;
});

/**
 * 请求工具封装
 * @param url 请求地址
 * @param params 请求参数
 * @param setting 报错提醒方式
 * @param method 请求方式
 * @param config axios 配置
 * @returns {Promise<any>}
 */
export default function fetch(url, params, method = 'post', config = {}) {
  return new Promise((resolve, reject) => {
    let requestData = params;
    if (!params) {
      requestData = {};
    }
    axios[method](url, requestData, {
      ...config,
    }).then(
      (response) => {
        if (response.status === 200) {
          if (response.data.code === 0) {
            message.error(response.data.msg);
            reject(response);
          } else {
            resolve(response.data);
          }
        } else {
          message.error(response.data.msg);
          reject(response);
        }
      },
      (err) => {
        message.error('前端请求出错');
        reject(err);
      },
    );
  });
}
