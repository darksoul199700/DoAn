import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Injectable, NgModule } from "@angular/core";
import { NavBarCoverModule } from 'src/app/components/navbar/navbar-cover/navbar-cover.module';
import { HomeScreenComponent } from './home-screen.component';
import { NavbarLeftMainModule } from 'src/app/components/navbar/navbar-left-main/navbar-left-main.module'
import { ModalPostStatusModule } from 'src/app/components/modal/modal-post-status/modal-post-status.module';
import { PostContentModule } from 'src/app/components/cards/post-content/post-content.module';
import { UsersService } from 'src/common/service/users.service';
import { Socket, SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { BrowserModule } from '@angular/platform-browser';
import { CommentService } from 'src/common/service/comment.service';
import { NotificationService } from 'src/common/service/notification.service';

@NgModule({
  imports: [
    CommonModule,
    NavBarCoverModule,
    NavbarLeftMainModule,
    ModalPostStatusModule,
    PostContentModule,
    BrowserModule,
    SocketIoModule
  ],
  declarations: [HomeScreenComponent],
  providers: [UsersService, CommentService, NotificationService ],
  exports: [HomeScreenComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [HomeScreenComponent]
})

export class HomeScreenModule {}
