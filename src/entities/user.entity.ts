import { compare } from "bcrypt";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

import { Cart } from "./cart.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id?: string;
  @Column()
  name?: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ default: false })
  isAdm: boolean;

  @OneToOne((type) => Cart, (cart) => cart.user)
  @JoinColumn()
  cart: Cart;

  comparePassword = async (passwordToCompare: string): Promise<boolean> => {
    return await compare(passwordToCompare, this.password);
  };
}
