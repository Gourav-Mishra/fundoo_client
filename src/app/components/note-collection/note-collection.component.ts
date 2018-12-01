import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { HttpService } from '../../core/service/http/http.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopupComponent } from '../popup/popup.component';
import { GeneralService } from 'src/app/core/service/data/general.service';
import { NoteService } from 'src/app/core/service/note-service/note.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CollaboratorspopComponent } from '../collaboratorspop/collaboratorspop.component';


@Component({
  selector: 'app-note-collection',
  templateUrl: './note-collection.component.html',
  styleUrls: ['./note-collection.component.scss']
})
export class NoteCollectionComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  records = {};
  notes = [];
  interval;
  labelBody = {};
  public modifiedCheckList;
  @Input() notesArray;
  @Input() searchNote;
  @Output() deleteParent = new EventEmitter();
  @Output() changeColorAgain = new EventEmitter();
  @Output() unArchiveParent = new EventEmitter();
  @Output() addEntry = new EventEmitter();
  

  constructor(private httpService: HttpService, public dialog: MatDialog,
    private data: GeneralService,
    public noteService: NoteService
  ) { }


  ngOnInit() {
    this.viewCard();
    
  }
  toggle = false;
  viewCard() {
    this.data.currentMessage
    .pipe(takeUntil(this.destroy$))
    .subscribe(message => {
      this.toggle = message;
    })
  }
  deleteDone($event) {
    this.deleteParent.emit();
  }
  changeColor($event) {
    this.changeColorAgain.emit();
  }
  openDialog(notes): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      maxWidth:'auto',
      width:'500px',
      data: notes

    });

    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      this.deleteParent.emit({

      })
    });
  }

  removeLabel(id, labelId) {
    this.labelBody = {
      "noteId": id,
      "lableId": labelId
    }
    this.noteService.postAddLabelnotesRemove(id ,labelId , this.labelBody)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      
      this.deleteParent.emit();
    }, error => {
    

    })

  }
  public reminderBody={}
  public token=localStorage.getItem('token')
  removeReminder(id){
    this.reminderBody={
      "noteIdList":[id]
    }
    this.noteService.postRemoveReminders(this.reminderBody)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result=>{
      this.deleteParent.emit({

      })
    })


  }
  addReminder($event){
    this.deleteParent.emit({

    })

  }

unArchive(event){
this.unArchiveParent.emit(event)
}
archiveParent(event){
  this.deleteParent.emit({

  })
}
checkBox(checkList, note) {

  if (checkList.status == "open") {
    checkList.status = "close"
  }
  else {
    checkList.status = "open"
  }

  this.modifiedCheckList = checkList;
  this.updatelist(note.id);
}
updatelist(id) {
  var apiData = {
    "itemName": this.modifiedCheckList.itemName,
    "status": this.modifiedCheckList.status
  }
  var url = "notes/" + id + "/checklist/" + this.modifiedCheckList.id + "/update";
  this.noteService.postUpdateChecklist(url, JSON.stringify(apiData), localStorage.getItem('token'))
  .pipe(takeUntil(this.destroy$))
  .subscribe(response => {
  })
}

public todayDate= new Date();
public tomorrowDate= new Date(this.todayDate.getFullYear(),this.todayDate.getMonth(), (this.todayDate.getDate()+1))
public currDate= new Date(); 
checkReminder(date){
var showTime=new Date(date).getTime();
var currTime=this.currDate.getTime();
if(showTime<currTime){
return true
}else return false
}
ngOnDestroy() {
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}
addColaboratorEvent(event){
  if(event){
    this.addEntry.emit({})
  }

}
openCollaborator(note){
  const dialogRef = this.dialog.open(CollaboratorspopComponent, {
    maxWidth:'auto',
    width:'500px',
    data: note

  });
}
}

