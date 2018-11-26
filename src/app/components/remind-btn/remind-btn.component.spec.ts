import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindBtnComponent } from './remind-btn.component';

describe('RemindBtnComponent', () => {
  let component: RemindBtnComponent;
  let fixture: ComponentFixture<RemindBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemindBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
