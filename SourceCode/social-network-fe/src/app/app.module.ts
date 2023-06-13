import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';

import { LY_THEME, LY_THEME_NAME, LyHammerGestureConfig, LyTheme2, StyleRenderer } from '@alyle/ui';
import { LyButtonModule } from '@alyle/ui/button';
import { LyImageCropperModule } from '@alyle/ui/image-cropper';
import { MinimaLight } from '@alyle/ui/themes/minima';
import { LyToolbarModule } from '@alyle/ui/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import {
  AngularFireStorageModule
} from "@angular/fire/storage";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { NgxCaptchaModule } from 'ngx-captcha';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ChatService } from 'src/common/service/chat.service';
import { CommentService } from 'src/common/service/comment.service';
import { environment } from 'src/environments/environment';
import { AppComponentComponent } from './app-component/app-component.component';
import { AppRoutingModule } from './app-routing.module';
import { NavBarCoverModule } from './components/navbar/navbar-cover/navbar-cover.module';
import { HomeScreenModule } from './screen/home-screen/home-screen.module';
import { LoginScreenModule } from './screen/login-screen/login-screen.module';
import { MessengerScreenModule } from './screen/messenger-screen/messenger-screen.module';
import { PeopleFriendScreenModule } from './screen/people/people-friend-screen/people-friend-screen.module';
import { PeopleSuggessScreenModule } from './screen/people/people-suggess-screen/people-suggess-screen.module';
import { PostDetailScreenModule } from './screen/post-detail-screen/post-detail-screen.module';
import { ProfileScreenModule } from './screen/profile-screen/profile-screen.module';


const config: SocketIoConfig = { url: 'http://localhost:4000', options: {}};

@NgModule({
  declarations: [

  // // NavbarCoverComponent,

  // NavbarItemComponent,

  // SafeAreaComponent,

  AppComponentComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginScreenModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ProfileScreenModule,
    HomeScreenModule,
    NavBarCoverModule,
    MessengerScreenModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    AngularFireStorageModule,
    HammerModule,
    LyButtonModule,
    LyToolbarModule,
    LyImageCropperModule,
    Ng2ImgMaxModule,
    PeopleSuggessScreenModule,
    SocketIoModule.forRoot(config),
    PostDetailScreenModule,
    PeopleFriendScreenModule,
    NgxCaptchaModule
  ],
  providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig }, StyleRenderer, LyTheme2, { provide: LY_THEME_NAME, useValue: 'minima-light' }, { provide: LY_THEME, useClass: MinimaLight, multi: true }, CommentService, ChatService],
  bootstrap: [AppComponentComponent],
  exports: [NgxCaptchaModule]
})
export class AppModule { }
