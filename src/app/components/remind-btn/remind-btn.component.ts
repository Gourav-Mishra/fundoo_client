import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remind-btn',
  templateUrl: './remind-btn.component.html',
  styleUrls: ['./remind-btn.component.css']
})
export class RemindBtnComponent implements OnInit {
  httpService: any;
  noteDetails: any;

  constructor() { }

  ngOnInit() {
  }

body={};
  
addRemToday(){
  // this.todayEvent.emit();
  var currentDate=new Date();
  this.body={
    "noteIdList": [this.noteDetails.id],
    "reminder": new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate(),8,0,0,0)
  }
  this.httpService.httpAddReminder('notes/addUpdateReminderNotes', localStorage.getItem('token'),this.body).subscribe((result)=>{
    console.log(result);
  })
}

addRemTomorrow(){
  // this.todayEvent.emit();
  var currentDate=new Date();
  this.body={
    "noteIdList": [this.noteDetails.id],
    "reminder": new Date(currentDate.getFullYear(),currentDate.getMonth(),(currentDate.getDate()+1),8,0,0,0)
  }
  this.httpService.httpAddReminder('notes/addUpdateReminderNotes', localStorage.getItem('token'),this.body).subscribe((result)=>{
    console.log(result);
  })
}

addRemNextWeek(){
  // this.todayEvent.emit();
  var currentDate=new Date();
  this.body={
    "noteIdList": [this.noteDetails.id],
    "reminder": new Date(currentDate.getFullYear(),currentDate.getMonth(),(currentDate.getDate()+7),8,0,0,0)
  }
  this.httpService.httpAddReminder('notes/addUpdateReminderNotes', localStorage.getItem('token'),this.body).subscribe((result)=>{
    console.log(result);
  })
}
show=true
datePickReminder(){
  this.show=!this.show;
}
backPressDatepicker(){
  this.show=true;
}
}


