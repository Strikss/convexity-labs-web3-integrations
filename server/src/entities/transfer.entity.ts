import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  value: string;

  @Column()
  transactionHash: string;

  @Column()
  blockNumber: number;

  @Column()
  logIndex: number;

  @CreateDateColumn()
  createdAt: Date;
}
