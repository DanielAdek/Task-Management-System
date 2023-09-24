import {ApiResponse} from "../response/api.response";

export interface IApiResponseBuilder {
  seData?(data: object): ApiResponse
  setMessage?(value: string): ApiResponse;
  setInfo?(value: string): ApiResponse;
  setStatus?(value: boolean): ApiResponse;
  setStatusCode?(value: number): ApiResponse
  default?(): ApiResponse;
}

export interface IApiResponse<T> {
  message?: string;
  status?: boolean;
  statusCode?: number;
  info?: string;
  data?: T
}