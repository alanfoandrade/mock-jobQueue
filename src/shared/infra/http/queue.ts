import 'reflect-metadata';
import 'dotenv/config';

import '@shared/container';
import createDbConnection from '@shared/infra/typeorm';

import BullQueueProvider from '@shared/container/providers/QueueProvider/implementations/BullQueueProvider';

async function runQueue() {
  await createDbConnection();

  const queue = new BullQueueProvider();

  queue.processQueue();
}

runQueue();
