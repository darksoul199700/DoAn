import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/common/service/login.service';

@Component({
  selector: 'app-access-box',
  templateUrl: './access-box.component.html',
  styleUrls: ['./access-box.component.css']
})
export class AccessBoxComponent implements OnInit {

  registForm: FormGroup
  loginForm: FormGroup
  submitted = false
  test: any
  username: string = null
  isShowLogin = false
  isShowRegis = false
  errorMessage = ''

  constructor(
    private fb:FormBuilder,
    private loginService: LoginService,
    private router: Router,


    ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      recaptcha: ['', Validators.required]
    })

    this.registForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]],
    }, {validators: [this.checkPasswordsIsComplex, this.checkPasswords]})
  }

  ngOnInit(): void {};

  checkPasswordsIsComplex: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password').value;
    if (pass.match(/^(?=.*?[a-z])(.{13,}|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16})$/)) {
      return null;
    } else {
      group.get('password').setErrors({unSecure: true});
      return { unSecure: true }
    }
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password').value;
    let confirmPass = group.get('repassword').value
    if (pass === confirmPass) {
      return null;
    } else {
      group.get('repassword').setErrors({notSame: true});
      return { notSame: true }
    }
  }

  submitLoginForm(){

    this.submitted = true;

    if(this.loginForm.invalid){
      console.log("form invalid")
      this.isShowLogin = true
      return ;
    }
    this.isShowLogin = false
    let username = this.loginForm.value.username
    let password = this.loginForm.value.password

    var result = this.loginService.userLogin(username, password)
    result.subscribe((response) => {
      
      if(response.code == 200) {
        localStorage.setItem('currentUser', JSON.stringify({token: response.accessToken}))
        this.router.navigate(['/index'])
      } else {
        this.errorMessage = response.message
        console.log(this.errorMessage)
      }
    })



  }

  validateRequired(field) {
    if (this.loginForm.get(field).status === "INVALID" && this.isShowLogin == true) {
        return true;
    } else {
        return false;
    }
  }

  validateRequiredRegis(field) {
    if (this.registForm.get(field).status === "INVALID" && this.isShowRegis == true) {
      return true;
    } else {
      return false;
    }
  }

  getValidateRegisErrorMessage(field) {
    if (this.isShowRegis == true) {
      if (this.registForm.get(field).hasError('required')) {
        return `Không được để trống`;
      } else if (this.registForm.get(field).hasError('email')) {
        return `Định dạng chưa chính xác`;
      } else if (this.registForm.get(field).hasError('minlength')) {
        return `Có độ dài tối thiểu là ${this.registForm.get(field).errors.minlength.requiredLength}`
      } else if (this.registForm.get(field).hasError('maxlength')) {
        return `Có độ dài tối đa là ${this.registForm.get(field).errors.maxlength.requiredLength}`
      } else if (this.registForm.get(field).hasError('unSecure')) {
        return 'Mật khẩu phải có ít nhất một ký tự hoa, ký tự số, ký tự đặc biệt, độ dài tối thiếu là 8, tối đa là 16'
      } else if (this.registForm.get(field).hasError('notSame')) {
        return 'Nhập lại mật khẩu phải trùng với mật khẩu'
      } else {
        return '';
      }
    }
  }

  getValidateLoginErrorMessage(field) {
    console.log(field)
    if (this.isShowRegis == false) {
      if (this.loginForm.get(field).hasError('required')) {
        return `Không được để trống`;
      } else if (this.loginForm.get(field).hasError('email')) {
        return `Định dạng chưa chính xác`;
      } else if (this.loginForm.get(field).hasError('minlength')) {
        return `Có độ dài tối thiểu là ${this.loginForm.get(field).errors.minlength.requiredLength}`
      } else if (this.loginForm.get(field).hasError('maxlength')) {
        return `Có độ dài tối đa là ${this.loginForm.get(field).errors.maxlength.requiredLength}`
      } else {
        return '';
      }
    }
  }

  submitReigsform() {
    this.submitted = true;
    if(this.registForm.invalid){
      this.isShowRegis = true
    }
    else {
      this.isShowRegis = false
      let username = this.registForm.value.username
      let email = this.registForm.value.email
      let password = this.registForm.value.password

      var result = this.loginService.userRegister(username, password, email)
      result.subscribe((response) => {
        if(response.code == 200) {
          this.toggleForm()
        }
        else {
          console.log(response)
        }
      })
    }
    
    
  }

  toggleForm() {
    this.submitted = false;
    var container = document.querySelector('.sign-up');
      container.classList.toggle('active');
    var container2 = document.querySelector('.sign-in');
      container2.classList.toggle('active');
  }

  handleSuccess(event) {

  }

}
