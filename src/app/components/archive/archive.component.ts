
import { Component, OnInit, Input, Output,EventEmitter, OnDestroy } from '@angular/core';
import { HttpService } from '../../core/service/http/http.service';
import { GeneralService} from '../../core/service/data/general.service';
import { MatSnackBar } from '@angular/material';
import { NotesComponent } from '../notes/notes.component';
import{ Note } from '../../core/model/note'
import { NoteService } from 'src/app/core/service/note-service/note.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-archive',
    templateUrl: './archive.component.html',
    styleUrls: ['./archive.component.scss']
  })
 
  export class ArchiveComponent implements OnInit,OnDestroy {
    destroy$: Subject<boolean> = new Subject<boolean>();
    public array:Note[]=[]
   
  constructor(private httpService: HttpService,
    private noteService:NoteService) { }

  ngOnInit() {
    this.myFunc();
  }
     /**
     * @description  API for getting the Archive notes
     */
  myFunc() {
    var token = localStorage.getItem('token');
   
    this.noteService.getArchiveNotes()
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      
      this.array = [];
      for (var i = res['data']['data'].length - 1; i > 0; i--) {
        this.array.push(res['data']['data'][i]);
      }
    }, error => {
      console.log(error);
    })
  }
     /**
     * @description Event emmitor for Archive
     */
  get(event) {
    if (event) {
      this.myFunc();
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
  }