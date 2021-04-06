import { inject, injectable } from 'tsyringe';
import IPortalProvider from '../providers/PortalProvider/models/IPortalProvider';
import ISchedulesRepository from '../repositories/ISchedulesRepository';

@injectable()
class SendSchedulesService {
  get key(): string {
    return 'ScheduledDispatch';
  }

  constructor(
    // @inject('SchedulesRepository')
    // private schedulesRepository: ISchedulesRepository,

    @inject('PortalProvider')
    private portalProvider: IPortalProvider,
  ) {}

  public async execute(): Promise<void> {
    // await this.schedulesRepository.create({
    //   mySchedule: 'hello world',
    // });

    await this.portalProvider.dispatchPortal({ portalData: 'hello World' });
  }
}

export default SendSchedulesService;
