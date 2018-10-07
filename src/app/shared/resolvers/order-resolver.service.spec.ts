import { TestBed, inject } from '@angular/core/testing';

import { OrderResolverService } from './order-resolver.service';

describe('OrderResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderResolverService]
    });
  });

  it('should be created', inject([OrderResolverService], (service: OrderResolverService) => {
    expect(service).toBeTruthy();
  }));
});
