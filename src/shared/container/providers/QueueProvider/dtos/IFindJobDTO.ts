import { JobId } from 'bull';

export default interface IFindJobDTO {
  key: string;
  jobId: JobId;
}
