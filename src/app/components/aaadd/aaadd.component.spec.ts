import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AaaddComponent } from './aaadd.component';

describe('AaaddComponent', () => {
  let component: AaaddComponent;
  let fixture: ComponentFixture<AaaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AaaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AaaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
