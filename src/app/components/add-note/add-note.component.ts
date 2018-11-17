// import { Component, OnInit, Output,EventEmitter } from '@angular/core';
// import { HttpService } from 'src/app/core/service/http/http.service';
// import { MatSnackBar } from '@angular/material';


// @Component({
//   selector: 'app-add-note',
//   templateUrl: './add-note.component.html',
//   styleUrls: ['./add-note.component.scss']
// })
// export class AddNoteComponent implements OnInit 
// {
//  public show=true;
//  public visible=true;;
//  public notes=[]
//  public  record={};
//  public title;
//  public note;
//  public parentColor;
// body={
// "title":"",
// "description":""
// }
// @Output() onNewEntryAdded=new EventEmitter();
 
//    constructor(private  httpService:HttpService,
//     public snacBar:MatSnackBar) { }
 
//    ngOnInit() {
 
//    }
//    changeMainBoxColor(event){
//      if(event){
//       this.parentColor=event;
//       console.log(this.parentColor);
      
//      }
   

//    }

//  close(){
//    if(!this.show){
//      this.show=!this.show;
//      var token=localStorage.getItem('token');
//      this.title=document.getElementById("title").innerHTML;
//      this.note=document.getElementById("take-note").innerHTML;
//      console.log(this.title);
//      console.log(this.note);
//      console.log('token',token);
     
//      var note={
//        'title':this.title,
//        'description': this.note,
//        'labelIdList':'',
//        'checklist':'',
//        "isPinned":'false',
//        "color":this.parentColor
//      };
//      this.parentColor="#ffffff";
//      this.record=this.httpService.httpAddNote('notes/addNotes',note,token).subscribe(result=>{
//        this.snacBar.open("Notes Added","Sucessfull",{
//          duration:3000,
//        });
//        this.onNewEntryAdded.emit({});
      
//      },error=>{
//        console.log(error);
//        this.snacBar.open('notes addition ', 'Failed',{
//          duration: 3000,
//        })
//      })

//    }

//  }
 

//  }

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/service/http/http.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-note',
    templateUrl: './add-note.component.html',
    styleUrls: ['./add-note.component.scss']
  })

  
  export class AddNoteComponent implements OnInit 
  {
    public hide: boolean = true;
    public labelId = [];
    public labelName = [];
    body: any = {};
    data: any;
    show: any = 0;
    color: any = "#fafafa";
    listing = true;
    public i = 0;
    dataArray = [];
    dataArrayCheck = [];
    checked = false;
    status = "open";
    accessToken = localStorage.getItem('token');
    public parentColor;
     @Output() onNewEntryAdded=new EventEmitter();
    labelArray: any[];
    note = {
      'id' : ''
    }
    constructor(private  httpService:HttpService, private snackBar: MatSnackBar,
        private router: Router) { }
        public todayDate= new Date();
        public  tomorrowDate=new Date()
         
    ngOnInit() {
        this.getAllLabels();
        this.tomorrowDate.setDate(this.tomorrowDate.getDate()+1)
    }
    changeMainBoxColor(event){
             if(event){
              this.parentColor=event;
              console.log(this.parentColor);
              
             }
            }
    toggle() {
        this.show = 1;
    }
    /**
     * @description : Add Notes api Call starts
     */
    addNotes() {
        if (this.checked == false) {
            this.httpService.httpAddNote('notes/addNotes', {
                'title': document.getElementById('titleId').innerHTML,
                'description': document.getElementById('notesId').innerHTML,
                'labelIdList': JSON.stringify(this.labelId),
                'checklist': '',
                'isPined': 'false',
                "color":this.color,
                'reminder':this.remindervar,

            }, this.accessToken).subscribe(response => {
               
                this.onNewEntryAdded.emit({});
                this.labelName = [];
                this.hide = !this.hide;
                this.parentColor = "#fafafa";
                this.show = 0
            }, error => {
                console.log("failed", error)
                this.parentColor = "#fafafa";
                this.hide = !this.hide;
                this.labelName = [];
                this.show = 0
            })
        }
        /**
         * @description : Api call for Adding checklist 
         */
        else {
            for (var i = 0; i < this.dataArray.length; i++) {
                if (this.dataArray[i].isChecked == true) {
                    this.status = "close"
                }
                var apiObj = {
                    "itemName": this.dataArray[i].data,
                    "status": this.status
                }
                this.dataArrayCheck.push(apiObj)
                this.status = "open"
            }
            console.log(this.dataArrayCheck);
            this.httpService.httpAddNote('notes/addNotes', {
                'title': document.getElementById('titleId').innerHTML,
                'labelIdList': JSON.stringify(this.labelId),
                'checklist': JSON.stringify(this.dataArrayCheck),
                'isPined': 'false',
                "color":this.color,
                'reminder':this.remindervar,
            }, this.accessToken).subscribe(response => {
                this.onNewEntryAdded.emit({});
                this.dataArrayCheck = [];
                this.labelName = [];
                this.hide = !this.hide;
                this.color = "#fafafa";
                this.show = 0
            }, error => {
                this.dataArrayCheck = [];
                console.log("failed", error)
                this.color = "#fafafa";
                this.hide = !this.hide;
                this.labelName = [];
                this.show = 0
            })
        }
    }
    /**
     * @description changecolor event
     * @param event 
     */
    colorChanges(event) {
        if (event) {
            this.color = event;
        }
        
    }
    /**
     * @description keydown event
     * @param event 
     */
    onKeydown(event) {
        if (event.key === "Enter") {
            console.log(event);
        }
    }
    /**
     * @description Dislay label as chip in notecards
     * @param event 
     */
    instantLabel(event) {
        if (this.labelName.indexOf(event) < 0) {
            this.labelId.push(event.id);
            this.labelName.push(event);
        } else {
            this.labelId.splice(this.labelId.indexOf(event), 1)
            this.labelName.splice(this.labelName.indexOf(event), 1)
        }
    }
    /**
     * @description get all Labels inside the notecards
     */
    getAllLabels() {
        let newArray = [];
        this.httpService.httpGetNote('noteLabels/getNoteLabelList', this.accessToken)
            .subscribe(data => {
                for (var i = 0; i < data['data']['details'].length; i++) {
                    if (data['data']['details'][i].isDeleted == false) {
                        newArray.push(data['data']['details'][i])
                    }
                }
                this.labelArray = newArray;
            })
    }
    /**
     * @description Enter condition inside checklist
     */
    enter() {
        this.i++;
        if (this.data != null) {
            console.log(event, "Keydown");
            var obj = {
                "index": this.i,
                "data": this.data
            }
            this.dataArray.push(obj);
            this.data = null
        }
    }
    ondelete(deletedObj) {
        console.log("Ondelete function runnig");
        for (var i = 0; i < this.dataArray.length; i++) {
            if (deletedObj.index == this.dataArray[i].index) {
                this.dataArray.splice(i, 1);
                break;
            }
        }
        console.log(this.dataArray);
    }

    editing(event, edited) {
        if (event.code == "Enter") {
            console.log("enter pressed");
            for (var i = 0; i < this.dataArray.length; i++) {
                if (edited.index == this.dataArray[i].index) {
                    this.dataArray[i].data == edited.data
                }
            }
            console.log(this.dataArray);
        }
    }
    /**
     * @description Adding reminder in add card
     */
    public remindervar;
    public reminderArr=[];
    
    emitRemainder(event){
        if(event){
            this.remindervar=event;
            if(this.reminderArr.length==0)
            {
            this.reminderArr.push(this.remindervar);
            }
        }
    }
    deleteReminder(){
        this.reminderArr.pop();
        this.remindervar='';

    }
}



