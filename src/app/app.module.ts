import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LobbyComponent } from './lobby/lobby.component';
import { RoomsComponent } from './rooms/rooms.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    RoomsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
