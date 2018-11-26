import { Component, OnInit,Output,Input,EventEmitter, OnDestroy} from '@angular/core';
import { HttpService } from 'src/app/core/service/http/http.service';
import { NoteService } from 'src/app/core/service/note-service/note.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();



  @Input() arrayPin
  body={}
  @Output() emitter = new EventEmitter();
  constructor(private httpService:HttpService,
    private noteService:NoteService) { }
  token=localStorage.getItem('token')
  ngOnInit() 
  {

  }

  pin()
  {
  this.body={
    'noteIdList':[this.arrayPin.id],
    'isPined':true
  }
  this.noteService.postPinUnpin(this.body)
  .pipe(takeUntil(this.destroy$))
  .subscribe(data=>{
    
      this.emitter.emit({
      })
  })
  error=> {}
}

Unpin()
{
this.body={
  'noteIdList':[this.arrayPin.id],
  'isPined':false
}
this.noteService.postPinUnpin(this.body)
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{
  
    this.emitter.emit({
    })
})
error=> {}
}
ngOnDestroy() {
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}

}
