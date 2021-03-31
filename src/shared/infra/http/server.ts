import 'reflect-metadata';
import 'dotenv/config';

import app from './app';

app.listen(process.env.API_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`⚡ Server started on port ${process.env.API_PORT}!`);
});
