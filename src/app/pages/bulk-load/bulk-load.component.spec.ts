import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkLoadComponent } from './bulk-load.component';

describe('BulkLoadComponent', () => {
  let component: BulkLoadComponent;
  let fixture: ComponentFixture<BulkLoadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkLoadComponent]
    });
    fixture = TestBed.createComponent(BulkLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
