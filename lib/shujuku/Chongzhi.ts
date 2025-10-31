import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Yonghu } from './Yonghu';

@Entity('chongzhi')
export class Chongzhi {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50, unique: true })
  chongzhi_id!: string;

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
    enum: ['wechat', 'alipay']
  })
  zhifu_fangshi!: string;

  @Column({ 
    type: 'enum', 
    enum: ['daishenhe', 'yitongguo', 'yijujue', 'yiquxiao'],
    default: 'daishenhe'
  })
  zhuangtai!: string;

  @CreateDateColumn()
  chongzhi_shijian!: Date;

  @UpdateDateColumn()
  gengxin_shijian!: Date;

  @ManyToOne(() => Yonghu, yonghu => yonghu.id)
  yonghu!: Yonghu;
}