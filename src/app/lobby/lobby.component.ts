import { Component, OnInit, ChangeDetectionStrategy , HostListener, OnDestroy} from '@angular/core';
import {ServerService } from '../server.service'; 
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'], 
  changeDetection: ChangeDetectionStrategy.Default
})
export class LobbyComponent implements OnInit {
  // newRoom is the name of the room the user will create
  newRoom:string = ''; 
  //chatRoom is a list of already created room including name 
  chatRoom = []; 
  profileName :string = ''; 
  priority : string = ''; 
  constructor(private rooms : ServerService, private route : Router) {}


  ngOnInit() {
    const check = sessionStorage.getItem('logged'); 
    if(check == 'true') {
      sessionStorage.setItem('logged', 'false'); 
    } else {
      this.route.navigate(['/login']).then(function() {
        alert('not logged in'); 
      });
    }
    this.profileName = sessionStorage.getItem('profile Name'); 
    this.priority = sessionStorage.getItem('priority');
    this.rooms.getRoomList().subscribe((data) =>{
      this.chatRoom = data; 
    });

    this.rooms
    .getRooms()
    .subscribe((message: string) => {
      //console.log(`message is after a new room is crated ${message}`);  
      this.chatRoom.push(message);
      //console.log(`chat room is after a room is created ${this.chatRoom}`);
      console.log(`this is the chat room list now ${this.chatRoom}`);
    });
  }

  room() {
    this.rooms.createRoom(this.newRoom); 
  }

  gotToRoom(roomName) {
    this.route.navigate([`/room/${roomName}/${this.profileName}/${this.priority}`]); 
  }

}
