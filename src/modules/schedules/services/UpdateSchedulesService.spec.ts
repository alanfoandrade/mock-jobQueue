import { ObjectID } from 'mongodb';

import FakeSchedulesRepository from '@modules/schedules/repositories/fakes/FakeSchedulesRepository';
import FakeQueueProvider from '@shared/container/providers/QueueProvider/fakes/FakeQueueProvider';
import UpdateSchedulesService from './UpdateSchedulesService';

let fakeSchedulesRepository: FakeSchedulesRepository;
let fakeQueueProvider: FakeQueueProvider;
let updateSchedules: UpdateSchedulesService;

describe('UpdateSchedules', () => {
  beforeEach(() => {
    fakeSchedulesRepository = new FakeSchedulesRepository();
    fakeQueueProvider = new FakeQueueProvider();

    updateSchedules = new UpdateSchedulesService(
      fakeSchedulesRepository,
      fakeQueueProvider,
    );
  });

  it('should be able to update schedules', async () => {
    const schedule = await fakeSchedulesRepository.create({
      mySchedule: 'Hello World',
    });

    await expect(
      updateSchedules.execute({
        scheduleId: schedule.id,
        mySchedule: 'Updated Schedule',
      }),
    ).resolves.toHaveProperty('mySchedule', 'Updated Schedule');
  });

  it('should not be able to update unregistered schedules', async () => {
    await expect(
      updateSchedules.execute({
        scheduleId: new ObjectID(),
        mySchedule: 'Hello World',
      }),
    ).rejects.toHaveProperty('message', 'Schedule not found.');
  });

  it('should not be able to update dispatched schedules', async () => {
    const schedule = await fakeSchedulesRepository.create({
      mySchedule: 'Hello World',
    });

    // TODO: MOCKAR RETORNO DA FUNÇÃO getState() CHAMADA NA LINHA 40 DO UpdateSchedulesService.ts, RETORNAR 'completed'.

    await fakeQueueProvider.addJob({
      key: 'ScheduledDispatch',
      job: {
        data: schedule,
        opts: {
          jobId: String(schedule.id),
          delay: 0,
        },
      },
    });

    await expect(
      updateSchedules.execute({
        scheduleId: schedule.id,
        mySchedule: 'Hello World',
      }),
    ).rejects.toHaveProperty('message', 'Schedule already dispatched.');
  });
});
