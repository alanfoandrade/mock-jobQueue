import { Job } from 'bull';

import IQueueProvider from '../models/IQueueProvider';

import IAddJobDTO from '../dtos/IAddJobDTO';
import IFindJobDTO from '../dtos/IFindJobDTO';

interface IQueue {
  [key: string]: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  job?: any;
}

class BullQueueProvider implements IQueueProvider {
  private queues: IQueue = {};

  public async addJob({ key, job }: IAddJobDTO): Promise<void> {
    this.queues[key] = JSON.stringify(job);
  }

  public async findJob({ key }: IFindJobDTO): Promise<Job | undefined> {
    const data = this.queues[key];

    if (!data) {
      return undefined;
    }

    const parsedData = JSON.parse(data);

    return parsedData;
  }

  public async listActive(key: string): Promise<Job[]> {
    const data = this.queues[key];

    if (!data) {
      return [];
    }

    const parsedData = JSON.parse(data) as Job[];

    return parsedData;
  }

  public processQueue(): void {
    this.queues = {};
  }
}

export default BullQueueProvider;
