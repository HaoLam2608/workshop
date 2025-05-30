import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Hoithao } from "./Hoithao";
import { PhancongPhanbien } from "./PhancongPhanbien";
import { Phieunhanxet } from "./Phieunhanxet";
import { Thamgia } from "./Thamgia";

@Entity("baibao", { schema: "qlhoithao" })
export class Baibao {
  @PrimaryGeneratedColumn({ type: "int", name: "mabaibao" })
  mabaibao: number;

  @Column("varchar", { name: "tenbaibao", length: 255 })
  tenbaibao: string;

  @Column("varchar", { name: "linhvuc", nullable: true, length: 100 })
  linhvuc: string | null;

  @Column("text", { name: "tomtat", nullable: true })
  tomtat: string | null;

  @ManyToMany(() => Hoithao, (hoithao) => hoithao.baibaos)
  hoithaos: Hoithao[];

  @OneToMany(
    () => PhancongPhanbien,
    (phancongPhanbien) => phancongPhanbien.mabaibao2
  )
  phancongPhanbiens: PhancongPhanbien[];

  @OneToMany(() => Phieunhanxet, (phieunhanxet) => phieunhanxet.mabaibao2)
  phieunhanxets: Phieunhanxet[];

  @OneToMany(() => Thamgia, (thamgia) => thamgia.idBaibao2)
  thamgias: Thamgia[];
}
