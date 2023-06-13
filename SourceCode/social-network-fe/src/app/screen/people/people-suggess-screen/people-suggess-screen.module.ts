import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarCoverModule } from 'src/app/components/navbar/navbar-cover/navbar-cover.module';
import { PeopleSuggessScreenComponent } from './people-suggess-screen.component';
import { FormsModule } from '@angular/forms';
import { UsersService } from 'src/common/service/users.service';



@NgModule({
  declarations: [
    PeopleSuggessScreenComponent
  ],
  imports: [
    CommonModule,
    NavBarCoverModule,
    FormsModule,
    
  ],
  providers: [UsersService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class PeopleSuggessScreenModule { }
