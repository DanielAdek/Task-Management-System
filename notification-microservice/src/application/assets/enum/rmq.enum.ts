export enum RMQ_TARGET {
  // ...notification events triggers..
  SEND_EMAIL_TASK_CREATE = "#task-create-send-email",
  SEND_NOTIFY_TASK_DUE = "#send-notification-on-task-due"
}

export enum RMQ_CLIENT {
  NOTIFICATION_SERVICE = "NOTIFICATION_SERVICE",
}