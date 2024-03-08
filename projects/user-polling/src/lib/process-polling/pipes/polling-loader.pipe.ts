import {Pipe, PipeTransform} from '@angular/core';

import {POLLING_STATUSES, PollingResult} from '../models';

@Pipe({
  name: 'pollingLoader',
  standalone: true
})
export class PollingLoaderPipe implements PipeTransform {

  transform(pollingResult: PollingResult): boolean {
    return pollingResult.status === POLLING_STATUSES.IN_PROGRESS;
  }
}
