import {
  EntityRepository,
  getMongoRepository,
  MongoRepository,
  ObjectID,
} from 'typeorm';

import ICreateScheduleDTO from '@modules/schedules/dtos/ICreateScheduleDTO';
import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import Schedule from '@modules/schedules/infra/typeorm/schemas/Schedule';

@EntityRepository(Schedule)
class SchedulesRepository implements ISchedulesRepository {
  private ormRepository: MongoRepository<Schedule>;

  constructor() {
    this.ormRepository = getMongoRepository(Schedule);
  }


  public async findById(scheduleId: ObjectID): Promise<Schedule | undefined> {
    const schedule = this.ormRepository.findOne(scheduleId);

    return schedule;
  }

  public async create(data: ICreateScheduleDTO): Promise<Schedule> {
    const schedule = this.ormRepository.create(data);

    await this.ormRepository.save(schedule);

    return schedule;
  }

  public async save(schedule: Schedule): Promise<Schedule> {
    return this.ormRepository.save(schedule);
  }
}

export default SchedulesRepository;
