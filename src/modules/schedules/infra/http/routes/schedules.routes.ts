import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SchedulesController from '@modules/schedules/infra/http/controllers/SchedulesController';

const schedulesRouter = Router();

const schedulesController = new SchedulesController();

// POST: baseURL/schedules
/**
 * Register schedule.
 */
schedulesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      mySchedule: Joi.string().required(),
    },
  }),
  schedulesController.create,
);

// PUT: baseURL/schedules/:scheduleId
/**
 * Update Schedule.
 */
schedulesRouter.put(
  '/:scheduleId',
  celebrate({
    [Segments.PARAMS]: {
      scheduleId: Joi.string()
        .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
        .message('"scheduleId" must be a valid objectID.')
        .required(),
    },
    [Segments.BODY]: {
      mySchedule: Joi.string().required(),
    },
  }),
  schedulesController.update,
);

export default schedulesRouter;
