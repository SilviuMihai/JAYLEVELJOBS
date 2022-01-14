import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharingDataServiceService } from 'src/app/_services/shared/sharing-data-service.service';

@Component({
  selector: 'app-footer-bar',
  templateUrl: './footer-bar.component.html',
  styleUrls: ['./footer-bar.component.css']
})
export class FooterBarComponent implements OnInit, OnDestroy {

  isCollapsedSideBar = false;
  subscription: Subscription;

  constructor(private sharedDataService: SharingDataServiceService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.sharedDataService.currentMessage.subscribe(response => this.isCollapsedSideBar = response);
  }

  
}
