import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAddressComponent } from './item-address.component';

describe('ItemAddressComponent', () => {
  let component: ItemAddressComponent;
  let fixture: ComponentFixture<ItemAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemAddressComponent]
    });
    fixture = TestBed.createComponent(ItemAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
