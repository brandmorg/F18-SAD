import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalizeComponent } from './journalize.component';

describe('JournalizeComponent', () => {
  let component: JournalizeComponent;
  let fixture: ComponentFixture<JournalizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
