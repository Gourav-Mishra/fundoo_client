import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormControl } from '@angular/forms';
import { Router , Params } from '@angular/router'
import { HttpService} from '../../core/service/http/http.service'
import { MatSnackBar} from '@angular/material'
import { ActivatedRoute} from '@angular/router'


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  recoveryForm: FormGroup;


  constructor(private router:Router,
    private httpService: HttpService,
    private snackBar : MatSnackBar,
    private activatedRoute: ActivatedRoute,

    ) { }
body={
  "email":""
}
records={};

  ngOnInit() {
    this.recoveryForm=new FormGroup({
      'email':new FormControl('',[Validators.required])
    });
   
   }
   recovery(){
    
      this.records=this.httpService.httpPost('user/reset',this.body).subscribe(result=>{
        console.log(result);
        this.snackBar.open("Email Sent","Sucess",{
          duration:3000,
        });
      },error=>{
        this.snackBar.open('Email Sent ','failed',{
          duration:5000,
        })

      })
     
   }

}
