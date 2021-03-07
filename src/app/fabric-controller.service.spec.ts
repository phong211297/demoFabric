import { TestBed } from '@angular/core/testing';

import { FabricControllerService } from './fabric-controller.service';

describe('FabricControllerService', () => {
  let service: FabricControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FabricControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
