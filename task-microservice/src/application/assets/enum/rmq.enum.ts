export enum RMQ_TARGET {
  //...project event triggers...
  CREATE_PROJECT = '#create-project',
  GET_PROJECTS = "#get-projects",

  //...tasks event triggers...
  CREATE_TASK = '#create-task',
  ASSIGN_TASK = "#assign-task",
  UPDATE_TASK = "#update-task",

  // ...notification event triggers...
  SEND_EMAIL_TASK_CREATE = "#task-create-send-email",
  SEND_NOTIFY_TASK_DUE = "#send-notification-on-task-due",

  //...user event triggers...
  GET_USER = "#get-user",
}

export enum RMQ_CLIENT {
  NOTIFICATION_SERVICE = "NOTIFICATION_SERVICE",
  USER_SERVICE = "USER_SERVICE"
}