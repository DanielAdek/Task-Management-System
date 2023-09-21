import {ApiResponse} from "../response/api.response";

export interface IApiResponseBuilder {
  seData?(): ApiResponse;
  setMessage?(): ApiResponse;
  setInfo?(): ApiResponse;
  setStatus?(): ApiResponse;
  setStatusCode?(): ApiResponse
  default?(): ApiResponse
}

export enum ResponseStatus {
  FAILED = 'Failed',
  SUCCESS = 'Success'
}

export enum CreateUserErrorMessages {
  CREATE_USER_ERROR = 'An account with this email already exists.',
}