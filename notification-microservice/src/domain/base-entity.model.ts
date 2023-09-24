import {Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'datetime' })
  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'datetime' })
  @UpdateDateColumn()
  updatedAt: Date;
}