import {Injectable, UnprocessableEntityException, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {MailerService} from "@nestjs-modules/mailer";
import {ApiResponseBuilder} from "./assets/response/api.response";
import {IApiResponse} from "./assets/interfaces/api-response.interface";
import {SendEmailTaskPayload} from "./assets/interfaces/notify.interface";
import {envManager} from "./assets/config/env.config.manager";
import {Notification} from "../domain/notify.model";

@Injectable()
export class NotificationService {
  private readonly logger = new Logger("NotificationService");
  constructor(
    @InjectRepository(Notification)
    private readonly repository: Repository<Notification>,
    private readonly mailerService: MailerService
  ) {}

  private async saveEmailLog(payload: { subject: string; body: string; receiver: string}): Promise<void> {
    try {
      const log_request = Object.assign(new Notification(), {
        subject: payload.subject,
        body: payload.body,
        receiver: payload.receiver
      });
      await this.repository.save(log_request);
    } catch (error) {
      this.logger.log("Error:Log:Notification: ", error);
    }
  }

  public async sendEmailOnTaskCreation(payload: SendEmailTaskPayload): Promise<IApiResponse<object>> {
    try {
      const { title, recipient, assignee } = payload;
      const email_request = {
        from: envManager.getEnvValue("MAIL_FROM"),
        subject: `${assignee}, A task has been created for you`,
        template: "task-create",
        to: recipient,
        context: {
          username: assignee,
          title
        }
      }
      await this.mailerService.sendMail(email_request);

      await this.saveEmailLog({
        subject: email_request.subject,
        body: `${title}: assigned to ${assignee}`,
        receiver: assignee
      });

      return ApiResponseBuilder.default().setInfo(`An Email sent to ${payload.recipient}`).build();
    } catch (error) {
      return ApiResponseBuilder.setInfo(error.message).setStatus(false).setStatusCode(500).build();
    }
  }

  public async sendEmailOnTaskDue(payload: SendEmailTaskPayload): Promise<void> {
    try {
      const { assignee, recipient, title, deadline } = payload;
      const email_request = {
        from: envManager.getEnvValue("MAIL_FROM"),
        subject: `Task ${title} due`,
        template: "task-due",
        to: recipient,
        context: {
          username: assignee,
          title,
          deadline: new Date(deadline).toDateString()
        }
      }
      await this.mailerService.sendMail(email_request);

      await this.saveEmailLog({
        subject: email_request.subject,
        body: `${title}: assigned to ${assignee}`,
        receiver: assignee
      });
    } catch (error) {
      this.logger.log("Error:Notify:Task:Due: ", error);
    }
  }
}
