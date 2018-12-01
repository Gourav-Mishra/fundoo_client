import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/core/service/note-service/note.service';
import { Router, ActivatedRoute , Params} from '@angular/router';
import { environment } from 'src/environments/environment';
import {RatingModule} from "ngx-rating";
import{ LoggerService} from "../../core/service/logger/logger.service"

@Component({
  selector: 'app-question-and-answer',
  templateUrl: './question-and-answer.component.html',
  styleUrls: ['./question-and-answer.component.scss']
})

export class QuestionAndAnswerComponent implements OnInit {
  data: any;

 constructor( private noteService: NoteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
    private noteId;
    private title;
    private description;
    private question;
    private show;
    private body={
    "question":""
    }
  public owner;
  private img;
  private date;
  private fName;
  private lName;
  private qA;
  private replyShow=false;
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.noteId = params['noteId'];
    });
    this.noteService.getNoteDetails(this.noteId).subscribe(response => {
      this.title = response['data']['data'][0].title;
      this.description = response['data']['data'][0].description;
      this.show = response['data']['data'][0].questionAndAnswerNotes.length;
      if (this.show != 0) {
        this.question = response['data']['data'][0].questionAndAnswerNotes[0].message;
      }
     this.img=environment.profieUrl;
     this.date=response['data']['data'][0].questionAndAnswerNotes[0].modifiedDate;
     this.qA=response['data']['data'][0].questionAndAnswerNotes
    })
  }
addQuestion(){
  this.show=!this.show;
  let requestBody={
  "message":this.body.question,
  "notesId": this.noteId
  }
  this.noteService.addQuestionAndAnswer(requestBody).subscribe(result=>{
    })
    }
    closeQAndA(){
      this.router.navigate(['/home/notes'])
    }
    like(data){
      let requestBody={
        "like":true
      }
      this.noteService.likeQnA(data.id,requestBody).subscribe(response=>{
      })
    }
    private rateBody={
      "rate":"" 
    }
    rating(data,event){
      LoggerService.log("in");
      let reqBody={
        "rate": event
      }
      this.noteService.ratingQnA(data.id, reqBody).subscribe(result=>{
      })
    }
    private qID;
    answer(id){
      this.replyShow=!this.replyShow;
      this.qID=id;
  
    }
    private replyBody={
      "reply":""
    };
    reply(){
      let replyRequest={
        "message":this.replyBody.reply
      }
      this.noteService.replyQnA(this.qID, replyRequest).subscribe(response=>{
      })
    }
}

