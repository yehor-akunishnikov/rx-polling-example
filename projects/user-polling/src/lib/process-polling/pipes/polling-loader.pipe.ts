import {Pipe, PipeTransform} from '@angular/core';

import {POLLING_STATUSES, PollingState} from '../models';

@Pipe({
  name: 'pollingLoader',
  standalone: true
})
export class PollingLoaderPipe implements PipeTransform {
  transform(pollingState: PollingState): boolean {
    return pollingState.status === POLLING_STATUSES.IN_PROGRESS;
  }
}
