import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service'; 

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username : string = '';
  password : string = '' ;

  constructor(private service : LoginService, private router : Router) { }

  ngOnInit() {

  }

  login() {
    this.service.login(this.username, this.password).subscribe((data) =>{
      if (data.response == 1 ) {
        sessionStorage.setItem('profile Name', data.profile); 
        sessionStorage.setItem('logged', 'true'); 
        sessionStorage.setItem('priority', data.priority);
        this.router.navigate(['/lobby']); 
      } else  if(data.response == 2){
        alert('already logged in'); 
      } else {
        alert('incorrect details');
      }
    });
  }

}
