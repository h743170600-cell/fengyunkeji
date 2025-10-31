import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('yonghu')
export class Yonghu {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  username!: string;

  @Column({ length: 100, unique: true })
  email!: string;

  @Column({ length: 100 })
  password!: string;

  @Column({ length: 20, unique: true })
  shoujihao!: string;

  @Column({ 
    type: 'enum', 
    enum: ['active', 'inactive', 'banned'],
    default: 'active'
  })
  zhuangtai!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  yue!: number;

  @Column({ type: 'int', default: 0 })
  shengyu_cishu!: number;

  @CreateDateColumn()
  chuangjian_shijian!: Date;

  @UpdateDateColumn()
  gengxin_shijian!: Date;
}