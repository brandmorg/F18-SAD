import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualJournalComponent } from './individual-journal.component';

describe('IndividualJournalComponent', () => {
  let component: IndividualJournalComponent;
  let fixture: ComponentFixture<IndividualJournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualJournalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
