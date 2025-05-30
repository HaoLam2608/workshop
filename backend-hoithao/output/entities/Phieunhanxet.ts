import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ChitietPhieunhanxet } from "./ChitietPhieunhanxet";
import { Users } from "./Users";
import { Baibao } from "./Baibao";

@Index("id_user", ["idUser"], {})
@Index("mabaibao", ["mabaibao"], {})
@Entity("phieunhanxet", { schema: "qlhoithao" })
export class Phieunhanxet {
  @PrimaryGeneratedColumn({ type: "int", name: "maphieuncx" })
  maphieuncx: number;

  @Column("int", { name: "id_user" })
  idUser: number;

  @Column("int", { name: "mabaibao" })
  mabaibao: number;

  @Column("text", { name: "noidung" })
  noidung: string;

  @Column("datetime", {
    name: "ngaynhanxet",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  ngaynhanxet: Date | null;

  @OneToMany(
    () => ChitietPhieunhanxet,
    (chitietPhieunhanxet) => chitietPhieunhanxet.maphieuncx2
  )
  chitietPhieunhanxets: ChitietPhieunhanxet[];

  @ManyToOne(() => Users, (users) => users.phieunhanxets, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_user", referencedColumnName: "id" }])
  idUser2: Users;

  @ManyToOne(() => Baibao, (baibao) => baibao.phieunhanxets, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "mabaibao", referencedColumnName: "mabaibao" }])
  mabaibao2: Baibao;
}
