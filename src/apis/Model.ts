/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Axios from '@/utils/axios';
import { AxiosRequestConfig } from 'axios';
import useUser from '@/hooks/useUser';

export type IModelOptions = {
  type: 'get' | 'post';
  url: string;
  disToken?: boolean;
  [key: string]: string | number | boolean | undefined | Record<string, any>;
};

export type IModelReuslt = {
  data: Record<string, any>;
  state: string;
  [key: string]: any;
};

export default class Model {
  public domain: string; // 请求公用url
  public defaultType: 'get' | 'post'; // 请求类型
  public options: IModelOptions; // 安全读取数据逻辑
  public result: IModelReuslt; // 返回结果
  private timeOut: number; // 超时时间
  public config: AxiosRequestConfig; // 请求配置信息

  /**
   * 初始化配置
   * @param options 初始化参数
   */
  constructor(options?: IModelOptions) {
    this.resetResult();
    this.domain = '/api';
    this.defaultType = 'get';
    this.timeOut = 10000;
    this.options = {
      url: '',
      type: 'get',
    };
    this.config = {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: useUser().getToken(),
      },
    };
    this.result = {
      state: 'success',
      data: {},
    };
    if (options) this.formatOptions(options);
    if (options) this.formatConfig(options);
  }

  /**
   * 获取数据的function
   * @param data
   */
  async fetch(data: Record<string, any> = {}) {
    const beforRequestData = this.formatBeforeRequestData(data);
    return new Promise((resolve, reject) => {
      //记录下请求开始时间
      const startTime = new Date().getTime();
      Axios[`req${this.options.type}`](this.domain + this.options.url, beforRequestData, this.config)
        .then((res: any) => {
          //计算请求时间
          const fetchTime = new Date().getTime() - startTime;
          if (fetchTime > this.timeOut) {
            console.error(`请求超时:${this.options.url}`);
          }
          this.resetResult();
          const result: Record<string, any> = res;
          this.result.state = this.isSuccess(result) ? 'success' : 'fail';
          if (this.result.state == 'success') {
            this.result.data = this.handlerData(result);
            resolve(this);
          } else {
            this.result.error = this.handerError(result);
            reject(this);
          }
        })
        .catch(() => {
          this.resetResult();
          this.result.state = 'fail';
          this.result.error = {
            errorCode: -9999,
            errorMsg: '网络错误',
          };
          resolve(this);
        });
    });
  }

  formatBeforeRequestData(data: Record<string, any>): Record<string, any> {
    return data;
  }

  /**
   * 配置方法
   * @param data
   */
  formatOptions(data: IModelOptions) {
    const result = Object.assign({ type: this.defaultType }, this.options, data);
    this.options = result;
    return this;
  }

  /**
   * 处理config数据
   * @param data 请求参数
   */
  formatConfig(data: IModelOptions) {
    if (data.disToken && this.config.headers) {
      this.config.headers.Authorization = '';
    }
  }

  /**
   * 判断成功失败的逻辑
   * @param data
   */
  isSuccess(data: Record<string, any>): boolean {
    return parseInt(data.code) === 200;
  }

  /**
   * 处理数据的方法
   * @param data
   */
  handlerData(data: Record<string, any>) {
    return data;
  }
  /**
   * 错误处理逻辑
   * @param error
   */
  handerError(result: Record<string, any>) {
    return {
      errorCode: result.code,
      errorMsg:
        result.errorMsg ||
        result.errMsg ||
        result.msg ||
        (result.respData ? result.respData.errorMsg || result.respData.errMsg : ''),
    };
  }

  /**
   * 重置请求结果
   */
  resetResult() {
    this.result = {
      state: '',
      data: {},
      error: '',
    };
  }

  /**
   * 安全读取数据逻辑
   * res.get('goodsTag.isFreePostage',false)
   * res.get('goodsComments[0].author','匿名')
   */
  get(path: string | string[], defaultValue?: any) {
    if (this.result && this.result.data) {
      return (
        (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path).reduce(
          (o, k) => (o || {})[k],
          this.result.data,
        ) || defaultValue
      );
    } else {
      return defaultValue;
    }
  }
}
