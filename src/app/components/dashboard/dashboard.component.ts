import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../service/http/http.service'
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddLablesComponent } from '../add-lables/add-lables.component';
import { GeneralService } from '../../service/general.service';
import { HttpClient } from '@angular/common/http'
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';
import { Router } from '@angular/router'
import { environment}from '../../../environments/environment'



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  notes = [];
  public ProfilePath: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  body = {
    "data": ""
  }
  mode = new FormControl('side');


  constructor(private breakpointObserver: BreakpointObserver,
    private httpService: HttpService, public dialog: MatDialog,
    private data: GeneralService,
    private http: HttpClient,
    private router: Router
  ) { }
  firstName; Router
  lastName;
  email;
  message;

  openDialog(): void {
    const dialogRef = this.dialog.open(AddLablesComponent, {
      width: '440px',
      height: '250px',
      data: {}

    });

    dialogRef.afterClosed().subscribe(result => {
      this.labelList();
    });
  }
  labelList() {
    var token = localStorage.getItem('token');
    this.httpService.httpGetNotes('noteLabels/getNoteLabelList', token).subscribe(res => {
      console.log(res);
      this.notes = [];
      this.notes = (res['data'].details);

    }, error => {
      console.log(error);
    })
  }
  ngOnInit() {
    this.firstName = localStorage.getItem('firstName');
    this.email = localStorage.getItem('email');
    this.lastName = localStorage.getItem('lastName');

    var token = localStorage.getItem('token');
    this.httpService.httpGetNotes('noteLabels/getNoteLabelList', token).subscribe(res => {
     
      this.notes = [];
 
      for (var i = 0; i < res['data'].details.length; i++) {
        if (res['data']['details'][i].isDeleted == false) {
          this.notes.push(res['data']['details'][i])
        }
      }
    }, error => {
     
    })
    this.data.currentMsg.subscribe(message => this.message = message)

  }
  logout() {
    window.location.href = "/login";
    localStorage.clear()


  }
  onKeyUp(event) {
    this.body.data = event.target.value;
    this.data.searchData(this.body.data)
  }


  /**   *********  profile pic upload  ****************   */
  
  selectedFile = null;
public image2=localStorage.getItem('imageUrl');
img=environment.profieUrl+this.image2;
onFileUpload(event){
var token=localStorage.getItem('token');
this.selectedFile=event.path[0].files[0];
const uploadData = new FormData();
uploadData.append('file', this.selectedFile, this.selectedFile.name);
this.httpService.httpAddImage('user/uploadProfileImage',uploadData,token).subscribe(res=>{


this.img=environment.profieUrl+res['status'].imageUrl;
},error=>{

})

}
image={};
  /** ***********profile pic upload Done */


  view = 0;
  listView() {
    this.view = 1;
    this.data.changeMessage(true);
  }
  gridView() {
    this.view = 0;
    this.data.changeMessage(false);
  }


  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    
  }
  loadImageFailed() {
    
  }
  lablelist(labels) {
    let labelName = labels.label;
    this.router.navigate(['home/label/' + labelName])
  }

}
