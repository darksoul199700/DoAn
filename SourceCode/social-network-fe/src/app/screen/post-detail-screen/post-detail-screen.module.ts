import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailScreenComponent } from './post-detail-screen.component';
import { CommentService } from 'src/common/service/comment.service';
import { UsersService } from 'src/common/service/users.service';
import { NavBarCoverModule } from 'src/app/components/navbar/navbar-cover/navbar-cover.module';
import { HomeScreenComponent } from '../home-screen/home-screen.component';
import { PostContentModule } from 'src/app/components/cards/post-content/post-content.module';
import { NgImageSliderModule } from 'ng-image-slider';
import { PostService } from 'src/common/service/post.service';
import { NotificationService } from 'src/common/service/notification.service';



@NgModule({
  declarations: [PostDetailScreenComponent],
  imports: [
    CommonModule,
    NavBarCoverModule,
    PostContentModule,
    NgImageSliderModule
  ],
  exports: [PostDetailScreenComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [UsersService, CommentService, PostService, NotificationService ],
  bootstrap: [PostDetailScreenComponent]
})
export class PostDetailScreenModule { }
