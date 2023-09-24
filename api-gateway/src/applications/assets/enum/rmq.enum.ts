export enum RMQ_TARGET {
  //...user event triggers...
  GET_USER = "#get-user",
  CREATE_USER = '#register-user',

  CREATE_PROJECT = '#create-project',
  GET_PROJECTS = "#get-projects",

  // ...task event triggers...
  CREATE_TASK = '#create-task',
  GET_TASKS = "#get-tasks"
}

export enum RMQ_CLIENT {
  USER_SERVICE = "USER_SERVICE",
  TASK_SERVICE = "TASK_SERVICE",
  TOKEN_SERVICE = "TOKEN_SERVICE",
}