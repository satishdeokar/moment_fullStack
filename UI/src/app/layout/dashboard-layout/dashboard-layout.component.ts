import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { LocalStorageService } from 'src/app/core/data-services/local-storage.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  userDetails:any;
  fillerNav = [
    { name: 'Create Moment', route: '/dashboard/moments/create-moment', icon: 'list' },
    { name: 'Moment List', route: '/dashboard/moments/moment-list', icon: 'list' }
  ];

  fillerContent = Array.from({ length: 10 }, () =>
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua.`);

  private mobileQueryListener: () => void;

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private localStorage:LocalStorageService
    ) {
      
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

}
