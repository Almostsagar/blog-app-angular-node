import { TestBed } from '@angular/core/testing';

import { LoginSerivesService } from './login-serives.service';

describe('LoginSerivesService', () => {
  let service: LoginSerivesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginSerivesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
