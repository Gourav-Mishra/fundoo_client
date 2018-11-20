import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../core/service/http/http.service'
import { FormControl } from '@angular/forms';
import { MatDialog} from '@angular/material';
import { AddLablesComponent } from '../add-lables/add-lables.component';
import { GeneralService } from '../../core/service/data/general.service';
import { HttpClient } from '@angular/common/http'
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';
import { Router } from '@angular/router'
import { environment}from '../../../environments/environment'
import {CroppedImageComponent } from '../../components/cropped-image/cropped-image.component'



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
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
    private httpService: HttpService, 
    public dialog: MatDialog,
    private data: GeneralService,
    private http: HttpClient,
    private router: Router
  ) { }
  firstName; 
  Router;
  lastName;
  email;
  message;
     /**   
     * @description  the changing names in the toolbar 
     */
  public changeName="keep";
  nameChange(changeName){
    this.changeName=changeName;

  }
     /**   
     * @description  The dialog box of the lable 
     */

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
     /**   
     * @description  Api gor getting all the lables in the list
     */
  labelList() {
    var token = localStorage.getItem('token');
    this.httpService.httpGetNotes('noteLabels/getNoteLabelList', token).subscribe(res => {
      console.log(res);
      this.notes = [];
      // this.notes = (res['data'].details);
      for(var i=0;i<res['data'].details.length;i++){
       
          this.notes.push(res['data']['details'][i])
        }


      this.notes.sort(function(a, b){
        var nameA=a.label.toLowerCase(), nameB=b.label.toLowerCase()
        if (nameA < nameB) 
        return -1 
        if (nameA > nameB)
        return 1
        return 0 
        })   
        console.log(this.notes);
        

    }, error => {
      console.log(error);
    })
  }
     /**   
     * @description  Api for getitng all the notes in a lable
     */
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
      this.notes.sort(function(a, b){
        var nameA=a.label.toLowerCase(), nameB=b.label.toLowerCase()
        if (nameA < nameB) 
        return -1 
        if (nameA > nameB)
        return 1
        return 0 
        })   
        console.log(this.notes);
        
    }, error => {
     
    })
    this.data.currentMsg.subscribe(message => this.message = message)

  }
     /**   
     * @description  the changing names in the toolbar 
     */
  logout() {
    window.location.href = "/login";
    localStorage.clear()


  }
     /**   
     * @description  the changing names in the toolbar 
     */
  onKeyUp(event) {
    this.body.data = event.target.value;
    this.data.searchData(this.body.data)
    console.log(event);
    
  }


  /**  *********  profile pic upload  ****************  */
  
  selectedFile = null;
public image2=localStorage.getItem('imageUrl');
public img=environment.profieUrl+this.image2;
onFileUpload(event){
this.openDialogCrop(event);
var token=localStorage.getItem('token');
this.selectedFile=event.path[0].files[0];
const uploadData = new FormData();
uploadData.append('file', this.selectedFile, this.selectedFile.name);
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
   /**   
     * @description  The dialog box for the cropping of the image 
     */
  public pic;
  openDialogCrop(data): void {
    const dialogRef1 = this.dialog.open(CroppedImageComponent, {
      width: '500px',
      data: data
    });
    dialogRef1.afterClosed().subscribe(result => {
    this.data.currentMessage1.subscribe(message =>this.pic=message)
    if(this.pic==true){
      this.image2 = localStorage.getItem('imageUrl');
      this.img =environment.profieUrl+this.image2;
    }
    });
}
}
