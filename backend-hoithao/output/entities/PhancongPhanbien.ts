import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Baibao } from "./Baibao";
import { Users } from "./Users";
import { Bantochuc } from "./Bantochuc";

@Index("id_user", ["idUser"], {})
@Index("mapbtc", ["mapbtc"], {})
@Index("unique_phancong", ["mabaibao", "idUser"], { unique: true })
@Entity("phancong_phanbien", { schema: "qlhoithao" })
export class PhancongPhanbien {
  @PrimaryGeneratedColumn({ type: "int", name: "maphancong" })
  maphancong: number;

  @Column("int", { name: "mabaibao" })
  mabaibao: number;

  @Column("int", { name: "id_user" })
  idUser: number;

  @Column("int", { name: "mapbtc" })
  mapbtc: number;

  @Column("datetime", {
    name: "ngayphancong",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  ngayphancong: Date | null;

  @Column("enum", {
    name: "trangthai",
    nullable: true,
    enum: ["dang_phanbien", "hoan_thanh", "huy"],
    default: () => "'dang_phanbien'",
  })
  trangthai: "dang_phanbien" | "hoan_thanh" | "huy" | null;

  @ManyToOne(() => Baibao, (baibao) => baibao.phancongPhanbiens, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "mabaibao", referencedColumnName: "mabaibao" }])
  mabaibao2: Baibao;

  @ManyToOne(() => Users, (users) => users.phancongPhanbiens, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_user", referencedColumnName: "id" }])
  idUser2: Users;

  @ManyToOne(() => Bantochuc, (bantochuc) => bantochuc.phancongPhanbiens, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "mapbtc", referencedColumnName: "mabtc" }])
  mapbtc2: Bantochuc;
}
