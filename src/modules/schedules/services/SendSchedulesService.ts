import { inject, injectable } from 'tsyringe';

import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';
import IPortalProvider from '../providers/PortalProvider/models/IPortalProvider';
import ISchedulesRepository from '../repositories/ISchedulesRepository';

@injectable()
class SendSchedulesService {
  get key(): string {
    return 'ScheduledDispatch';
  }

  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,

    @inject('PortalProvider')
    private portalProvider: IPortalProvider,

    @inject('QueueProvider')
    private queueProvider: IQueueProvider,
  ) {}

  public async execute(data: any): Promise<void> {
    const schedule = await this.schedulesRepository.create({
      mySchedule: data,
    });

    await this.portalProvider.dispatchPortal({ portalData: 'hello World' });

    await this.queueProvider.addJob({
      key: 'DispatchedSchedule',
      job: {
        data: schedule,
        opts: {
          jobId: String(schedule.id),
          delay: 30 * 1000,
        },
      },
    });
  }
}

export default SendSchedulesService;
