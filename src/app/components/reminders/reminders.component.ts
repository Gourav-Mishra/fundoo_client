import { Component, OnInit } from '@angular/core';
import { HttpService} from '../../core/service/http/http.service'
import {GeneralService } from "../../core/service/data/general.service"

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {

  constructor( private httpService:HttpService,
    private data: GeneralService ) { }

  ngOnInit() {
    this.getReminderList();
    this.viewCard()
  }
  public reminder=[]

  getReminderList(){
       var token=localStorage.getItem('token');
       this.httpService.httpGetNote( 'notes/getReminderNotesList',token).subscribe(result=>{
         
       console.log(result);
       

        // for(var i=0;i<result['data'].data.length;i++){
          this.reminder= result['data'].data;
        // }
         console.log(this.reminder);

       })
  }
  toggle = false;
  viewCard() {
    this.data.currentMessage.subscribe(message => {
      this.toggle = message;
    })
  }
}


