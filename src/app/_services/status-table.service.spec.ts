import { TestBed } from '@angular/core/testing';

import { StatusTableService } from './status-table.service';

describe('StatusTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatusTableService = TestBed.get(StatusTableService);
    expect(service).toBeTruthy();
  });
});
