export enum RMQ_EVENT {
  CREATE_USER = '_register_user',
  LOGIN_USER = '_login_user'
}

export enum RMQ_EVENT_TARGET {
  USER_SERVICE = "USER_SERVICE",
  TASK_SERVICE = "TASK_SERVICE"
}