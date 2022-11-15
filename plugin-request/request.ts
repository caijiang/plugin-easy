import { SELECTION_ALL } from 'antd/lib/table/hooks/useSelection';
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios';

// request 方法 opts 参数的接口

interface IRequestOptions extends AxiosRequestConfig {
  skipErrorHandler?: boolean;
  requestInterceptors?: IRequestInterceptorTuple[];
  responseInterceptors?: IResponseInterceptorTuple[];
  [key: string]: any;
}

type RequestOptions = IRequestOptions;

interface IRequestOptionsWithResponse extends IRequestOptions {
  getResponse: true;
}

interface IRequestOptionsWithoutResponse extends IRequestOptions {
  getResponse: false;
}

interface IRequest {
  <T = any>(url: string, opts: IRequestOptionsWithResponse): Promise<
    AxiosResponse<T>
  >;
  <T = any>(url: string, opts: IRequestOptionsWithoutResponse): Promise<T>;
  <T = any>(url: string, opts: IRequestOptions): Promise<T>; // getResponse 默认是 false， 因此不提供该参数时，只返回 data
  <T = any>(url: string): Promise<T>; // 不提供 opts 时，默认使用 'GET' method，并且默认返回 data
}

type RequestError = AxiosError | Error;

interface IErrorHandler {
  (error: RequestError, opts: IRequestOptions): void;
}
type IRequestInterceptorAxios = (config: RequestOptions) => RequestOptions;
type IRequestInterceptorUmiRequest = (
  url: string,
  config: RequestOptions,
) => { url: string; options: RequestOptions };
type IRequestInterceptor =
  | IRequestInterceptorAxios
  | IRequestInterceptorUmiRequest;
type IErrorInterceptor = (error: Error) => Promise<Error>;
type IResponseInterceptor = <T = any>(
  response: AxiosResponse<T>,
) => AxiosResponse<T>;
type IRequestInterceptorTuple =
  | [IRequestInterceptor, IErrorInterceptor]
  | [IRequestInterceptor]
  | IRequestInterceptor;
type IResponseInterceptorTuple =
  | [IResponseInterceptor, IErrorInterceptor]
  | [IResponseInterceptor]
  | IResponseInterceptor;

export type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  RequestError,
  IResponseInterceptor as ResponseInterceptor,
  IRequestOptions as RequestOptions,
  IRequest as Request,
};

export const request: IRequest = async () => {
  return {} as any;
};
