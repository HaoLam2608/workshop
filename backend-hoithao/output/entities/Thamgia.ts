import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";
import { Baibao } from "./Baibao";

@Index("id_baibao", ["idBaibao"], {})
@Entity("thamgia", { schema: "qlhoithao" })
export class Thamgia {
  @Column("int", { primary: true, name: "id_tacgia" })
  idTacgia: number;

  @Column("int", { primary: true, name: "id_baibao" })
  idBaibao: number;

  @Column("varchar", { name: "vai_tro", nullable: true, length: 100 })
  vaiTro: string | null;

  @ManyToOne(() => Users, (users) => users.thamgias, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_tacgia", referencedColumnName: "id" }])
  idTacgia2: Users;

  @ManyToOne(() => Baibao, (baibao) => baibao.thamgias, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_baibao", referencedColumnName: "mabaibao" }])
  idBaibao2: Baibao;
}
