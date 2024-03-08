import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {InitPayload, PollingProgress, UserData} from '../models';

@Injectable({ providedIn: 'root' })
export class UserDataRestService {
  public apiUrl = '/api/user-processing';

  private http = inject(HttpClient);

  public initPolling(initPayload: InitPayload): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/init`, initPayload);
  }

  public getPollingProgress(): Observable<PollingProgress> {
    return this.http.get<PollingProgress>(`${this.apiUrl}/progress`);
  }

  public obtainTheResult(): Observable<UserData> {
    return this.http.get<UserData>(`${this.apiUrl}/result`);
  }
}
