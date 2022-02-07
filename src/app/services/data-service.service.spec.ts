import { TestBed } from '@angular/core/testing';

import { DataServices } from './data-service.service';

describe('DataServiceService', () => {
  let service: DataServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
