import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCartItemsComponent } from './total-cart-items.component';

describe('TotalCartItemsComponent', () => {
  let component: TotalCartItemsComponent;
  let fixture: ComponentFixture<TotalCartItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalCartItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalCartItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
