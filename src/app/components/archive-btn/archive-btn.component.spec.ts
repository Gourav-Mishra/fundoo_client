import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveBtnComponent } from './archive-btn.component';

describe('ArchiveBtnComponent', () => {
  let component: ArchiveBtnComponent;
  let fixture: ComponentFixture<ArchiveBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
