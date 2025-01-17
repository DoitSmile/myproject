import { Column } from 'typeorm';

export class CreateUserInput {
  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  password: string;
}
