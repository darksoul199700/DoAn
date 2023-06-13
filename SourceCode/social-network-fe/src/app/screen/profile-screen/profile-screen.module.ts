import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModalEditImageModule } from 'src/app/components/modal/modal-edit-image/modal-edit-image.module';
import { NavBarCoverModule } from 'src/app/components/navbar/navbar-cover/navbar-cover.module';
import { NavbarLeftModule } from 'src/app/components/navbar/navbar-left/navbar-left.module';
import { UsersService } from 'src/common/service/users.service';
import { ProfileScreenComponent } from './profile-screen.component';

@NgModule({
  imports: [
    CommonModule,
    NavBarCoverModule,
    NavbarLeftModule,
    ReactiveFormsModule,
    FormsModule,
    ModalEditImageModule,
    MatIconModule,
    MatTooltipModule
  ],
  declarations: [ProfileScreenComponent],
  exports: [ProfileScreenComponent, MatIconModule, MatTooltipModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [ProfileScreenComponent],
  providers: [UsersService]
})

export class ProfileScreenModule {}
