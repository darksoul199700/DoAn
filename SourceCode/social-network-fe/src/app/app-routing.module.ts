import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginScreenComponent } from './screen/login-screen/login-screen.component';
import { HomeScreenComponent } from './screen/home-screen/home-screen.component';
import { ProfileScreenComponent } from './screen/profile-screen/profile-screen.component';
import { PeopleSuggessScreenComponent } from './screen/people/people-suggess-screen/people-suggess-screen.component';
import { MessengerScreenComponent } from './screen/messenger-screen/messenger-screen.component';
import { PostDetailScreenComponent } from './screen/post-detail-screen/post-detail-screen.component';
import { PeopleFriendScreenComponent } from './screen/people/people-friend-screen/people-friend-screen.component';

const routes: Routes = [
  {
    path: "login", component: LoginScreenComponent
  },
  {
    path: "index", component: HomeScreenComponent
  },
  {
    path: "", component: LoginScreenComponent
  },
  {
    path: "profile", component: ProfileScreenComponent
  },
  {
    path: "people", component: PeopleSuggessScreenComponent
  },
  {
    path: "messenger", component: MessengerScreenComponent
  },
  {
    path: "post-detail", component: PostDetailScreenComponent
  },
  {
    path: "people/detail", component: PeopleFriendScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
