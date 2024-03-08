import {inject, Injectable, OnDestroy} from '@angular/core';

import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  tap,
  throwError
} from 'rxjs';

import {InitPayload, PollingProgress, UserDataRestService} from 'data-layers';
import {POLLING_STATUSES, PollingResult} from '../models';

@Injectable()
export class UserDataPollingService implements OnDestroy {
  private restService: UserDataRestService = inject(UserDataRestService);

  private destroy: Subject<void> = new Subject();
  private state = new BehaviorSubject<PollingResult>({ status: POLLING_STATUSES.NOT_STARTED });

  public pollingResult$: Observable<PollingResult> = this.state.asObservable();

  public ngOnDestroy(): void {
    this.destroy.next();
  }

  public processUserData(initPayload: InitPayload): void {
    const pollingObservable$ = this.init(initPayload).pipe(
      switchMap(() => this.poll().pipe(
        switchMap(() => this.obtainResult()),
      )),
    );

    pollingObservable$.pipe(
      catchError(e => of(e)),
      startWith({status: POLLING_STATUSES.IN_PROGRESS}),
      tap(pollingResult => this.state.next(pollingResult)),
      takeUntil(this.destroy),
    ).subscribe();
  }

  public stopProcessing(): void {
    this.destroy.next();
    this.state.next({ status: POLLING_STATUSES.NOT_STARTED });
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
