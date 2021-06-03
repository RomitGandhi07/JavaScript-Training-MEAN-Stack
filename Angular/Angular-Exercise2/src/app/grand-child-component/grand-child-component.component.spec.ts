import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrandChildComponentComponent } from './grand-child-component.component';

describe('GrandChildComponentComponent', () => {
  let component: GrandChildComponentComponent;
  let fixture: ComponentFixture<GrandChildComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrandChildComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrandChildComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
