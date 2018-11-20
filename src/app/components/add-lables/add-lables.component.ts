import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/service/http/http.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import  { Note } from '../../core/model/note'


@Component({
  selector: 'app-add-lables',
  templateUrl: './add-lables.component.html',
  styleUrls: ['./add-lables.component.scss']
})
export class AddLablesComponent implements OnInit {
  private notes = [];
  private note:Note[]=[];
  

  constructor(private httpservice: HttpService) { }

  ngOnInit() {
   this.getLabel();
  }
  /**
   *   @description : Api call for Getting Label
   **/
  getLabel(){
    var token = localStorage.getItem('token');
    this.httpservice.httpGetNotes('noteLabels/getNoteLabelList', token).subscribe(res => {
      
      this.notes = [];
      var myData:Note[]=res['data']['details'];
      for(var i=0;i<myData.length;i++){
        if(myData[i].isDeleted==false){
          this.notes.push(myData[i])
        }
      }
    }, error => {
      
    })
  }
  id = localStorage.getItem('userId')
  token = localStorage.getItem('token')
  /**
   *   @description : Api call for Adding Label
   **/

  addLabel() {
    
    
    if(!this.notes.some((result)=>result.label==document.getElementById('label1').innerHTML)){
     
      this.httpservice.httpPostLable('noteLabels',
        {
          "label": document.getElementById('label1').innerHTML,
          "isDeleted": false,
          "userId": this.id
        }, this.token).subscribe(
          (data) => {
          },
          error => {
          })
  
    }
    else{
      var message="lable Exist"

    alert(message);
      
    }
     }
    
  /**
   *   @description : Api call for Deleting Label 
   **/
    deleteLabel(id){
      this.httpservice.labelDeleteService("noteLabels/"+id+"/deleteNoteLabel").subscribe(res=>{
        this.getLabel()
      },error=>{

      })

    }
}
