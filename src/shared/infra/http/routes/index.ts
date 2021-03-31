import { Router } from 'express';

import schedulesRouter from '@modules/schedules/infra/http/routes/schedules.routes';

const routes = Router();

routes.use('/schedules', schedulesRouter);

export default routes;
