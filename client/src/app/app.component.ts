import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Client APP';
  users:any;

  constructor(private http: HttpClient){}

  ngOnInit() {
    this.getUsers();
  }

  getUsers()
  {
    this.http.get('https://localhost:5001/api/user').subscribe(getusers => this.users = getusers,
    error => {
      console.log(error);
    });
  }
}
