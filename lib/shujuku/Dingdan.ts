import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Yonghu } from './Yonghu';

@Entity('dingdan')
export class Dingdan {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50, unique: true })
  dingdanhao!: string;

  @Column({ type: 'int' })
  yonghu_id!: number;

  @Column({ length: 20 })
  shoujihao!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  jine!: number;

  @Column({ 
    type: 'enum', 
    enum: ['yueka', 'nianka', 'cishu_30', 'cishu_70']
  })
  taocan_leixing!: string;

  @Column({ 
    type: 'enum', 
    enum: ['xiaofei', 'tuikuan']
  })
  dingdan_leixing!: string;

  @CreateDateColumn()
  chuangjian_shijian!: Date;

  @ManyToOne(() => Yonghu, yonghu => yonghu.id)
  yonghu!: Yonghu;
}