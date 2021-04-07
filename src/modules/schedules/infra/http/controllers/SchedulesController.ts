import { ObjectID } from 'mongodb';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateSchedulesService from '@modules/schedules/services/CreateSchedulesService';
import UpdateSchedulesService from '@modules/schedules/services/UpdateSchedulesService';

export default class SchedulesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { mySchedule } = request.body;

    const createSchedules = container.resolve(CreateSchedulesService);

    const schedule = await createSchedules.execute(mySchedule);

    return response.json(classToClass(schedule));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { scheduleId } = request.params;
    const { mySchedule } = request.body;

    const updateSchedules = container.resolve(UpdateSchedulesService);

    const parsedScheduleId = scheduleId as unknown;

    const schedule = await updateSchedules.execute({
      scheduleId: parsedScheduleId as ObjectID,
      mySchedule,
    });

    return response.json(classToClass(schedule));
  }
}
