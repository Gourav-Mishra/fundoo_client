import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorspopComponent } from './collaboratorspop.component';

describe('CollaboratorspopComponent', () => {
  let component: CollaboratorspopComponent;
  let fixture: ComponentFixture<CollaboratorspopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratorspopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorspopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
