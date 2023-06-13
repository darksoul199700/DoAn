import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleFriendScreenComponent } from './people-friend-screen.component';
import { NavBarCoverModule } from 'src/app/components/navbar/navbar-cover/navbar-cover.module';
import { UsersService } from 'src/common/service/users.service';
import { FormsModule } from '@angular/forms';
import { PostContentModule } from 'src/app/components/cards/post-content/post-content.module';



@NgModule({
  declarations: [PeopleFriendScreenComponent],
  imports: [
    CommonModule,
    NavBarCoverModule,
    FormsModule,
    PostContentModule
  ],
  exports: [PeopleFriendScreenComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [UsersService]
})
export class PeopleFriendScreenModule { }
