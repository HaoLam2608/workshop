import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PhancongPhanbien } from "./PhancongPhanbien";
import { Phieunhanxet } from "./Phieunhanxet";
import { Thamgia } from "./Thamgia";

@Index("username", ["username"], { unique: true })
@Entity("users", { schema: "qlhoithao" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "email", length: 100 })
  email: string;

  @Column("varchar", { name: "hoten", length: 100 })
  hoten: string;

  @Column("varchar", { name: "diachi", nullable: true, length: 255 })
  diachi: string | null;

  @Column("enum", {
    name: "role",
    enum: ["author", "reviewer"],
    default: () => "'author'",
  })
  role: "author" | "reviewer";

  @Column("varchar", { name: "coquan", nullable: true, length: 100 })
  coquan: string | null;

  @Column("varchar", { name: "linhvu", nullable: true, length: 100 })
  linhvu: string | null;

  @Column("varchar", { name: "hocvi", nullable: true, length: 50 })
  hocvi: string | null;

  @Column("varchar", {
    name: "username",
    nullable: true,
    unique: true,
    length: 50,
  })
  username: string | null;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @OneToMany(
    () => PhancongPhanbien,
    (phancongPhanbien) => phancongPhanbien.idUser2
  )
  phancongPhanbiens: PhancongPhanbien[];

  @OneToMany(() => Phieunhanxet, (phieunhanxet) => phieunhanxet.idUser2)
  phieunhanxets: Phieunhanxet[];

  @OneToMany(() => Thamgia, (thamgia) => thamgia.idTacgia2)
  thamgias: Thamgia[];
}
