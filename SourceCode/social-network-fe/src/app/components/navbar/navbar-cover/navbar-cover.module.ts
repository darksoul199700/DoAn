import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { UsersService } from 'src/common/service/users.service';
import { NavbarCoverComponent } from './navbar-cover.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NavbarCoverComponent],
  exports: [NavbarCoverComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [UsersService]
})

export class NavBarCoverModule {}
