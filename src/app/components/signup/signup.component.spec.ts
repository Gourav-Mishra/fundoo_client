// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { SignupComponent } from './signup.component';
// import { DebugElement } from '@angular/core';
// import { BrowserModule, By } from "@angular/platform-browser";
// import { FormsModule, ReactiveFormsModule } from "@angular/forms";



// describe('SignupComponent', () => {
// beforeEach(()=>{
//   TestBed.configureTestingModule({
//     declarations:[
//       SignupComponent
//     ],
//   })
// })

//   it('should create',async () => {
//     let fixture=TestBed.createComponent(SignupComponent)
//     let app=fixture.debugElement.componentInstance
//     expect(app).toBeTruthy();
//   });
//   it('form should be invalid', async(()=>{
//     component.regform.controls['email'].setValue('');
//     component.regform.controls['email'].setValue('@bbas.AAas.com');
//     component.regform.controls['email'].setValue('AAas.23@basbb.com');

//     component.regform.controls['password'].setValue('');
//     component.regform.controls['password'].setValue('rohan');
//     component.regform.controls['password'].setValue('asdsadasd');
// s
//     component.regform.controls['firstName'].setValue('');
//     component.regform.controls['firstName'].setValue('kasdsadasdu');

//     component.regform.controls['lastName'].setValue('');
//     component.regform.controls['lastName'].setValue('hasdasdj');

//     component.regform.controls['phoneNumber'].setValue('');
//     component.regform.controls['phoneNumber'].setValue('@6585478');
//     component.regform.controls['phoneNumber'].setValue('67@#896565654646599999');
//     component.regform.controls['phoneNumber'].setValue('1156465646541111');
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
//   component.regform.controls['password'].setValue('sadasd');
//   component.regform.controls['phoneNumber'].setValue('55525665255');
//   expect(component.regform.valid).toBeTruthy();
// }))
// it('form invalid when empty', () => {
//   expect(component.regform.valid).toBeFalsy();
// });
// it('should add ',()=>{
//   expect(1 + 1).toEqual(2);
// })
// });
