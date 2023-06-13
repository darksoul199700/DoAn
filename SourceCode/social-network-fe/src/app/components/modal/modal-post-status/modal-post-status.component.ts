import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { baseApi } from 'src/common/service/backend-api';
import { NotificationService } from 'src/common/service/notification.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'modal-post-status',
  templateUrl: './modal-post-status.component.html',
  styleUrls: ['./modal-post-status.component.css']
})

export class ModalPostStatusComponent implements OnInit {

  name = "hong duong"
  caption;
  user: any = '';
  path: any[];
  avatar: string = ''
  imagePost: any[] = new Array()
  imagePostEdit: any[] = new Array()
  fireBaseUrl: any[] = new Array()
  isEditPost: boolean = false;
  baseApiUrl: string;
  
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalPostStatusComponent>,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer,
    public notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.user = this.data.user
    this.avatar = this.data.avatar
    this.caption = this.data.caption
    this.baseApiUrl = baseApi;
    if(!isNullOrUndefined(this.data.path)) {
      this.imagePostEdit = this.data.path
    }
    if(!isNullOrUndefined(this.caption) && this.caption !== "") {
      this.isEditPost = true;
    }
  }

  uploadFile()
  {
    var inpFile = document.getElementById('post-image-upload')
    inpFile.click()
  }

  uploadImage(event) {
    this.path = Array.from(event.target.files) //init array this.path save array file from input
    if (!this.isEditPost) {
      this.data.path = this.path;
    } else {
      this.data.files = this.path;
    }
    this.path.map(async (value) => {
      this.ng2ImgMax.compressImage(value, 0.075).subscribe(
        (result) => {
          const imageCompress = new File([result], result.name)
          var reader = new FileReader()
          reader.readAsDataURL(imageCompress)
          reader.onload = async (_event) => {
            await this.imagePost.push(reader.result) //put dataBase64 from FileReader to array this.imagePost
          }
        }
      )
    })
  }

  loadCaption() {
    this.data.caption = this.caption
  }
  
  removeImg(index) {
    this.imagePostEdit.splice(index, 1)
  }

 
}
