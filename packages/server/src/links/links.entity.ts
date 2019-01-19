import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Link {
  @PrimaryColumn({ length: 10 })
  id: string;

  @Column({ length: 2083 })
  fullLink: string;

  @Column({ default: 0 })
  visitsNumber: number;

  @CreateDateColumn()
  createdAt: string;
}
