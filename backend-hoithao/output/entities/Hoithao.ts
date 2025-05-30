import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bantochuc } from "./Bantochuc";
import { Kyyeu } from "./Kyyeu";
import { Baibao } from "./Baibao";

@Index("mabtc", ["mabtc"], { unique: true })
@Index("maky", ["maky"], { unique: true })
@Entity("hoithao", { schema: "qlhoithao" })
export class Hoithao {
  @PrimaryGeneratedColumn({ type: "int", name: "maht" })
  maht: number;

  @Column("varchar", { name: "tenhoithao", length: 255 })
  tenhoithao: string;

  @Column("varchar", { name: "diachi", nullable: true, length: 255 })
  diachi: string | null;

  @Column("text", { name: "tintuc", nullable: true })
  tintuc: string | null;

  @Column("date", { name: "ngaytochuc", nullable: true })
  ngaytochuc: string | null;

  @Column("time", { name: "thoigian", nullable: true })
  thoigian: string | null;

  @Column("varchar", { name: "hinhthuctochuc", nullable: true, length: 100 })
  hinhthuctochuc: string | null;

  @Column("int", { name: "mabtc", nullable: true, unique: true })
  mabtc: number | null;

  @Column("int", { name: "maky", nullable: true, unique: true })
  maky: number | null;

  @OneToOne(() => Bantochuc, (bantochuc) => bantochuc.hoithao, {
    onDelete: "SET NULL",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "mabtc", referencedColumnName: "mabtc" }])
  mabtc2: Bantochuc;

  @OneToOne(() => Kyyeu, (kyyeu) => kyyeu.hoithao, {
    onDelete: "SET NULL",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "maky", referencedColumnName: "maky" }])
  maky2: Kyyeu;

  @ManyToMany(() => Baibao, (baibao) => baibao.hoithaos)
  @JoinTable({
    name: "hoithao_baibao",
    joinColumns: [{ name: "maht", referencedColumnName: "maht" }],
    inverseJoinColumns: [
      { name: "mabaibao", referencedColumnName: "mabaibao" },
    ],
    schema: "qlhoithao",
  })
  baibaos: Baibao[];
}
