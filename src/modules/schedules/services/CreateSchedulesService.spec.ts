import FakeSchedulesRepository from '@modules/schedules/repositories/fakes/FakeSchedulesRepository';
import FakeQueueProvider from '@shared/container/providers/QueueProvider/fakes/FakeQueueProvider';
import CreateSchedulesService from './CreateSchedulesService';

let fakeSchedulesRepository: FakeSchedulesRepository;
let fakeQueueProvider: FakeQueueProvider;
let createSchedules: CreateSchedulesService;

describe('CreateSchedules', () => {
  beforeEach(() => {
    fakeSchedulesRepository = new FakeSchedulesRepository();
    fakeQueueProvider = new FakeQueueProvider();

    createSchedules = new CreateSchedulesService(
      fakeSchedulesRepository,
      fakeQueueProvider,
    );
  });

  it('should be able to register schedules', async () => {
    await expect(
      createSchedules.execute('Hello World'),
    ).resolves.toHaveProperty('id');
  });
});
