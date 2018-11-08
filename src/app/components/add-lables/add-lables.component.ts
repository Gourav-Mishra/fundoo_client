import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/service/http/http.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-add-lables',
  templateUrl: './add-lables.component.html',
  styleUrls: ['./add-lables.component.css']
})
export class AddLablesComponent implements OnInit {
  notes = []
  

  constructor(private httpservice: HttpService) { }

  ngOnInit() {
   this.getLabel();
  }
  getLabel(){
    var token = localStorage.getItem('token');
    this.httpservice.httpGetNotes('noteLabels/getNoteLabelList', token).subscribe(res => {
      console.log("labels= ",res);
      this.notes = [];
      // this.notes = (res['data'].details);
      for(var i=0;i<res['data'].details.length;i++){
        if(res['data']['details'][i].isDeleted==false){
          this.notes.push(res['data']['details'][i])
        }
      }
    }, error => {
      console.log(error);
    })
  }
  id = localStorage.getItem('userId')
  token = localStorage.getItem('token')
  addLabel() {
    
    
    if(!this.notes.some((result)=>result.label==document.getElementById('label1').innerHTML)){
      console.log(this.id);
      this.httpservice.httpPostLable('noteLabels',
        {
          "label": document.getElementById('label1').innerHTML,
          "isDeleted": false,
          "userId": this.id
        }, this.token).subscribe(
          (data) => {
            console.log("POST Request is successfull ", data);
            // console.log(data);
          },
          error => {
            console.log("Error", error);
          })
  
    }
    else{
      var message="lable Exist"
    alert(message);
      
    }
     }
    deleteLabel(id){
      this.httpservice.labelDeleteService("noteLabels/"+id+"/deleteNoteLabel").subscribe(res=>{
        this.getLabel()
      },error=>{

      })

    }
}
