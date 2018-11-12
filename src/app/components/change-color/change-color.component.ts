import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import { HttpService } from 'src/app/core/service/http/http.service';

@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.scss']
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
  colorArray = [
  { 'color': '#ffffff', 'name': 'White' },
  { 'color': '#f28b82', 'name': 'Red' },
  { 'color': '#fbbc04', 'name': 'Orange' },
  { 'color': '#fff475', 'name': 'Yellow' },

  { 'color': '#8d5524', 'name': 'skinTone1' },
  { 'color': '#c68642', 'name': 'skinTone2' },
  { 'color': '#e0ac69', 'name': 'SkinTone3' },
  { 'color': '#ffdbac', 'name': 'skinTone4' },

  { 'color': '#b3cde0', 'name': 'BlueShade1' },
  { 'color': '#6497b1', 'name': 'BlueShade2' },
  { 'color': '#005b96', 'name': 'BlueShade3' },
  { 'color': '#03396c', 'name': 'BlueShade4' },

  { 'color': '#851e3e', 'name': 'AutmShade1' },
  { 'color': '#651e3e ', 'name': 'AutmShade2' },
  { 'color': '#451e3e', 'name': 'AutmShade3' },
  { 'color': '#251e3e', 'name': 'AutmShade4' },

  { 'color': '#ccff90', 'name': 'Green' },
  { 'color': '#a7ffeb', 'name': 'Teal' },
  { 'color': '#cbf0f8', 'name': 'Blue' },
  { 'color': '#aecbfa', 'name': 'Dark blue' },

  { 'color': '#d7aefb', 'name': 'Purple' },
  { 'color': '#fdcfe8', 'name': 'Pink' },
  { 'color': '#e6c9a8', 'name': 'Brown' },
  { 'color': '#e8eaed', 'name': 'Gray' },
   
  { 'color': '#75EB00', 'name': 'queen' },
  { 'color': '#3A9AD9', 'name': 'shadeBlue' },
  { 'color': '#E9E0D6', 'name': 'cement' },
  { 'color': '#5BB12F', 'name': 'Green' },

  { 'color': '#260126', 'name': 'voilet' },
  { 'color': '#F2EEB3', 'name': 'shade' },
  { 'color': '#F7FF3F', 'name': 'ShineYellow' },
  { 'color': '#FF66CC', 'name': 'BabyPink' },

 
                ]
  
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
