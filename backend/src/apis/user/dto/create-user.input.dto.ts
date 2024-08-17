import { Column } from 'typeorm';

export class CreateUserInput {
  @Column()
  name: string;
  @Column()
  age: string;
  @Column()
  phone: string;
  @Column()
  address: string;
}
