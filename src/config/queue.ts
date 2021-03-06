
import { RedisOptions } from 'ioredis';

export default {
  limiter: {
    max: 90,
    duration: 1000,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASS || undefined,
  } as RedisOptions,
};
