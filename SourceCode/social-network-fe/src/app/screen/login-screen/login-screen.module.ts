import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AccessBoxComponent } from 'src/app/components/access-box/access-box.component';
import { LoginService } from 'src/common/service/login.service';
import { LoginScreenComponent } from './login-screen.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    NgxCaptchaModule
  ],
  declarations: [AccessBoxComponent, LoginScreenComponent],
  providers: [LoginService],
  exports: [AccessBoxComponent, ReactiveFormsModule, NgxCaptchaModule]
})

export class LoginScreenModule{}
