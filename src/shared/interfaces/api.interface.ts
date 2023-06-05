import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IApiService {
  config?: AxiosRequestConfig;
  get(url: string): Promise<AxiosResponse>;
}
