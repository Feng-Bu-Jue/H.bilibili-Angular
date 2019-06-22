import { TestBed } from '@angular/core/testing';

import { NgxWaterfallService } from './ngx-waterfall.service';

describe('NgxWaterfallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxWaterfallService = TestBed.get(NgxWaterfallService);
    expect(service).toBeTruthy();
  });
});
