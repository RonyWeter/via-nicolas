import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BasePageComponent } from 'src/app/core/base-page-component';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { DataService } from 'src/app/shared/services/data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.css'],
})
export class TicketsListComponent extends BasePageComponent {
  searchText: string = '';
  tickets = this.data.tickets;
  filteredTickets = [...this.tickets]

  constructor(private router: Router, public data: DataService, private dialog: MatDialog, private cdr: ChangeDetectorRef, elementRef: ElementRef) {
    super(elementRef);
    console.log('CONSTRUCTED: ', this.constructor.name);
  }


  exportToExcel(): void {
    /* 1. Create a simplified data array for the Excel file */
    const exportData = this.tickets.map((t: any) => ({
      ID: t.id,
      Client: t.clientName,
      'Request Date': t.requestDate,
      'Travel Date': t.travelDate,
      Travellers: t.travellers,
      Tickets: t.ticketCount,
      Consultant: t.consultant,
      Itinerary: t.itinerary,
      Status: t.status
    }));

    /* 2. Convert the JSON data to a worksheet */
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);

    /* 3. Create a workbook and add the worksheet */
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tickets');

    /* 4. Generate the Excel file and trigger the download */
    XLSX.writeFile(workbook, 'Ticket_Requests_Export.xlsx');
  }

  createNewTicket() {
    this.router.navigate(['main/tickets/addNew']);
  }

  viewTicket(ticket: any) {
    this.router.navigate(['main/tickets/view'], {
      state: {
        data: {
          action: 'view',
          ticket: ticket
        }
      }
    })
  }

  editTicket(ticket: any) {
    this.router.navigate(['main/tickets/edit'], {
      state: {
        data: {
          action: 'edit',
          ticket: ticket
        }
      }
    })
  }

  deleteTicket(ticket: any) {
    this.dialog.open(ConfirmationComponent, {
      disableClose: true,
      data: {
        message: `Are you sure you want to Delete Ticket ?`
      }
    }).afterClosed().subscribe(response => {
      if (response) {
        const index = this.data.tickets.findIndex(x => x.id === ticket.id);
        console.log(index)
        if (index > -1) {
          this.data.tickets.splice(index, 1);
          this.cdr.detectChanges();
          console.log("this.data.tickets=",this.data.tickets);
          this.filteredTickets = [...this.data.tickets]
        }
      }
    })
  }

  applyFilter() {

    const search = this.searchText.toLowerCase().trim();
    console.log("search=", search)
    if (!search) {
      console.log("testttt")
      this.filteredTickets = [...this.tickets];
      return;
    }

    this.filteredTickets = this.tickets.filter((ticket: any) => {
      return (
        ticket.id?.toString().toLowerCase().includes(search) ||
        ticket.clientName?.toLowerCase().includes(search) ||
        ticket.travellers?.toLowerCase().includes(search) ||
        ticket.itinerary?.toLowerCase().includes(search) ||
        ticket.consultant?.toLowerCase().includes(search)
      );
    });
    this.cdr.detectChanges();
  }
}
