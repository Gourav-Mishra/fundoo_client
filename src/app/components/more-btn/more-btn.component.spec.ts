import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreBtnComponent } from './more-btn.component';

describe('MoreBtnComponent', () => {
  let component: MoreBtnComponent;
  let fixture: ComponentFixture<MoreBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
