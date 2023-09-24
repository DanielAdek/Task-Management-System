import {Entity, Column} from "typeorm";
import {BaseEntity} from "./base-entity.model";

@Entity("notification_table")
export class Notification extends BaseEntity {
  @Column()
  subject: string;

  @Column()
  body: string;

  @Column()
  receiver: string;
}