import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ApplicationRef, ChangeDetectorRef, Component, ElementRef, inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, filter, map, shareReplay, takeUntil } from 'rxjs';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  selectedItem = 'Dashboard';
  items = [
    {
      name: 'Dashboard',
      router: 'main/',
      icon: 'fas fa-chart-pie'
    },
    {
      name: 'Tickets',
      router: 'main/tickets',
      icon: 'fas fa-ticket'
    },
    {
      name: 'Other',
      router: 'main/other',
      icon: 'fa-solid fa-dollar-sign'
    }
  ]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  constructor(private dialog: MatDialog, private hostElement: ElementRef, private appRef: ApplicationRef, private ngZone: NgZone, public router: Router, private cdr: ChangeDetectorRef, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    if (this.router.url.includes('tickets')) {
      this.selectedItem = 'Tickets';
    }
    else if (this.router.url.includes('other')) {
      this.selectedItem = 'Other';
    }
    else {
      this.selectedItem = 'Dashboard';
    }
  }

  selectItem(name: string) {
    this.selectedItem = name;
    this.executeNavigation(name);
  }

  private executeNavigation(name: string) {
    const selectedObj = this.items.find(x => x.name === name);
    if (selectedObj) {
      this.router.navigate([selectedObj.router]);
    }
  }


  onLogout() {
    console.log('User signed out');
    this.dialog.open(ConfirmationComponent, {
      disableClose: true,
      data: {
        message: `Are you sure you want to Logout ?`
      }
    }).afterClosed().subscribe(response => {
      if(response){
        this.router.navigate([''])
      }
    })
  }
}
