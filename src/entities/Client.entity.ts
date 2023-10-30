import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Client {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  clientName: string;

  @Column()
  clientEmail: string;

  @Column()
  clientEmailPassword: string
}