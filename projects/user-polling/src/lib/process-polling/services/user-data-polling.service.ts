import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {InitPayload} from 'data-layers';
import {PollingState} from '../models';

@Injectable()
export class UserDataPollingService {
  pollingState$: Observable<PollingState>;

  processUserData(initPayload: InitPayload): void {
  }

  stopProcessing(): void {
  }
}
