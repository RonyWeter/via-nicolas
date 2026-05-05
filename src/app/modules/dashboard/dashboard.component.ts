import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BasePageComponent } from 'src/app/core/base-page-component';
import { DataService } from 'src/app/shared/services/data.service';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BasePageComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [],
        label: 'Tickets Number',
        borderColor: '#58b9e6',
        pointBackgroundColor: '#58b9e6',
        tension: 0.3
      }
    ]
  };
  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true }
    }
  };


  public reqChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [],
        label: 'Requests Number',
        backgroundColor: '#58b9e6',
        borderRadius: 5,
        maxBarThickness: 20,
      }
    ]
  };

  public reqChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false } // Cleaner look
      },
      x: {
        grid: { display: false }
      }
    },
    plugins: {
      legend: { display: false } // Often cleaner for single-dataset bars
    }
  };

  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Stripe Inc', 'Gala SARL', 'Wozel & Co. LLP', 'UK&A Services LLC', 'Business Technologies I'],
    datasets: [
      {
        data: [33.5, 22.4, 20.8, 19.4, 3.9], // Based on your image percentages
        backgroundColor: [
          '#FF7E7E', // Stripe Inc (Darker pink/coral)
          '#FF9F9F', // Gala SARL
          '#FFB6B6', // Wozel & Co. LLP
          '#FFCDCD', // UK&A Services LLC
          '#FFE4E4'  // Business Technologies I (Lightest)
        ],
        borderWidth: 2,
        borderColor: '#ffffff', // Adds the clean white gaps between segments
        hoverOffset: 10 // Makes segment pop out on hover
      }
    ]
  };

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    cutout: '60%', // Matches the thickness in your image
    plugins: {
      legend: {
        position: 'right', // Moves legend to the right like your image
        labels: {
          usePointStyle: true, // Makes legend icons circles
          padding: 20
        }
      }
    }
  };
  constructor(elementRef: ElementRef, private data: DataService, private cdr: ChangeDetectorRef) {
    super(elementRef);
  }
  ngOnInit(): void {
    this.updateTicketChartData();
    this.updateRequestChartData();
    this.updateDoughnutChart()
  }

  getTotal(type: string) {
    let sum = 0;
    switch (type) {
      case 'tickets':
        this.data.tickets.forEach(element => {
          sum = sum + element.ticketCount;
        });
        return sum;
      case 'request':
        return this.data.requests.length;
      case 'profit':
        let ticketsProfit = 0;
        let requestProfit = 0;
        this.data.tickets.forEach(element => {
          ticketsProfit = ticketsProfit + element.profit;
        });
        this.data.requests.forEach(element => {
          requestProfit = requestProfit + element.profit;
        });
        return ticketsProfit + requestProfit
      default:
        return null;
    }
  }
  updateTicketChartData() {
    const currentYear = 2026;
    const monthlyCounts = new Array(12).fill(0);

    // Safety check to ensure data and tickets exist
    if (!this.data || !this.data.tickets) return;

    this.data.tickets.forEach(ticket => {
      const dateParts = ticket.requestDate.split('/');
      const month = parseInt(dateParts[1], 10) - 1;
      const year = parseInt(dateParts[2], 10);

      if (year === currentYear) {
        monthlyCounts[month] += ticket.ticketCount;
        console.log("dss")
      }
    });

    // Assign the new array to the existing structure
    this.lineChartData.datasets[0].data = monthlyCounts;

    // Use the ViewChild update if you have it, otherwise detectChanges
    this.chart?.update();
    this.cdr.detectChanges();
  }




  updateRequestChartData() {
    const currentYear = 2026;
    const monthlyCounts = new Array(12).fill(0);

    if (!this.data || !this.data.requests) return;

    this.data.requests.forEach(req => {
      const dateParts = req.date.split('/');
      if (dateParts.length === 3) {
        const month = parseInt(dateParts[1], 10) - 1;
        const year = parseInt(dateParts[2], 10);

        if (year === currentYear) {
          monthlyCounts[month] += 1;
        }
      }
    });

    // 2. Update immutably so ng2-charts detects the change
    this.reqChartData = {
      ...this.reqChartData,
      datasets: [
        {
          ...this.reqChartData.datasets[0],
          data: monthlyCounts
        }
      ]
    };

    this.cdr.detectChanges();
  }

  updateDoughnutChart() {
    const currentYear = '2026';

    // 1. Calculate total profit for Tickets
    const totalTicketProfit = this.data.tickets
      .filter(t => t.requestDate.includes(currentYear))
      .reduce((sum, t) => sum + t.profit, 0);

    // 2. Calculate total profit for Requests
    const totalRequestProfit = this.data.requests
      .filter(r => r.date.includes(currentYear))
      .reduce((sum, r) => sum + r.profit, 0);

    // 3. Update Chart (using Math.abs to ensure visibility if profits are negative)
    this.doughnutChartData = {
      labels: ['Ticket Profit', 'Request Profit'],
      datasets: [
        {
          ...this.doughnutChartData.datasets[0],
          data: [
            (totalTicketProfit),
            (totalRequestProfit)
          ],
          backgroundColor: ['#58b9e6', '#FF7E7E'], // Blue for tickets, Red for requests
        }
      ]
    };

    this.cdr.detectChanges();
  }
}
