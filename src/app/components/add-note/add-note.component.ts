import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/service/http/http.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import{ Note} from '../../core/model/note'

@Component({
    selector: 'app-add-note',
    templateUrl: './add-note.component.html',
    styleUrls: ['./add-note.component.scss']
  })

  
  export class AddNoteComponent implements OnInit 
  {
    
     hide: boolean = true;
     labelId = [];
     labelName = [];
     body: any = {};
     data: any;
     show: any = 0;
     color: any = "#fafafa";
     listing = true;
     i = 0;
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
             
              
             }
            }
    toggle() {
        this.show = 1;
    }
    /**
     * @description : Add Notes api Call starts
     */
    addNotes() {
        var body={
            'title': document.getElementById('titleId').innerHTML,
            'description': document.getElementById('notesId').innerHTML,
            'labelIdList': JSON.stringify(this.labelId),
            'checklist': '',
            'isPined': 'false',
            "color":this.color,
            'reminder':'',
    
        }
        if(this.remindervar!=undefined){
            this.body.reminder=this.remindervar
        }


        if (this.checked == false) {
            this.httpService.httpAddNote('notes/addNotes', body, this.accessToken).subscribe(response => {
               
                this.onNewEntryAdded.emit({});
                this.labelName = [];
                this.hide = !this.hide;
                this.parentColor = "#fafafa";
                this.show = 0
            }, error => {
                
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
           
            var obj = {
                "index": this.i,
                "data": this.data
            }
            this.dataArray.push(obj);
            this.data = null
        }
    }
    ondelete(deletedObj) {
       
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



