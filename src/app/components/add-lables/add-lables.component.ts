import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/core/service/http/http.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import  { Note } from '../../core/model/note'
import { NoteService } from 'src/app/core/service/note-service/note.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-add-lables',
  templateUrl: './add-lables.component.html',
  styleUrls: ['./add-lables.component.scss']
})
export class AddLablesComponent implements OnInit,OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();

  private notes = [];
  private note:Note[]=[];
  

  constructor(private httpservice: HttpService,public noteService:NoteService) { }

  ngOnInit() {
   this.getLabel();
  }
  /**
   *   @description : Api call for Getting Label
   **/
  getLabel(){
    var token = localStorage.getItem('token');
    this.noteService.getLabels()
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      
      this.notes = [];
      var myData:Note[]=res['data']['details'];
      for(var i=0;i<myData.length;i++){
        if(myData[i].isDeleted==false){
          this.notes.push(myData[i])
        }
      }
    })
  }
  id = localStorage.getItem('userId')
  token = localStorage.getItem('token')
  /**
   *   @description : Api call for Adding Label
   **/

  addLabel() {
    
    
    if(!this.notes.some((result)=>result.label==document.getElementById('label1').innerHTML)){
     
      this.noteService.postNoteLabels(
        {
          "label": document.getElementById('label1').innerHTML,
          "isDeleted": false,
          "userId": this.id
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe(
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
      this.noteService.deleteData(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res=>{
        this.getLabel()
      },error=>{
      })

    }
    ngOnDestroy() {
      this.destroy$.next(true);
      // Now let's also unsubscribe from the subject itself:
      this.destroy$.unsubscribe();
    }
}
