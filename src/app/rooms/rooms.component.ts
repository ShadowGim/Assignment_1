import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from '../server.service'; 

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit { 
  constructor(private route : ActivatedRoute, private link: Router, private server : ServerService) { }
  
  
  roomName ;
  chatMessage = []; 
  message:string = '';
  profileName : string = ''; 
  groupPeople = [];
  priority : string = '';
  ngOnInit() {
    this.roomName = this.route.snapshot.paramMap.get('rooms'); 
    if(this.roomName == null) {
      this.link.navigate([`/login`]);
    }
    this.profileName = this.route.snapshot.paramMap.get('name'); 
    this.priority = this.route.snapshot.paramMap.get('priority'); 
    this.server.join(this.roomName, this.profileName); 
    this.server.listOfPeopleInGroup().subscribe((data) =>{
      this.groupPeople = []; 
      console.log(data);
      this.groupPeople.push(data);
    })
    this.server.onDisconnect().subscribe((message) =>{
      this.link.navigate(['/login']);
    });
    // create an oberserver that watches the new messahge frequency and updates the uni when
    // a new message is recieved
    this.server
    .receivedMessage()
    .subscribe((message) => {
      this.chatMessage.push({"name": message.name, "message": message.message});
      console.log(this.chatMessage);
    });

  }

  sendMessage() {
    this.server.message(this.message, this.roomName, this.profileName); 
    this.message = '';
  }
}
