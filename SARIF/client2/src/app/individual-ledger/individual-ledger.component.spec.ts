import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualLedgerComponent } from './individual-ledger.component';

describe('IndividualLedgerComponent', () => {
  let component: IndividualLedgerComponent;
  let fixture: ComponentFixture<IndividualLedgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualLedgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
