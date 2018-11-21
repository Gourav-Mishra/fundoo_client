import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService} from "../../core/service/http/http.service"
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-lable-window',
  templateUrl: './lable-window.component.html',
  styleUrls: ['./lable-window.component.scss']
})
export class LableWindowComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private service: HttpService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.label = params['params'];
        this.getCard(this.label)
      })
  }
     /**   
     * @description Api for  Getting  all cards by lables 
     */
  public notes=[];
  public label;
  private token=localStorage.getItem('token');
  getCard(label) {
    this.service. httpPostdeleteForever("notes/getNotesListByLabel/" + label, {}, this.token)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
        this.notes = []
        for (let i = data['data'].data.length - 1; i >= 0; i--) {
          this.notes.push(data['data'].data[i]);
        }
      },
        error => {
          
        })
  }
     /**   
     * @description Event emmition
     */
  addNewEntry(event){
   this.getCard(this.label)
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
