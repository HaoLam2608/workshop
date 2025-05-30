import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Phieunhanxet } from "./Phieunhanxet";

@Index("maphieuncx", ["maphieuncx"], {})
@Entity("chitiet_phieunhanxet", { schema: "qlhoithao" })
export class ChitietPhieunhanxet {
  @PrimaryGeneratedColumn({ type: "int", name: "machitiet" })
  machitiet: number;

  @Column("int", { name: "maphieuncx" })
  maphieuncx: number;

  @Column("varchar", { name: "ketqua", length: 255 })
  ketqua: string;

  @ManyToOne(
    () => Phieunhanxet,
    (phieunhanxet) => phieunhanxet.chitietPhieunhanxets,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "maphieuncx", referencedColumnName: "maphieuncx" }])
  maphieuncx2: Phieunhanxet;
}
