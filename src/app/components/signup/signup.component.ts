import { Component, OnInit } from '@angular/core';
import { HttpService} from '../../core/service/http/http.service'
import { Router } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';

import{passwordValidator} from '../../core/utils/passwordValidator.util';
import {MatSnackBar} from '@angular/material';
 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hide=true;
  regform:FormGroup;
  
  
 
constructor(private router :Router,
  private httpService:HttpService,
  public matsnacbar:MatSnackBar,
  ){}
  
   service:any;
   register:any;
  body={
    "firstName": '',
    "lastName": '',
    "email": "",
    "emailVerified":true,
    "phoneNumber":'',
    "service": this.service,
    "createdDate": new Date(),
    "modifiedDate": new Date,
    "password": ""
   }
records={};
cards=[];
  ngOnInit() {
    this.regform=new FormGroup({
      'firstName':new FormControl('' , [Validators.required, Validators.minLength(1)]),
      'lastName':new FormControl('' , [Validators.required, Validators.minLength(1)]),     
      'email':new FormControl('' , [Validators.required]),
      'phoneNumber':new FormControl('' , [Validators.required, Validators.minLength(10)]),
      'password':new FormControl('' , [Validators.required, Validators.minLength(3)]),
      'confirmpassword':new FormControl('' , [Validators.required,passwordValidator.matchWithValidator('password')])
    })

    this.records=this.httpService.httpGet('user/service').subscribe(result =>{
      var data=result['data'];
      for(var i=0;i<data.data.length;i++)
      {
        data.data[i].select=false;
        this .cards.push(data.data[i])
      }


    });
    this.records=this.httpService.httpGet('user').subscribe(result=>{
      console.log("Registered Users=",result)
    });
    
  }
  respond(card)
  {
    this.service=card.name;
    card.select=!card.select;
    for(var i=0;i<this.cards.length;i++)
    {
      if(card.name==this.cards[i].name)
       {continue}
       this.cards[i].select=false;
    }
  }

  submit()
  {
    this.register={
      "firstName": this.body.firstName,
      "lastName":this.body.lastName,
      
      "email": this.body.email,
      "emailVerified":true,
      "phoneNumber":this.body.phoneNumber,
       "service": this.service,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "password": this.body.password
    }
      

  

    this.records=this.httpService.httpPost('user/userSignUp',this.register).subscribe(result=>{
      
     
        this.matsnacbar.open("registration","successful", {
          duration: 5000,
        })
    }),error=>{
      this.matsnacbar.open("registration","failed", {
        duration: 5000,
      })

    }
    
  }




}
