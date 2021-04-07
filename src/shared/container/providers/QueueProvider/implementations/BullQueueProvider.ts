import { container } from 'tsyringe';
import Queue, { Queue as BullClient, Job } from 'bull';

import queueConfig from '@config/queue';
import SendSchedulesService from '@modules/schedules/services/SendSchedulesService';

import DispatchedSchedulesService from '@modules/schedules/services/DispatchedSchedulesService';
import IQueueProvider from '../models/IQueueProvider';
import IAddJobDTO from '../dtos/IAddJobDTO';
import IFindJobDTO from '../dtos/IFindJobDTO';

interface IQueue {
  [key: string]: {
    client: BullClient;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    execute(job: any): Promise<void>;
  };
}

export default class BullQueueProvider implements IQueueProvider {
  private queues: IQueue;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private jobs: any[];

  constructor() {
    this.queues = {};

    this.init();
  }

  init(): void {
    const sendSchedulesService = container.resolve(SendSchedulesService);
    const dispatchedSchedules = container.resolve(DispatchedSchedulesService);

    this.jobs = [sendSchedulesService, dispatchedSchedules];

    this.jobs.forEach(({ key, execute }) => {
      this.queues[key] = {
        client: new Queue(key, queueConfig),
        execute,
      };
    });
  }

  public async addJob({ key, job }: IAddJobDTO): Promise<void> {
    await this.queues[key].client.add(job.data, job.opts);
  }

  public async findJob({ key, jobId }: IFindJobDTO): Promise<Job | undefined> {
    const findJob = await this.queues[key].client.getJob(jobId);

    return findJob || undefined;
  }

  public async listActive(key: string): Promise<Job[]> {
    const activeJobs = await this.queues[key].client.getActive();

    return activeJobs;
  }

  public processQueue(): void {
    this.jobs.forEach((job) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.queues[job.key].client.process((queueJob: any) => {
        const { data } = queueJob;
        job.execute(data);
      });
    });
  }
}
