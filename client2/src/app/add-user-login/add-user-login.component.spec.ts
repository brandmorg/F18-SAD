import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserLoginComponent } from './add-user-login.component';

describe('AddUserLoginComponent', () => {
  let component: AddUserLoginComponent;
  let fixture: ComponentFixture<AddUserLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
