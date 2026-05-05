import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { RequestComponent } from '../request/request.component';
import { BasePageComponent } from 'src/app/core/base-page-component';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent extends BasePageComponent {


  animationState = false;
  requests = this.data.requests;

  searchText: string = '';
  filteredRequests = [...this.requests];

  constructor(private dialog: MatDialog, private cdr: ChangeDetectorRef, elementRef: ElementRef, private data: DataService) {
    super(elementRef);
  }

  applyFilter() {
    const search = this.searchText.toLowerCase().trim();

    if (!search) {
      this.filteredRequests = [...this.requests];
      return;
    }

    this.filteredRequests = this.requests.filter(o =>
      o.id.toString().toLowerCase().includes(search) ||
      o.desc.toLowerCase().includes(search) ||
      o.cost == Number(search) ||
      o.sell == Number(search)
    );
    this.cdr.detectChanges();
  }

  deleteRequest(request: any) {
    this.dialog.open(ConfirmationComponent, {
      disableClose: true,
      data: {
        message: `Are you sure you want to Delete Request ?`
      }
    }).afterClosed().subscribe(response => {
      if (response) {
        const index = this.data.requests.findIndex(x => x.id === request.id);
        console.log(index)
        if (index > -1) {
          this.data.requests.splice(index, 1);
          this.cdr.detectChanges();
          this.filteredRequests = [...this.data.requests]
        }
      }
    })
  }

  createNewRequest() {
    this.dialog.open(RequestComponent, {
      disableClose: true,
      maxHeight: '90vh',
      width: '120vh'
    }).afterClosed().subscribe(response => {
      this.filteredRequests = [...this.data.requests]
    })
  }

  editRequets(request: any) {
    this.dialog.open(RequestComponent, {
      disableClose: true,
      maxHeight: '90vh',
      width: '120vh',
      data: request
    }).afterClosed().subscribe(response => {
      this.filteredRequests = [...this.data.requests]
    })
  }
}
