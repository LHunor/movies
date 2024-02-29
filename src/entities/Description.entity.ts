import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Description {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  release: number;

  @Column()
  value: string;
}
