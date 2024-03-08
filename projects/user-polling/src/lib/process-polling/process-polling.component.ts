import {ChangeDetectionStrategy, Component, inject, Input, OnDestroy} from '@angular/core';
import {AsyncPipe, JsonPipe, NgIf} from '@angular/common';

import {delay, Observable, of, startWith} from 'rxjs';

import {InitPayload} from 'data-layers';

import {DataAlertComponent} from './components/data-alert/data-alert.component';
import {UserDataPollingService} from './services/user-data-polling.service';
import {LoadingComponent} from './components/loading/loading.component';
import {PollingLoaderPipe} from './pipes/polling-loader.pipe';
import {POLLING_STATUSES, PollingResult} from './models';

@Component({
  selector: 'ui-process-polling',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
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
export class ProcessPollingComponent implements OnDestroy {
  @Input() initPayload: InitPayload;

  public userDataPollingService: UserDataPollingService = inject(UserDataPollingService);

  public pollingResult$: Observable<PollingResult> = of({
    status: POLLING_STATUSES.NOT_STARTED,
  });

  public ngOnDestroy(): void {
    this.userDataPollingService.stopProcessing();
  }

  public startProcessing(): void {
    this.pollingResult$ = this.userDataPollingService.processUserData(this.initPayload).pipe(
      delay(200),
      startWith({status: POLLING_STATUSES.NOT_STARTED}),
    );
  }

  public stopProcessing(): void {
    this.userDataPollingService.stopProcessing();
    this.pollingResult$ = of({
      status: POLLING_STATUSES.NOT_STARTED,
    });
  }
}
