import {Entity, Column, ManyToOne, JoinColumn} from 'typeorm';
import {TASK_PRIORITY, TASK_STATUS} from "../../application/assets/enum/task.enum";
import {BaseEntity} from "../../shared/base.entity";
import {Project} from "../project/proj-entity.model";

@Entity('task_table')
export class Task extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: "timestamp"})
  deadline: Date;

  @Column({ enum: TASK_PRIORITY })
  priority: string;

  @Column({ enum: TASK_STATUS })
  status: string;

  @Column()
  assignee: string;

  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinColumn({ name: "projectId" })
  project: Project;

  @Column({ default: false })
  onDueNotify: boolean
}