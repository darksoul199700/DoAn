import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { NavbarLeftComponent } from './navbar-left.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NavbarLeftComponent],
  exports: [NavbarLeftComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class NavbarLeftModule {}
