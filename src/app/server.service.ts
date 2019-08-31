import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'; 
import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private socket ; 
  private url = 'http://localhost:3000'; 
  constructor(private http:HttpClient) { 
    this.socket = io(this.url); 
  }
  // get a list of created rooms from the server to give to the lobby page 
  getRooms() {
    return Observable.create((observer) =>{
      this.socket.on('new-room', (room) =>{
        observer.next(room);
      })
    });

  }

  // create a room 
  createRoom(roomName) {
    this.socket.emit('room', roomName);  
  }

  oneTimeRoom() {
    return Observable.create((observer) =>{
      this.socket.on('list of rooms', (room) =>{
        observer.next(room);
      })
    });
  }

  message(message,room, profile) {
    var response = {name : profile, message: message} ;
    this.socket.emit('new-message',response,room); 
  }

  join(room, userName) {
    var data = {'username': userName,'room': room}
    this.socket.emit('join', data); 
  }

  receivedMessage() {
    return Observable.create((observer) =>{
      this.socket.on('message sent', (message) => {
        observer.next(message);  
      });
    }); 
  }

  listOfPeopleInGroup() {
    return Observable.create((observer) =>{
      this.socket.on('list of names in group', (message) => {
        observer.next(message);  
      });
    }); 
  }

  onDisconnect() {
    return Observable.create((observer) =>{
      this.socket.on('disconnect', (message) => {
        observer.next(message);  
      });
    }); 
  }

  getRoomList() {
    return Observable.create((observer) =>{
      this.socket.emit('list of rooms'); 
      this.socket.on('list of rooms', (data) =>{
        observer.next(data);
      }); 
    }); 
  }
  
}
