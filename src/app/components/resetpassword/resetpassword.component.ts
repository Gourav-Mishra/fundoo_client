import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, Params } from '@angular/router'
import { HttpService } from '../../core/service/http/http.service'
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit{
 
  resetForm: FormGroup

  constructor(private router: Router,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
  ) { }
  body = {
    "newPassword": ""
  }
  records = {}
  token;

  ngOnInit() {
  
    this.resetForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(2)])


    });
    this.activatedRoute.params
    
    .subscribe((params: Params) => {
      this.token = params['id'];
      console.log(this.token);


    });


  }
  reset() {
    localStorage.setItem('token',this.token)
    this.records = this.httpService.httpPasswordUpdate('user/reset-password', this.token, this.body)
   
    .subscribe(result => {
      this.snackBar.open('password updation', "Sucess", {
        duration: 3000,
      });
    }, error => {
      this.snackBar.open('Password Updation ', 'Failed', {
        duration: 5000,
      });

    });
  }


}


