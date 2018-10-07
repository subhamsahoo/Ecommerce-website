import { TestBed, inject } from '@angular/core/testing';

import { ContentTestService } from './content-test.service';

describe('ContentTestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentTestService]
    });
  });

  it('should be created', inject([ContentTestService], (service: ContentTestService) => {
    expect(service).toBeTruthy();
  }));
});
