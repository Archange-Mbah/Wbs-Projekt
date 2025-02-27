import { TestBed } from '@angular/core/testing';

import { NotebookService } from './notebooks.service';

describe('NotebooksService', () => {
  let service: NotebookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotebookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
