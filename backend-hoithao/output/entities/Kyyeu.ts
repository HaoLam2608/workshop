import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hoithao } from "./Hoithao";

@Entity("kyyeu", { schema: "qlhoithao" })
export class Kyyeu {
  @PrimaryGeneratedColumn({ type: "int", name: "maky" })
  maky: number;

  @Column("varchar", { name: "tenky", length: 255 })
  tenky: string;

  @OneToOne(() => Hoithao, (hoithao) => hoithao.maky2)
  hoithao: Hoithao;
}
