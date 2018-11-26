import { Component, OnInit,Input,Output,EventEmitter, OnDestroy} from '@angular/core';
import {  HttpService} from '../../core/service/http/http.service'
import { MatSnackBar } from '@angular/material';
import { NoteService } from 'src/app/core/service/note-service/note.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-more-btn',
  templateUrl: './more-btn.component.html',
  styleUrls: ['./more-btn.component.scss']
})

export class MoreBtnComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  title;
  note;
  id;
  notes=[];
  records={};
  labelBody={};
  body={
    "isDeleted":true,
    "noteIdList":[]
  }
  @Input() noteDetails;



  constructor(private httpService: HttpService,public snackBar: MatSnackBar,
    public noteService:NoteService) { }
  @Output() notesDelete=new EventEmitter();

  ngOnInit() {
    var token = localStorage.getItem('token');
    this.httpService.httpGetNotes('noteLabels/getNoteLabelList', token)
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      console.log("labels= ", res);
     
      // this.notes = (res['data'].details);
      for (var i = 0; i < res['data'].details.length; i++) {
        if (res['data']['details'][i].isDeleted == false) {
          this.notes.push(res['data']['details'][i])
        }
      }
      this.notes.sort(function(a, b){
        var nameA=a.label.toLowerCase(), nameB=b.label.toLowerCase()
        if (nameA < nameB) 
        return -1 
        if (nameA > nameB)
        return 1
        return 0 
        })   
        console.log(this.notes);
     
    }, error => {
    })
    console.log("noteslabels=>",this.notes);
    
    

  }
  delete()       {
    var token = localStorage.getItem('token');
    console.log("delete");
    
    this.body={
    "isDeleted": true,
    "noteIdList": [this.noteDetails.id]
    }
    this.records = this.httpService.httpDeleteNote('notes/trashNotes',this.body, token)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
    this.snackBar.open('Note deleted', 'Successfully', {
    duration: 3000,
    });
    this.notesDelete.emit();
    
    }, error => {
    this.snackBar.open('Note deletion', 'Failed', {
    duration: 3000,
    });
    });
    }
    addLabel(labelId){
      this.labelBody={
        "noteId":this.noteDetails.id,
        "lableId":labelId
      }
      this.noteService.postAddLabelnotes(this.noteDetails.id,labelId,{})
      .pipe(takeUntil(this.destroy$))
      .subscribe(result=>{
        console.log(result);
        this.notesDelete.emit();
      },error=>{
      })
    }
    ngOnDestroy() {
      this.destroy$.next(true);
      // Now let's also unsubscribe from the subject itself:
      this.destroy$.unsubscribe();
    }
    // removeLabel(labelId){
    //   this.labelBody={
    //     "noteId":this.noteDetails.id,
    //     "lableId":labelId
    //   }
    //   this.httpService.httpAddNote('notes/'+this.noteDetails.id+'/addLabelToNotes/'+labelId+'/remove',this.labelBody,localStorage.getItem('token')).subscribe(result=>{
    //     console.log(result);
    //   },error=>{
    //     console.log(error);
        
    //   })

    // }
    // selectCheck(labelOption){
    //   if (this.noteDetails.noteLabels.some((data) => data.label == labelOption.label)) {
    //   return true;
    //   }
    //   else {
  
    //    return false;
    // }
    // }

}
