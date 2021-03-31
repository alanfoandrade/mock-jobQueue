import { injectable } from 'tsyringe';

@injectable()
class SendSchedulesService {
  get key(): string {
    return 'ScheduledDispatch';
  }

  // constructor(
  //   @inject('DispatchProvider')
  //   private dispatchProvider: IDispatchProvider,
  // ) {}

  public async execute(messageData: string): Promise<void> {
    // await this.dispatchProvider.sendDispatch(messageData);

    // eslint-disable-next-line no-console
    console.log(new Date(), messageData);
  }
}

export default SendSchedulesService;
