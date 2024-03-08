import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';

import {InitPayload} from 'data-layers';

import {DataAlertComponent} from './components/data-alert/data-alert.component';
import {UserDataPollingService} from './services/user-data-polling.service';
import {LoadingComponent} from './components/loading/loading.component';
import {PollingLoaderPipe} from './pipes/polling-loader.pipe';
import {POLLING_STATUSES} from './models';

@Component({
  selector: 'ui-process-polling',
  standalone: true,
  imports: [
    AsyncPipe,
    LoadingComponent,
    NgIf,
    PollingLoaderPipe,
    DataAlertComponent
  ],
  providers: [
    UserDataPollingService,
  ],
  templateUrl: './process-polling.component.html',
  styleUrl: './process-polling.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessPollingComponent {
  @Input() initPayload: InitPayload;

  public userDataPollingService: UserDataPollingService = inject(UserDataPollingService);
  public POLLING_STATUSES = POLLING_STATUSES;
}
