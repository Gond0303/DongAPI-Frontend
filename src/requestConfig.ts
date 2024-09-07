import type { RequestOptions } from '@@/plugin-request/request';
import {history, RequestConfig} from '@umijs/max';
import {message} from "antd";

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const requestConfig: RequestConfig = {
  //默认请求地址前缀
  baseURL: 'http://localhost:7529',

  //种cookie
  withCredentials: true,

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      const url = config?.url?.concat('?token = 123');
      return { ...config, url };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response as unknown as ResponseStructure;

      const { code } = data;
      // 设置自己的
      // console.log("data:",data);
      // console.log("code:",code);
      if (data.code === 0){
        return response;
      } else {
        //40001:被封禁、40100：未登录
        if (code === 40001 && !/^\/\w+\/?$/.test(location.pathname) && location.pathname !== '/' && location.pathname !== '/interface/list' && !location.pathname.includes('/interface_info/')) {
          message.error(data.message);
          history.push('/user/login');
        }else {
          //其他报错先直接抛出
          message.error(data.message);
        }
      }
      return response;
    },
  ],
};
