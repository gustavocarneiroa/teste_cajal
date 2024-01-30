import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Arquivo {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  channel: string;
}