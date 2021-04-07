import { inject, injectable } from 'tsyringe';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import Schedule from '@modules/schedules/infra/typeorm/schemas/Schedule';
import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';

@injectable()
class CreateSchedulesService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,

    @inject('QueueProvider')
    private queueProvider: IQueueProvider,
  ) {}

  public async execute(mySchedule: string): Promise<Schedule> {
    const schedule = await this.schedulesRepository.create({ mySchedule });

    await this.queueProvider.addJob({
      key: 'ScheduledDispatch',
      job: {
        data: schedule,
        opts: {
          jobId: String(schedule.id),
          delay: 30 * 1000, // milisseconds
        },
      },
    });

    return schedule;
  }
}

export default CreateSchedulesService;
