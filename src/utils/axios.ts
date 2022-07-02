import axios, { AxiosRequestConfig } from 'axios';
import useUser from '@/hooks/useUser';

const instance = axios.create({
  timeout: 1000000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    console.log('请求之前做点声明???');
    const token = useUser().getToken();
    console.log('token', token);
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);
// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

// 封装get
const reqget = async (
  url: string,
  params: Record<string, any> = {},
  config: AxiosRequestConfig = {},
): Promise<Record<string, any>> => {
  const { data } = await instance.get(url, { ...config, params: params });
  return data;
};
// 封装post
const reqpost = async (
  url: string,
  postData: Record<string, any>,
  config: AxiosRequestConfig = {},
): Promise<Record<string, any>> => {
  const { data } = await instance.post(url, postData, config);
  return data;
};
// 封装put
const reqput = async (
  url: string,
  postData: Record<string, any>,
  config: AxiosRequestConfig = {},
): Promise<Record<string, any>> => {
  const { data } = await instance.put(url, postData, config);
  return data;
};

// 封装delete
const reqdelete = async (
  url: string,
  params: Record<string, any> = {},
  config: AxiosRequestConfig = {},
): Promise<Record<string, any>> => {
  const { data } = await instance.delete(url, { ...config, params: params });
  return data;
};
export { reqget, reqpost, reqput, reqdelete };
