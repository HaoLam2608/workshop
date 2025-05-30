import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Hoithao } from "./Hoithao";
import { PhancongPhanbien } from "./PhancongPhanbien";

@Entity("bantochuc", { schema: "qlhoithao" })
export class Bantochuc {
  @PrimaryGeneratedColumn({ type: "int", name: "mabtc" })
  mabtc: number;

  @Column("varchar", { name: "tenbtc", length: 255 })
  tenbtc: string;

  @OneToOne(() => Hoithao, (hoithao) => hoithao.mabtc2)
  hoithao: Hoithao;

  @OneToMany(
    () => PhancongPhanbien,
    (phancongPhanbien) => phancongPhanbien.mapbtc2
  )
  phancongPhanbiens: PhancongPhanbien[];
}
