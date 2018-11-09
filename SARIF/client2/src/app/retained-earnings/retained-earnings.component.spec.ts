import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetainedEarningsComponent } from './retained-earnings.component';

describe('RetainedEarningsComponent', () => {
  let component: RetainedEarningsComponent;
  let fixture: ComponentFixture<RetainedEarningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetainedEarningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetainedEarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
