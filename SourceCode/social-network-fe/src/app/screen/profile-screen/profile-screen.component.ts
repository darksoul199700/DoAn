import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditImageComponent } from 'src/app/components/modal/modal-edit-image/modal-edit-image.component';
import { baseApi } from 'src/common/service/backend-api';
import { UsersService } from 'src/common/service/users.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-profile-screen',
  templateUrl: './profile-screen.component.html',
  styleUrls: ['./profile-screen.component.css']
})
export class ProfileScreenComponent implements OnInit {

  formUserDetail: FormGroup
  formChangePassword: FormGroup
  user: any = ''
  username: string
  path;
  file: File
  testSrc: string = ''
  deleteImageSrc: string = ''
  inp = document.getElementById('inp-avatar');
  isProfileDetailPage: boolean = true;
  submitted: boolean = false;
  isCurrentPasswordCorrect: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private af: AngularFireStorage,
    private dialog: MatDialog,
    )
    {
    this.formUserDetail = this.fb.group({
      surname: ['', Validators.required],
      truename: ['', Validators.required],
      username: ['', Validators.required],
      gender: [false],
      address: ['',Validators.required],
      phonenumber: ['', [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/)]]
    })
    this.formChangePassword = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      retypeNewPassword: ['', Validators.required]
    }, {validators: this.checkPasswords})
   }

  ngOnInit(): void {
    this.userService.usersDetail().subscribe(
      (response) => {
        if(response.code === 200)
        {
          const result = response.data;
          this.user = result
          this.formUserDetail.patchValue({
            surname: this.user.surname,
            truename: this.user.truename,
            username: this.user.username,
            gender: this.user.gender,
            address: this.user.address,
            phonenumber: this.user.phonenumber
          })
          this.username = this.user.username
        } else {
          this.formUserDetail.patchValue({
            username: response.userInfo.username
          })
        }
      }
    )
    this.userService.getUserPhotoUrl().subscribe(
      (result) => {
        if(result)
        {
          this.testSrc = baseApi + '/' + result.photoUrl
          this.deleteImageSrc = this.testSrc
        }
      }
    )
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('newPassword').value;
    let confirmPass = group.get('retypeNewPassword').value
    return pass === confirmPass ? null : { notSame: true }
  }

  submitForm(){
    this.submitted  = true;
    if(this.formUserDetail.invalid)
    {
      console.log("form invalid")
      return ;
    }
    const {surname, truename, username, gender, email, address, phonenumber} = this.formUserDetail.value;
    let result = this.userService.usersCreateDetail(surname, truename, username, gender, email, address, phonenumber);
    result.subscribe((response) => {
      if(response.code == 200) console.log("create success")
      this.ngOnInit()
    })
  }

  validateFormUserDetailRequired(field) {
    if (this.formUserDetail.get(field).status === "INVALID" && this.isProfileDetailPage == true) {
        return true;
    } else {
        return false;
    }
  }

  validateFormChangePasswordRequired(field) {
    if (this.formChangePassword.get(field).status === "INVALID" && !this.isProfileDetailPage == true) {
        return true;
    } else {
        return false;
    }
  }

  getValidateFormUserDetailErrorMessage(field) {
    if (this.isProfileDetailPage == true) {
      if (this.formUserDetail.get(field).hasError('required')) {
        return `Không được để trống`;
      } else if (this.formUserDetail.get(field).hasError('email')) {
        return `Định dạng chưa chính xác`;
      } else if (this.formUserDetail.get(field).hasError('minlength')) {
        return `Có độ dài tối thiểu là ${this.formUserDetail.get(field).errors.minlength.requiredLength}`
      } else if (this.formUserDetail.get(field).hasError('maxlength')) {
        return `Có độ dài tối đa ${this.formUserDetail.get(field).errors.maxlength.requiredLength}`
      } else if (this.formUserDetail.get(field).hasError('pattern') && field === "phonenumber") {
        return `Số điện thoại không chứa ký tự chữ cái`;
      } else {
        return '';
      }
    }
  }

  getValidateFormChangePasswordErrorMessage(field) {
    if (this.isProfileDetailPage == false) {
      if (this.formChangePassword.get(field).hasError('required')) {
        return `Không được để trống`;
      } else if (this.formChangePassword.get(field).hasError('email')) {
        return `Định dạng chưa chính xác`;
      } else if (this.formChangePassword.get(field).hasError('minlength')) {
        return `Có độ dài tối thiểu là ${this.formChangePassword.get(field).errors.minlength.requiredLength}`
      } else if (this.formChangePassword.get(field).hasError('maxlength')) {
        return `Có độ dài tối đa là ${this.formChangePassword.get(field).errors.maxlength.requiredLength}`
      } else {
        return '';
      }
    }
  }

  submitChangePassword() {
    this.submitted  = true;
    if(this.formChangePassword.invalid)
    {
      return ;
    }
    const {currentPassword, newPassword, retypeNewPassword} = this.formChangePassword.value;
    let result = this.userService.userChangePassword(currentPassword, newPassword, retypeNewPassword);
    result.subscribe((response) => {
      if(response.code == 200) { 
        this.isCurrentPasswordCorrect = true;
        this.isProfileDetailPage = true;
      }
      if(response.code == 202) this.isCurrentPasswordCorrect = false;
    })
  }

  uploadClick()
  {
    const dialogRef = this.dialog.open(ModalEditImageComponent, {
      width: '550px',
      data: {urlImage: this.testSrc}
    })

    dialogRef.afterClosed().subscribe(result => {
      if(!isNullOrUndefined(result))
      {
        const url = result;
        this.testSrc = url
        fetch(url)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], "File name",{ type: "image/png" })
            this.uploadToFireBase(file)
          })
      }
    });
  }

  async uploadToFireBase(file: File){
    try{
      this.userService.uploadUserImageToServer(file).subscribe((response) => {
        console.log(response);
        if(response.code === 200) {
          let create_at = new Date()
          let result = this.userService.uploadUserImage(response.url, create_at, create_at)
          result.subscribe((res) => {
            console.log(res)
          })
        }
      });
    }
    catch(error) {
      console.log('error: ' + error)
      
    }
  }

  onTabChange(value) {
    const prevIsProfileDetailPage = this.isProfileDetailPage;
    this.isProfileDetailPage = value === "profile-detail" ? true : false;
    if (prevIsProfileDetailPage !== this.isProfileDetailPage) {
      this.submitted = false;
    }
  };
}
