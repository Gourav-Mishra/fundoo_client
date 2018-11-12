import { Injectable } from '@angular/core';
import {BehaviorSubject,Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
search : any;

private msgSource=new BehaviorSubject("default")
currentMsg=this.msgSource.asObservable() ;

private messageSource = new BehaviorSubject(false);
currentMessage = this.messageSource.asObservable();

private messageSource1= new BehaviorSubject(false);
currentMessage1 = this.messageSource1.asObservable();

private searchDataSource= new BehaviorSubject(this.search)
searchDataSearch= this.searchDataSource.asObservable();

  constructor() { }

  searchData(search:string)
  {
    this.search=search;
    console.log("search:",search);
    this.searchDataSource.next(search);
  }
  changeMessage(message: boolean) {
    this.messageSource.next(message);
    }
  cropImage(message: boolean) {
      this.messageSource1.next(message);
      }
}
