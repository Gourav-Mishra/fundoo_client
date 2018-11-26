import { Component, OnInit,Input,EventEmitter,Output, OnDestroy } from '@angular/core';
import { HttpService} from '../../core/service/http/http.service'
import { MatSnackBar} from '@angular/material'
import { NoteService } from 'src/app/core/service/note-service/note.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-archive-btn',
  templateUrl: './archive-btn.component.html',
  styleUrls: ['./archive-btn.component.scss']
})
export class ArchiveBtnComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  token = localStorage.getItem('token')
  constructor(private httpService: HttpService,
     public matSnackBar:MatSnackBar,
     public noteService:NoteService) { }
  @Input() archive;
  @Output() archiveNote = new EventEmitter
  @Output() unArchiveNote = new EventEmitter<boolean>()
  body;

  ngOnInit() {
  }
     /**  
     * @description  Api For the archive notes
     */
  archiveNotes() {
    this.body = {
      "isArchived": true,
      "noteIdList": [this.archive.id]
    }
    this.noteService.postArchiveNotes( this.body)
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      console.log(res);
      this.matSnackBar.open("Archived",'Successfully',{
        duration: 3000,
      });
      this.archiveNote.emit();
    }, error => {
    })
  }
     /**  
     * @description  Api For the unArchive notes
     */

  unArchiveNotes() {
    this.body = {
      "isArchived": false,
      "noteIdList": [this.archive.id]
    }
    this.noteService.postArchiveNotes( this.body)
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      this.matSnackBar.open("UnArchived",'Successfully',{
        duration: 3000,
      });
      console.log(res);
      this.unArchiveNote.emit(true);
    }, error => {
    })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
  }