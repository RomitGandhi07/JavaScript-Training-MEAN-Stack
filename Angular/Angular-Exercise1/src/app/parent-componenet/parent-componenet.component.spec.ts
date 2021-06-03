import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentComponenetComponent } from './parent-componenet.component';

describe('ParentComponenetComponent', () => {
  let component: ParentComponenetComponent;
  let fixture: ComponentFixture<ParentComponenetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentComponenetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentComponenetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
