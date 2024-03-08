import { TestBed } from '@angular/core/testing';

import { UserDataPollingService } from './user-data-polling.service';

describe('UserDataPollingService', () => {
  let service: UserDataPollingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataPollingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
