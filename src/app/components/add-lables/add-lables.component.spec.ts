import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLablesComponent } from './add-lables.component';

describe('AddLablesComponent', () => {
  let component: AddLablesComponent;
  let fixture: ComponentFixture<AddLablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
