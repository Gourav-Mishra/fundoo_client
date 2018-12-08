import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NoteService } from 'src/app/core/service/note-service/note.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RatingModule } from "ngx-rating";
import { LoggerService } from "../../core/service/logger/logger.service"

@Component({
  selector: 'app-question-and-answer',
  templateUrl: './question-and-answer.component.html',
  styleUrls: ['./question-and-answer.component.scss']
})

export class QuestionAndAnswerComponent implements OnInit {
  data: any;

  constructor(private noteService: NoteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
  @ViewChild('replyArea') private answerReply: ElementRef;
  @ViewChild('quesReplyArea') private quesReply: ElementRef;
  private noteId;
  private title;
  private description;
  private question;
  private show;
  private body = {
    "question": ""
  }
  public owner;
  private img;
  private date;
  private fName;
  private lName;
  private qA;
  private replyShow = false;
  private image;
  private img2;
  private open = true;
  private down = true;
  private rID;
  private replyCount;
  private value;
  private avgRate;
  private qID;
  private rate;
  public editorContent: string ;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.noteId = params['noteId'];
    });
    // this.noteService.getNoteDetails(this.noteId).subscribe(response => {
    //   this.title = response['data']['data'][0].title;
    //   this.description = response['data']['data'][0].description;
    //   this.show = response['data']['data'][0].questionAndAnswerNotes.length;
    //   if (this.show != 0) {
    //     this.question = response['data']['data'][0].questionAndAnswerNotes[0].message;
    //   }
    //   this.img = environment.profieUrl;
    //   this.date = response['data']['data'][0].questionAndAnswerNotes[0].modifiedDate;
    //   this.qA = response['data']['data'][0].questionAndAnswerNotes;
    //   this.image=localStorage.getItem('imageUrl');
    //   this.img2=environment.profieUrl+this.image; 
    // })
    this.getNotes();
  }
  getNotes() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.noteId = params['noteId'];
    });
     
      this.noteService.getNoteDetails(this.noteId).subscribe(response => {
console.log(response);

      this.title = response['data']['data'][0].title;
      this.description = response['data']['data'][0].description;
      this.show = response['data']['data'][0].questionAndAnswerNotes.length;
      if (this.show != 0) {
        this.question = response['data']['data'][0].questionAndAnswerNotes[0].message;
      }
      this.img = environment.profieUrl;
      this.date = response['data']['data'][0].questionAndAnswerNotes[0].modifiedDate;
      this.qA = response['data']['data'][0].questionAndAnswerNotes;

      this.image = localStorage.getItem('imageUrl');
      this.img2 = environment.profieUrl + this.image;
    })

  }
  /**
  *   @description : Api call for add question Label
  **/
  addQuestion() {
    this.show = !this.show;
    let requestBody = {
      "message": this.editorContent,
      "notesId": this.noteId
    }
    this.noteService.addQuestion(requestBody).subscribe(result => {
      this.getNotes();
    })
  }
  /**
   *   @description : Api call for closing QandA
   **/
  closeQAndA() {
    this.router.navigate(['/home/notes'])
  }
  /**
   *   @description : Api call for like
   **/
  like(data) {
    let requestBody = {
      "like": true
    }
    this.noteService.likeQnA(data.id, requestBody).subscribe(response => {
      this.getNotes();
    })
  }
  private rateBody = {
    "rate": ""
  }
  /**
   *   @description : Api call for rating
   **/
  rating(data, event) {

    let reqBody = {
      "rate": event
    }
    this.noteService.ratingQnA(data.id, reqBody).subscribe(result => {
      this.getNotes();
    })
  }

  /**
   *   @description : Api call for Answer
   **/
  answer(id) {
    this.replyShow = !this.replyShow;
    this.qID = id;

  }
  private replyBody = {
    "reply": ""
  };
  replyTo() {
    let replyRequest = {
      "message": this.editorContent,
    }
    this.noteService.replyQnA(this.qID, replyRequest).subscribe(response => {
      this.getNotes();
    })
  }
  
  checkRating(rateArray) {
    this.rate = 0;
    if (rateArray.length == 0) {
      return true;
    }
    for (let i = 0; i < rateArray.length; i++) {
      if (rateArray[i].userId == localStorage.getItem('userId')) {
        this.rate = rateArray[i].rate;
      }
    }
    return true;
  }

  averageRating(rateArray) {
    this.value = 0;
    if (rateArray.length != 0) {
      for (let i = 0; i < rateArray.length; i++) {
        this.value += rateArray[i].rate
      }
      this.avgRate = this.value / rateArray.length;
      return this.avgRate.toFixed(1);
    }
  }

  replyDown(replyId) {
    this.down = !this.down;
    this.rID = replyId;
  }
  viewReplies(questAns) {
    this.replyCount = 0;
    for (let i = 0; i < this.qA.length; i++) {
      if (questAns.id == this.qA[i].parentId) {
        this.replyCount++
      }
    }
    return this.replyCount;
  }
  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline','fontFamily', 'strikeThrough', 'subscript', 
    'superscript', 'fontFamily', 'fontSize', 'color','formatBlock', 'blockStyle',
     'inlineStyle', 'align', "Text Direction","placeholder",'shape', 'size', 
    'insertOrderedList', 'insertUnorderedList', 'outdent', 'indent',
    'insertHorizontalRule', 'removeFormat', 'fullscreen','paragraphStyles'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 
    'superscript', 'fontFamily', 'fontSize', 'color','formatBlock', 'blockStyle',
     'inlineStyle', 'align', "Text Direction","placeholder",'shape', 'size', 
    'insertOrderedList', 'insertUnorderedList', 'outdent', 'indent',
    'insertHorizontalRule', 'uploadFile', 'removeFormat', 'fullscreen'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 
    'superscript', 'fontFamily', 'fontSize', 'color','formatBlock', 'blockStyle',
     'inlineStyle', 'align', "Text Direction","placeholder",'shape', 'size', 
    'insertOrderedList', 'insertUnorderedList', 'outdent', 'indent',
    'insertHorizontalRule', 'uploadFile', 'removeFormat', 'fullscreen'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 
    'superscript', 'fontFamily', 'fontSize', 'color','formatBlock', 'blockStyle',
     'inlineStyle', 'align', "Text Direction","placeholder",'shape', 'size', 
    'insertOrderedList', 'insertUnorderedList', 'outdent', 'indent',
    'insertHorizontalRule', 'uploadFile', 'removeFormat', 'fullscreen'],
  };
  
}

