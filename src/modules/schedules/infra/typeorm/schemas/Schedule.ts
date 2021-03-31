import { ObjectID } from 'mongodb';
import {
  Entity,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity('schedules')
class Schedule {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('varchar')
  mySchedule: string;

  @CreateDateColumn('timestamp with time zone')
  createdAt: Date;

  @UpdateDateColumn('timestamp with time zone')
  updatedAt: Date;
}

export default Schedule;
