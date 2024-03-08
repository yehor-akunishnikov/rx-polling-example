import {inject, Injectable} from '@angular/core';

import {catchError, map, Observable, of, startWith, Subject, switchMap, takeUntil, throwError} from 'rxjs';

import {UserDataRestService, PollingProgress, InitPayload} from 'data-layers';
import {POLLING_STATUSES, PollingResult} from '../models';

@Injectable()
export class UserDataPollingService {
  private restService: UserDataRestService = inject(UserDataRestService);
  private destroy: Subject<void> = new Subject();

  public processUserData(initPayload: InitPayload): Observable<PollingResult> {
    const pollingObservable$ = this.init(initPayload).pipe(
      switchMap(() => this.poll().pipe(
        switchMap(() => this.obtainResult()),
      )),
      startWith({status: POLLING_STATUSES.IN_PROGRESS}),
    );

    return pollingObservable$.pipe(
      catchError(e => of(e)),
      takeUntil(this.destroy),
    );
  }

  public stopProcessing(): void {
    this.destroy.next();
  }

  private handlePollingError(errorMessage: string): PollingResult {
    return {
      status: POLLING_STATUSES.FAILED,
      error: errorMessage
    };
  }

  private init(initPayload: InitPayload): Observable<void> {
    return this.restService.initPolling(initPayload).pipe(
      catchError(() => throwError(() => this.handlePollingError('Failed to init polling'))),
    );
  }

  private poll(): Observable<PollingProgress> {
    return this.restService.getPollingProgress().pipe(
      catchError(() => throwError(() => this.handlePollingError('Error during polling process'))),
      switchMap((progress) => {
        if (progress.status === 'FAILED') {
          return throwError(() => this.handlePollingError('Error during polling process'));
        }

        return progress.status === 'DONE' ? of(progress) : this.poll();
      }),
    );
  }

  private obtainResult(): Observable<PollingResult> {
    return this.restService.obtainTheResult().pipe(
      catchError(() => throwError(() => this.handlePollingError('Failed to obtain polling result'))),
      map((response) => ({
        data: response,
        status: POLLING_STATUSES.SUCCEEDED,
      })),
    );
  }
}
