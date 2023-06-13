import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { UsersService } from 'src/common/service/users.service';
import { ModalPostStatusComponent } from './modal-post-status.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [CommonModule, FormsModule, MatDialogModule],
  declarations: [ModalPostStatusComponent],
  exports: [ModalPostStatusComponent],
  providers: [UsersService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})

export class ModalPostStatusModule {}
