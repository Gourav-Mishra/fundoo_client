import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import { HttpService } from 'src/app/core/service/http/http.service';

@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.css']
})
export class ChangeColorComponent implements OnInit {
  @Output() notescolor=new EventEmitter();
  @Output() mainBoxColor=new EventEmitter();

  constructor(private httpService:HttpService) { }
  @Input() noteDetails;
  body={
    "color":"",
    "noteIdList":[]
  }

  ngOnInit() {
  }

  setcolor(id){
    this.mainBoxColor.emit(id);

    var token=localStorage.getItem('token')
    this.body={
      "color":id,
      "noteIdList":[this.noteDetails.id]
    }
    this.httpService.httpColorNote('notes/changesColorNotes',this.body,token).subscribe(result=>{
      this.notescolor.emit(id);
      console.log(this.noteDetails.id);
      
    },error=>{
      console.log(this.noteDetails.id);
      
    })

  }

}
