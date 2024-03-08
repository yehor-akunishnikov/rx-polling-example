import {UserData} from 'data-layers';

export interface PollingState {
  data?: UserData;
  status: POLLING_STATUSES;
  error?: string;
}

export enum POLLING_STATUSES {
  NOT_STARTED = 'NOT STARTED',
  IN_PROGRESS = 'IN PROGRESS',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
}
