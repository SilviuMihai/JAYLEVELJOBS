import { Component, HostListener, OnInit,  OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharingDataServiceService } from 'src/app/_services/shared/sharing-data-service.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  isCollapsed = false;
  getScreenWidth: any;
  showLogo = true;

  constructor(private sharedDataService: SharingDataServiceService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.sharedDataService.currentMessage.subscribe(response => this.isCollapsed = response);
  }

  
  
  

}
