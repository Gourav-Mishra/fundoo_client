// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { QuestionAndAnswerComponent } from './question-and-answer.component';

// describe('QuestionAndAnswerComponent', () => {
//   let component: QuestionAndAnswerComponent;
//   let fixture: ComponentFixture<QuestionAndAnswerComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ QuestionAndAnswerComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(QuestionAndAnswerComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });


//   it('should rate when  btn is clicked', () => {
//     expect(component.ratingCheck.length==0).toBeTruthy();
//     expect(component.ratingCheck.length==6).toBeFalsy();
//     expect(component.ratingCheck.length==16).toBeFalsy();
//     expect(component.ratingCheck.length==26).toBeFalsy();
//   });

//   it('should rate when  btn is clicked', () => {
//     expect(component.like.length==0).toBeTruthy();
//     expect(component.like.length==10).toBeFalsy();
//     expect(component.like.length==20).toBeFalsy();
//   });

//   it('should return true when there is a like by user', () => {
//     let likeArray = [{
//       like : true,
//       userId:localStorage.getItem('userId')
//     }]
//     let question = {
//       like : likeArray
//     }
//     expect(component.like(question)).toBeTruthy();
//   });

//   it('should return false when there is a no like', () => {
//     let like = [{
//       like : true,
//       userId:""
//     }]
//     let question = {
//       like : like
//     }
//     expect(component.like(question)).toBeFalsy();
//   });
  
//   it('should return true when there is a rating given', () => {
//     let rateArray = [{
//       rate : 4,
//       userId:localStorage.getItem('userId')
//     }]
//     let question = {
//       rate : rateArray
//     }
//     expect(component.ratingCheck(question)).toBeTruthy();
//   });

//   it('should return false when there is a no rating given by user', () => {
//     let rate = [{
//       rate : 5,
//       userId:""
//     }]
//     let question = {
//       rate : rate
//     }
//     expect(component.ratingCheck(question)).toBeFalsy();
//   });
// });

