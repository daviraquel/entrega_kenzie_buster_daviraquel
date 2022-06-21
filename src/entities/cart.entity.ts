import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinTable,
} from "typeorm";

import { Dvd, User } from "./index";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ default: false })
  paid: boolean;

  @Column("float", { default: 0 })
  total: number;

  @OneToOne((type) => User, (user) => user.cart, { eager: true })
  user: User;

  @ManyToOne((type) => Dvd, { eager: true })
  @JoinTable()
  dvd: Dvd;
}
