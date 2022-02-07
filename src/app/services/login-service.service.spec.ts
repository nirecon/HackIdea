import { TestBed } from '@angular/core/testing';

import { LoginServices } from './login-service.service';

describe('LoginServiceService', () => {
  let service: LoginServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
