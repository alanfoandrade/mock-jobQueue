import { inject, injectable } from 'tsyringe';
import { ObjectID } from 'mongodb';

import AppError from '@shared/errors/AppError';
import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import Schedule from '@modules/schedules/infra/typeorm/schemas/Schedule';
import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';

interface IUpdateSchedulesServiceProps {
  scheduleId: ObjectID;
  mySchedule: string;
}

@injectable()
class UpdateSchedulesService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,

    @inject('QueueProvider')
    private queueProvider: IQueueProvider,
  ) {}

  public async execute({
    scheduleId,
    ...rest
  }: IUpdateSchedulesServiceProps): Promise<Schedule> {
    const schedule = await this.schedulesRepository.findById(scheduleId);

    if (!schedule) {
      throw new AppError('Schedule not found.');
    }

    const scheduledDispatch = await this.queueProvider.findJob({
      key: 'ScheduledDispatch',
      jobId: String(scheduleId),
    });

    if (scheduledDispatch) {
      const jobState = await scheduledDispatch.getState();

      if (jobState === 'completed') {
        throw new AppError('Schedule already dispatched.');
      }

      await scheduledDispatch.remove();
    }

    const updatedSchedule = await this.schedulesRepository.save({
      ...schedule,
      ...rest,
    });

    this.queueProvider.addJob({
      key: 'ScheduledDispatch',
      job: {
        data: updatedSchedule,
        opts: {
          jobId: String(updatedSchedule.id),
          delay: 0,
        },
      },
    });

    return updatedSchedule;
  }
}

export default UpdateSchedulesService;
