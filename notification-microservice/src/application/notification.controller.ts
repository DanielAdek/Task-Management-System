import {Controller, Logger} from '@nestjs/common';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {RMQ_TARGET} from "./assets/enum/rmq.enum";
import {IApiResponse} from "./assets/interfaces/api-response.interface";
import {NotificationService} from "./notification.service";
import {SendEmailTaskPayload} from "./assets/interfaces/notify.interface";

@Controller('notification')
export class NotificationController {
  private readonly logger: Logger = new Logger(NotificationController.name);
  constructor(private readonly service: NotificationService) {}

  @MessagePattern(RMQ_TARGET.SEND_EMAIL_TASK_CREATE)
  public async taskCreate(@Payload() payload: SendEmailTaskPayload): Promise<IApiResponse<object>> {
    return this.service.sendEmailOnTaskCreation(payload);
  }

  @MessagePattern(RMQ_TARGET.SEND_NOTIFY_TASK_DUE)
  public async taskDue(@Payload() payload: SendEmailTaskPayload): Promise<void> {
    await this.service.sendEmailOnTaskDue(payload);
  }
}
