import {ApiResponse} from "../response/api.response";

export interface IApiResponseBuilder {
  seData?(): ApiResponse;

  setMessage?(): ApiResponse;

  setInfo?(): ApiResponse;

  setStatus?(): ApiResponse;

  setStatusCode?(): ApiResponse

  default?(): ApiResponse
}

export interface IApiResponse<T> {
  message?: string;
  status?: boolean;
  statusCode?: number;
  info?: string;
  data?: T
}