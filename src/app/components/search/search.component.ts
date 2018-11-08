import { Component, OnInit,Input } from '@angular/core';
import{ HttpService} from '../../service/http/http.service'
import { GeneralService } from 'src/app/service/general.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  notes=[];
  search;
  @Input() notesArray

  constructor(private httpService:HttpService,
    private data:GeneralService) { }

  ngOnInit() {
    this.data.searchDataSearch.subscribe(message=>{
      this.search=message;
      console.log("data= ", this.search);
      
      
    })
    this.readRead()
   
  }

  readRead(){
    {
      this.notes=[];
      var token=localStorage.getItem('token');
     this.httpService.httpGetNotes('notes/getNotesList',token).subscribe(result =>{
     
       
        result['data'].data.forEach(element => {
          this.notes.push(element);
        });
         console.log("notes=>>",this.notes);
       },error=>{
         console.log(error);
       });
  
    }
  }

}
