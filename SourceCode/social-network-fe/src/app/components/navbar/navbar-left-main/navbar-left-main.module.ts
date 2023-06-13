import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { NavbarLeftMainComponent } from './navbar-left-main.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NavbarLeftMainComponent],
  exports: [NavbarLeftMainComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class NavbarLeftMainModule {}
