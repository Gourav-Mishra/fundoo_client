import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DashboardComponent } from '../../components/dashboard/dashboard.component'
import { HttpService } from '../../core/service/http/http.service'
import { environment } from '../../../environments/environment'
import { GeneralService } from '../../core/service/data/general.service'
import { NoteService } from 'src/app/core/service/note-service/note.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-cropped-image',
  templateUrl: './cropped-image.component.html',
  styleUrls: ['./cropped-image.component.scss']
})
export class CroppedImageComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  public croppedImage: ''


  constructor(
    private dialogRef1: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private service: GeneralService,
    private noteService: NoteService
  ) { }

  ngOnInit() {
  }
  /**   
     * @description  Event emmition for the cropped image
     */
  imageCropped(event: any) {
    this.croppedImage = event.file;
  }
     /**   
     * @description  Api For image upload
     */
  onUpload() {

    var token = localStorage.getItem('token');
    const uploadData = new FormData();
    uploadData.append('file', this.croppedImage);
    this.noteService.imageUpload(uploadData)
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      
      localStorage.setItem('imageUrl', res['status'].imageUrl);
      this.dialogRef1.close();
      this.service.cropImage(true);
    }, error => {
    })

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }


}
