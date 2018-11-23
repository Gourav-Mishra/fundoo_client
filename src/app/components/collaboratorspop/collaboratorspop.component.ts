import { Component, OnInit, Inject } from '@angular/core';
import{ environment} from '../../../environments/environment'
import { HttpService} from '../../core/service/http/http.service'
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogData } from '../popup/popup.component';

@Component({
  selector: 'app-collaboratorspop',
  templateUrl: './collaboratorspop.component.html',
  styleUrls: ['./collaboratorspop.component.scss']
})
export class CollaboratorspopComponent implements OnInit {

  constructor(private httpService: HttpService,
    public dialogRef: MatDialogRef<CollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
   ) { }
 public firstName;
 public email;
 public lastName;
 public image2=localStorage.getItem('imageUrl');
 public img=environment.profieUrl+this.image2; 
 private collaborator=[]
  ngOnInit() {
    this.firstName = localStorage.getItem('firstName');
    this.email = localStorage.getItem('email');
    this.lastName = localStorage.getItem('lastName');
    for(let i=0 ;i<this.data['collaborators'].length;i++){
      this.collaborator.push(this.data['collaborators'][i]);
    }
  }
 private body={
    "searchWord":''
  }
  private userList=[];
  searchUser(){
    this.httpService.httpPostUserList('user/searchUserList',this.body).subscribe(result=>{
      this.userList=result['data']['details']
    })

  }
  addColaborator(userDetails){
  
    let collaboratorBody={
      "firstName":userDetails.firstName,
      "lastName": userDetails.lastName,
      "email":userDetails.email,
      "userId":userDetails.userId
  }
  this.httpService.httpPostUserList('notes/'+this.data['id']+'/AddcollaboratorsNotes',collaboratorBody).subscribe(result=>{
this.collaborator.push(userDetails)
  })

  
}
deleteCollaborator(){
  
}



}
