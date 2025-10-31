import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('yanzhengma')
export class Yanzhengma {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 20 })
  shoujihao!: string;

  @Column({ length: 10 })
  yanzhengma!: string;

  @Column({ 
    type: 'enum', 
    enum: ['weishiyong', 'yishiyong', 'yiguoqi'],
    default: 'weishiyong'
  })
  zhuangtai!: string;

  @CreateDateColumn()
  chuangjian_shijian!: Date;

  @Column({ type: 'datetime' })
  guoqi_shijian!: Date;
}