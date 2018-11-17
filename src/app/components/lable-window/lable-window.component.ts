import { Component, OnInit } from '@angular/core';
import { HttpService} from "../../core/service/http/http.service"
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-lable-window',
  templateUrl: './lable-window.component.html',
  styleUrls: ['./lable-window.component.scss']
})
export class LableWindowComponent implements OnInit {

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
      .subscribe(data => {
        this.notes = []
        for (let i = data['data'].data.length - 1; i >= 0; i--) {
          this.notes.push(data['data'].data[i]);
        }
      },
        error => {
          console.log(error);
        })
  }
     /**   
     * @description Event emmition
     */
  addNewEntry(event){
   this.getCard(this.label)
  }

}
