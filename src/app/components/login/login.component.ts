import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {FormGroup,Validators,FormControl} from '@angular/forms'
import { SlideInOutAnimation } from './animation';
import { HttpService} from '../../core/service/http/http.service'
import { MatSnackBar } from '@angular/material';
import { log } from 'util';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [SlideInOutAnimation]

})
export class LoginComponent implements OnInit {
  loginFormEmail :FormGroup;
  loginFormPassword : FormGroup;
  animationState = 'in';

  show = true;
  hide = true;
  records={};
  data:any;
  users=[];
  body={
    "email":"",
    "password":""
    };
    constructor(private router: Router,
      public httpService: HttpService,
      public snackbar:MatSnackBar

    ){}
     /**   
     * @description    The annimation of the sliding login page 
     */
  toggleShowDiv(divName: string) {
    this.show = !this.show;
    if (divName === 'divA') {
      
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
      
    }

  }
    /**   
     * @description    The validation dor the email and password .
     */

  ngOnInit() {
    this.loginFormEmail= new FormGroup({
      'email': new FormControl('',[Validators.required,Validators.minLength(9)])
    });
    this.loginFormPassword=new FormGroup({
      "password":new FormControl('',[Validators.required,Validators.minLength(3)])

    
    });



  }
     /**   
     * @description    Api hitting for the login 
     */
  login(){
    
    this.records=this.httpService.httpPost('user/login',this.body)
    .subscribe(result =>{
      console.log(result);
      this.snackbar.open('Login','Sucess',{
        duration:3000,
      });
      var token=result['id'];
      var firstName=result['firstName']
      var lastName=result['lastName']
      var createdAt=result['created']
      var email=result['email']
      var imageUrl=result['imageUrl']
      localStorage.setItem('token', token);
      localStorage.setItem('firstName',firstName);
      localStorage.setItem('lastName',lastName);
      localStorage.setItem('email',email);
      localStorage.setItem('imageUrl',imageUrl);

      localStorage.setItem('created',createdAt)
      localStorage.setItem('userId',result['userId'])

      this.router.navigate(['home']);
    },error=>{
      this.snackbar.open('Invalid Email / Passoword','login Failed',{
        duration:3000,
      })
    

    })

  }
  



}

