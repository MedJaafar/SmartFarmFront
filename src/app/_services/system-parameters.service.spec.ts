import { TestBed } from '@angular/core/testing';

import { SystemParametersService } from './system-parameters.service';

describe('SystemParametersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SystemParametersService = TestBed.get(SystemParametersService);
    expect(service).toBeTruthy();
  });
});
