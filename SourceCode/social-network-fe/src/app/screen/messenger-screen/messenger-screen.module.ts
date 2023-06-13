import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { NavBarCoverModule } from 'src/app/components/navbar/navbar-cover/navbar-cover.module';
import { ChatService } from 'src/common/service/chat.service';
import { UsersService } from 'src/common/service/users.service';
import { MessengerScreenComponent } from './messenger-screen.component';


@NgModule({
    imports: [
        CommonModule,
        NavBarCoverModule,
        FormsModule,
        BrowserModule,
        SocketIoModule
    ],
    declarations: [
        MessengerScreenComponent
    ],
    exports: [
        MessengerScreenComponent
    ],
    providers: [ChatService, UsersService],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    bootstrap: [MessengerScreenComponent]
})

export class MessengerScreenModule {}