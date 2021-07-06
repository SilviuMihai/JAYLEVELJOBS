import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {

  baseUrl = 'https://localhost:5001/api/';
  validationErrors: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }


  //Not-Found Error
  get404Error(){
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe(response => {
      console.log(response);
    },error =>{
      console.log(error)
    });
  }

  //Bad-Request Error
  get400Error(){
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe(response => {
      console.log(response);
    },error =>{
      console.log(error)
    });
  }

  //Server Error
  get500Error(){
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe(response => {
      console.log(response);
    },error =>{
      console.log(error)
    });
  }

  //Unauthorized Error
  get401Error(){
    this.http.get(this.baseUrl + 'buggy/auth').subscribe(response => {
      console.log(response);
    },error =>{
      console.log(error)
    });
  }

   //Validation Error
   get400ValidationError(){
    this.http.post(this.baseUrl + 'account/register', {}).subscribe(response => {
      console.log(response);
    },error =>{
      console.log(error)
      this.validationErrors = error;
    });
  }

}
