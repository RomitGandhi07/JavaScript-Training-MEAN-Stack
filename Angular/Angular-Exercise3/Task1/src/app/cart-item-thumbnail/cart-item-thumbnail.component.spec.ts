import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemThumbnailComponent } from './cart-item-thumbnail.component';

describe('CartItemThumbnailComponent', () => {
  let component: CartItemThumbnailComponent;
  let fixture: ComponentFixture<CartItemThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartItemThumbnailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
