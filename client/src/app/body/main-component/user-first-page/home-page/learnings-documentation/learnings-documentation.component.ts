import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learnings-documentation',
  templateUrl: './learnings-documentation.component.html',
  styleUrls: ['./learnings-documentation.component.css']
})
export class LearningsDocumentationComponent implements OnInit {

  isCollapsed = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
