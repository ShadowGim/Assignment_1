import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LobbyComponent } from './lobby/lobby.component'; 
import { RoomsComponent } from './rooms/rooms.component'; 
import { LoginComponent} from './login/login.component' ; 
const routes: Routes = [
  {path: '', component:LoginComponent}, 
  {path : 'lobby', component : LobbyComponent},
  {path : 'room/:rooms/:name/:priority', component:RoomsComponent},
  {path : 'login', component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
