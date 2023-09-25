import {Entity, Column, OneToMany} from 'typeorm';
import {BaseEntity} from "../../shared/base.entity";
import {Task} from "../task/task-entity.model";

@Entity('project_table')
export class Project extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column()
  creator: string

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}