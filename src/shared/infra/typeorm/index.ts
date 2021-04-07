import { createConnection } from 'typeorm';

export default async function createDbConnection(): Promise<void> {
  await createConnection();
}
