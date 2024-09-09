import { TestBed } from '@angular/core/testing';

import { CatalogoUnicoService } from './catalogo-unico.service';

describe('CatalogoUnicoService', () => {
  let service: CatalogoUnicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogoUnicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
