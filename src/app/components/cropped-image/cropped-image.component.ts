import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DashboardComponent } from '../../components/dashboard/dashboard.component'
import { HttpService } from '../../core/service/http/http.service'
import { environment } from '../../../environments/environment'
import { GeneralService } from '../../core/service/data/general.service'
@Component({
  selector: 'app-cropped-image',
  templateUrl: './cropped-image.component.html',
  styleUrls: ['./cropped-image.component.scss']
})
export class CroppedImageComponent implements OnInit {
  public croppedImage: ''


  constructor(
    private dialogRef1: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private service: GeneralService
  ) { }

  ngOnInit() {
  }
  imageCropped(event: any) {
    this.croppedImage = event.file;
  }

  onUpload() {

    var token = localStorage.getItem('token');
    const uploadData = new FormData();
    uploadData.append('file', this.croppedImage);
    this.httpService.httpAddImage('user/uploadProfileImage', uploadData, token).subscribe(res => {



      localStorage.setItem('imageUrl', res['status'].imageUrl);
      this.dialogRef1.close();
      this.service.cropImage(true);
    }, error => {

    })

  }


}
