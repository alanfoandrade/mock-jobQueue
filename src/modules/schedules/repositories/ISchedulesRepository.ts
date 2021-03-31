import { ObjectID } from 'mongodb';

import ICreateScheduleDTO from '@modules/schedules/dtos/ICreateScheduleDTO';
import Schedule from '@modules/schedules/infra/typeorm/schemas/Schedule';

export default interface ISchedulesRepository {
  findById(scheduleId: ObjectID): Promise<Schedule | undefined>;
  create(data: ICreateScheduleDTO): Promise<Schedule>;
  save(schedule: Schedule): Promise<Schedule>;
}
