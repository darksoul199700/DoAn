import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgImageSliderModule } from 'ng-image-slider';
import { NotificationService } from 'src/common/service/notification.service';
import { PostService } from 'src/common/service/post.service';
import { UsersService } from 'src/common/service/users.service';
import { PostContentComponent } from './post-content.component';

@NgModule({
  imports: [CommonModule, FormsModule, NgImageSliderModule, ReactiveFormsModule],
  declarations: [PostContentComponent],
  exports: [PostContentComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [UsersService, PostService, NotificationService]
})

export class PostContentModule {}
