import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";



describe('SignupComponent', () => {
beforeEach(()=>{
  TestBed.configureTestingModule({
    declarations:[
      SignupComponent
    ],
  })
})

  it('should create',async () => {
    let fixture=TestBed.createComponent(SignupComponent)
    let app=fixture.debugElement.componentInstance
    expect(app).toBeTruthy();
  });
//   it('form should be invalid', async(()=>{
//     component.regform.controls['email'].setValue('');
//     component.regform.controls['email'].setValue('@bb.AA.com');
//     component.regform.controls['email'].setValue('AA.23@bbb.com');

//     component.regform.controls['password'].setValue('');
//     component.regform.controls['password'].setValue('ak');
//     component.regform.controls['password'].setValue('aaaaaaaaaaaaaaaaaaa');

//     component.regform.controls['firstName'].setValue('');
//     component.regform.controls['firstName'].setValue('ku');

//     component.regform.controls['lastName'].setValue('');
//     component.regform.controls['lastName'].setValue('hj');

//     component.regform.controls['phoneNumber'].setValue('');
//     component.regform.controls['phoneNumber'].setValue('@678');
//     component.regform.controls['phoneNumber'].setValue('67@#8999999');
//     component.regform.controls['phoneNumber'].setValue('111111');
//     component.regform.controls['phoneNumber'].setValue('78987678@#');
    
//     component.regform.controls['service'].setValue('');
//     expect(component.regform.valid).toBeFalsy();
    
// }))
// it('form should be valid', async(()=>{
//   component.regform.controls['firstName'].setValue('gourav');
//   component.regform.controls['firstName'].setValue('vjgvhjvhjvhjvhjvhjvhjvjhvjhvjhvjh');
//   component.regform.controls['lastName'].setValue('kumar');
//   component.regform.controls['lastName'].setValue('fyuyfyufuyfuyfuyfyufjfuyfuyfuyduyfuyfu');
//   component.regform.controls['email'].setValue('aass@bbbb.com');
//   component.regform.controls['password'].setValue('akm123');
//   component.regform.controls['phoneNumber'].setValue('11111111111');
//   expect(component.regform.valid).toBeTruthy();
// }))
// it('form invalid when empty', () => {
//   expect(component.regform.valid).toBeFalsy();
// });
// it('should add ',()=>{
//   expect(1 + 1).toEqual(2);
// })
});
