import {ApiResponse} from "../response/api.response";
import {UserDTO} from "../dtos/user";

export interface IApiResponseBuilder {
  seData?(data: object): ApiResponse
  setMessage?(value: string): ApiResponse;
  setInfo?(value: string): ApiResponse;
  setStatus?(value: boolean): ApiResponse;
  setStatusCode?(value: number): ApiResponse
  default?(): ApiResponse;
}

export interface IApiResponse {
  message?: string;
  status?: boolean;
  statusCode?: number;
  info?: string;
  data?: UserDTO;
  token?: string;
}