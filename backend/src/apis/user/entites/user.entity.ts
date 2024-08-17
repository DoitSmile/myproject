import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // class가 실행될 때 typeorm에 의해 entity테이블 생성
export class User {
  @PrimaryGeneratedColumn('uuid')
  Id: string;
  @Column()
  name: string;
  @Column()
  age: string;
  @Column()
  phone: string;
  @Column()
  address: string;
}
