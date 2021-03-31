import { ObjectID } from 'mongodb';

import ICreateScheduleDTO from '@modules/schedules/dtos/ICreateScheduleDTO';
import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import Schedule from '@modules/schedules/infra/typeorm/schemas/Schedule';

class FakeSchedulesRepository implements ISchedulesRepository {
  private schedules: Schedule[] = [];

  public async findById(scheduleId: ObjectID): Promise<Schedule | undefined> {
    const schedule = this.schedules.find(
      (findSchedule) => findSchedule.id === scheduleId,
    );

    return schedule;
  }

  public async create(data: ICreateScheduleDTO): Promise<Schedule> {
    const newSchedule = {
      id: new ObjectID(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.schedules.push(newSchedule);

    return newSchedule;
  }

  public async save(schedule: Schedule): Promise<Schedule> {
    const findIndex = this.schedules.findIndex(
      (findSchedule) => findSchedule.id === schedule.id,
    );

    this.schedules[findIndex] = {
      ...this.schedules[findIndex],
      ...schedule,
      updatedAt: new Date(),
    };

    return this.schedules[findIndex];
  }
}

export default FakeSchedulesRepository;
