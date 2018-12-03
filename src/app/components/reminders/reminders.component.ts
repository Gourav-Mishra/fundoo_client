import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { HttpService } from '../../core/service/http/http.service'
import { GeneralService } from "../../core/service/data/general.service"
import { EventEmitter } from 'protractor';
import { NoteService } from 'src/app/core/service/note-service/note.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(private httpService: HttpService,
    private data: GeneralService,
    private noteService: NoteService) { }

  ngOnInit() {
    this.getReminderList();
    this.viewCard()
  }
  public reminder = []
  private load=true;
  getReminderList() {
    var token = localStorage.getItem('token');
    this.noteService.getReminders()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {


      this.reminder = result['data'].data;
      this.reminder.sort(this.compare)
      this.load=false;



    })
  }
  toggle = false;
  viewCard() {
    this.data.currentMessage
    .pipe(takeUntil(this.destroy$))
    .subscribe(message => {
      this.toggle = message;
      this.load=false;
      
    })
  }
  compare(a, b) {
    a = new Date(a.reminder);
    b = new Date(b.reminder);
    if (a < b)
      return -1;
    if (a > b)
      return 1;
    return 0;
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}


