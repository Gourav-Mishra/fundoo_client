import { Component, OnInit, Input,Output,EventEmitter, OnDestroy } from '@angular/core';
import { HttpService } from '../../core/service/http/http.service'
import { NoteService } from 'src/app/core/service/note-service/note.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})

export class TrashComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  records = {};
  notes = [];
  delete={};
  

  body={
    "isDeleted":true,
    "noteIdList":[]
  }
  @Input() noteDetails;

 

  constructor(private httpService: HttpService,
    private noteService:NoteService) { }
  @Input() notesArray;
  @Output() deleteForever=new EventEmitter()
  ngOnInit() {
    this.getDelNotes();
    
    
  }
  getDelNotes() {

    var token = localStorage.getItem('token');
    this.records = this.noteService.getTrashNoteList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      
      for (var i = result['data']['data'].length - 1; i > 0; i--) {

        this.notes.push(result['data']['data'][i])

      }
     
      this.deleteForever.emit()

    }, error => {
 
    });
  }
  delForever(id){
    this.body={
      "isDeleted": false,
      "noteIdList": [id]
      }
       var token=localStorage.getItem('token');
    this.noteService.postDeleteForeverNotes(this.body)
    .pipe(takeUntil(this.destroy$))
    .subscribe(res=>{
    
      this.deleteForever.emit();
      
    },error=>{
   

    })

    } 
    restore(id){
      this.body={
        "isDeleted":false,
        "noteIdList":[id]
      }
      var token=localStorage.getItem('token');
      this.noteService.postTrashNotes(this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res=>{
   
        this.deleteForever.emit();

      },error=>{
     
      })

    }
    ngOnDestroy() {
      this.destroy$.next(true);
      // Now let's also unsubscribe from the subject itself:
      this.destroy$.unsubscribe();
    }
    
  }


