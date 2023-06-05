import axios, { AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse } from 'axios';

import { IApiService } from '../interfaces/api.interface';

export class ApiService implements IApiService {
  private axiosInstance = axios.create();

  public config?: AxiosRequestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  constructor(config?: AxiosRequestConfig) {
    if (config) {
      this.config = config;
    }
  }

  public get = (url: string, id?: string): Promise<AxiosResponse> => {
    const formattedURL = !id ? url : `${url}/${id}`;

    return this.axiosInstance.get(formattedURL, this.config);
  };
}

export default new ApiService();
