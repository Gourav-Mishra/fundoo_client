import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotComponent } from './forgot.component';

describe('ForgotComponent', () => {
  let component: ForgotComponent;
  let fixture: ComponentFixture<ForgotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
//   login(show){
  //     if(!show){
  //   this.records = this.httpService.httpPost('user/login', this.body)
  // .subscribe(result => {
  // console.log("post= ", result);
  // for (let key in result) {
  // if (result.hasOwnProperty(key)) {
  // this.users.push(result[key]);
  // }
  // }
  // console.log(this.users);
  // }
