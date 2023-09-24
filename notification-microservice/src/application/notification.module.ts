import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MailerModule} from "@nestjs-modules/mailer";
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import {join} from "path";
import {NotificationController} from './notification.controller';
import {NotificationService} from './notification.service';
import {Notification} from "../domain/notify.model";

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        secure: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: process.env.MAIL_FROM,
      },
      template: {
        dir: join(__dirname, './templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService], // 👈 export for DI
})
export class NotificationModule {}
