import { TestBed } from '@angular/core/testing';

import { UserDataRestService } from './user-data-rest.service';

describe('UserDataRestService', () => {
  let service: UserDataRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
