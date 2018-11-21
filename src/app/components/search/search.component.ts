import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import{ HttpService} from '../../core/service/http/http.service'
import { GeneralService } from 'src/app/core/service/data/general.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
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
     this.httpService.httpGetNotes('notes/getNotesList',token)
     .pipe(takeUntil(this.destroy$))
     .subscribe(result =>{
     
       
        result['data'].data.forEach(element => {
          this.notes.push(element);
        });
         console.log("notes=>>",this.notes);
       },error=>{
         console.log(error);
       });
  
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
