import { DialogRef } from '@angular/cdk/dialog';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { retry } from 'rxjs';
import { BasePageComponent } from 'src/app/core/base-page-component';
import { DataService } from 'src/app/shared/services/data.service';
import { convertDateToString, convertStringToDate, isEmptyOrNull } from 'src/app/shared/utils';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent extends BasePageComponent implements OnInit {
  ticketForm = new FormGroup({
    clientName: new FormControl('', Validators.required),
    clientEmail: new FormControl('', [Validators.email, Validators.required]),
    travelDate: new FormControl('', Validators.required),
    requestDate: new FormControl('', Validators.required),
    travellers: new FormControl('', Validators.required),
    ticketCount: new FormControl('', [Validators.required, Validators.min(1)]),
    cost: new FormControl('', [Validators.required, Validators.min(1)]),
    sell: new FormControl('', [Validators.required, Validators.min(1)]),
    profit: new FormControl(''),
    consultant: new FormControl('', Validators.required),
    itinerary: new FormControl('', Validators.required),
    notes: new FormControl(['']),
  });

  screenData: any;

  constructor(private router: Router, elementRef: ElementRef, private data: DataService) {
    super(elementRef)
  }

  ngOnInit(): void {
    this.screenData = history?.state?.data;

    if (!isEmptyOrNull(this.screenData)) {
      const response = this.screenData.ticket;
      this.ticketForm?.patchValue({
        clientName: response.clientName,
        clientEmail: response.clientEmail,
        travelDate: convertStringToDate(response.travelDate),
        requestDate: convertStringToDate(response.requestDate),
        travellers: response.travellers,
        ticketCount: response.ticketCount,
        cost: response.cost,
        sell: response.sell,
        profit: response.profit,
        consultant: response.consultant,
        itinerary: response.itinerary,
        notes: response.notes
      }, { emitEvent: false });

      if (this.screenData.action === 'view') {
        this.ticketForm?.disable({ emitEvent: false });
      }
    }

    this.ticketForm?.valueChanges.subscribe(() => {
      const cost = this.ticketForm.get('cost')?.value || 0;
      const sell = this.ticketForm.get('sell')?.value || 0;
      const profit: any = Number(sell) - Number(cost);
      this.ticketForm.get('profit')?.setValue(profit, { emitEvent: false });
    });
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      const { requestDate, travelDate } = this.ticketForm.value;
      if (!isEmptyOrNull(this.screenData)) {
        const index = this.data.tickets.findIndex(x => x.id === this.screenData.ticket.id);
        this.data.tickets[index] = {
          id: this.screenData.ticket.id,
          ...this.ticketForm.value,
          requestDate: convertDateToString(requestDate!),
          travelDate: convertDateToString(travelDate!),
        }
      } else {
        const item = {
          id: this.data.tickets.length + 1,
          ...this.ticketForm.value,
          requestDate: convertDateToString(requestDate!),
          travelDate: convertDateToString(travelDate!),
        }
        this.data.tickets.push(item);
      }
      this.router.navigate(['main/tickets']);
    }
  }

  goBack() {
    this.router.navigate(['main/tickets']);
  }

  isFormValid() {
    return this.ticketForm.valid
  }

  onDateChange() {
  }
}
