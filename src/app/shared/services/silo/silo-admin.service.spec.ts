import { TestBed } from '@angular/core/testing';

import { SiloAdminService } from './silo-admin.service';

describe('SiloAdminService', () => {
  let service: SiloAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiloAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
