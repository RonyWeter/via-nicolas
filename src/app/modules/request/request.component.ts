import { AfterViewInit, Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BasePageComponent } from 'src/app/core/base-page-component';
import { DataService } from 'src/app/shared/services/data.service';
import { isEmptyOrNull, convertDateToString, convertStringToDate } from 'src/app/shared/utils';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent extends BasePageComponent implements OnInit {

  requestForm = new FormGroup({
    desc: new FormControl('', Validators.required),
    cost: new FormControl('', [Validators.required, Validators.min(1)]),
    sell: new FormControl('', [Validators.required, Validators.min(1)]),
    profit: new FormControl(0),
    date: new FormControl('', Validators.required),
  });
  constructor(public dialogRef: MatDialogRef<RequestComponent>, @Inject(MAT_DIALOG_DATA) public request: any, ElementRef: ElementRef, private dataservice: DataService) {
    super(ElementRef)
  }
  ngOnInit(): void {
    if (!isEmptyOrNull(this.request)) {
      this.requestForm?.patchValue({
        desc: this.request.desc,
        cost: this.request.cost,
        sell: this.request.sell,
        date: convertStringToDate(this.request.date),
        profit: this.request.profit,
      }, { emitEvent: false });
    }

    this.requestForm?.valueChanges.subscribe(() => {
      const cost = this.requestForm.get('cost')?.value || 0;
      const sell = this.requestForm.get('sell')?.value || 0;
      const profit: any = Number(sell) - Number(cost);
      this.requestForm.get('profit')?.setValue(profit, { emitEvent: false });
    });
  }


  onSubmit() {
    if (this.requestForm.valid) {
      const { date } = this.requestForm.value;
      if (!isEmptyOrNull(this.request)) {
        const index = this.dataservice.requests.findIndex(x => x.id === this.request.id);
        this.dataservice.requests[index] = {
          id: this.request.id,
          ...this.requestForm.value,
          date: convertDateToString(date!),
        }
      } else {
        const item = {
          id: this.dataservice.requests.length + 1,
          ...this.requestForm.value,
          date: convertDateToString(date!),
        }
        this.dataservice.requests.push(item);
      }
      this.dialogRef.close()
    }
  }

  isFormValid() {
    return this.requestForm.valid
  }
}
