import {
  Entity, Column, PrimaryGeneratedColumn,
  BeforeInsert, CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Entity('user_table')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'datetime' })
  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'datetime' })
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async modifyColumns() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      throw new InternalServerErrorException('Encryption Error');
    }
  }

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}