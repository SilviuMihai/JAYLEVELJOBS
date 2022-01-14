import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-learnings-documentation',
  templateUrl: './learnings-documentation.component.html',
  styleUrls: ['./learnings-documentation.component.css'],
})
export class LearningsDocumentationComponent implements OnInit {

  size = [1,2,3,4,5];
 
  
  constructor() { }

  ngOnInit(): void {
  }

}
