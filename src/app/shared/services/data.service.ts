import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  tickets: any[] = [
    // {
    //   id: '119146',
    //   clientInitials: 'MA',
    //   clientName: 'MANDALA TRAVEL',
    //   clientEmail: 'info@mandalatravel.com',
    //   requestDate: '06/06/2026',
    //   travelDate: '21 May, 2024',
    //   travellers: 'ASLAN HAFEZ',
    //   ticketCount: 1,
    //   profit:100,
    //   consultant: 'TAREK RAAD',
    //   itinerary: 'BEY - LCA',
    //   status: 'In Progress'
    // },
    // {
    //   id: '119145',
    //   clientInitials: 'YE',
    //   clientName: 'YELOW TRAVEL',
    //   clientEmail: 'a.ashar@yellowtr.com',
    //   requestDate: '06/09/2026',
    //   travelDate: '01 May, 2024',
    //   travellers: 'GETACHEW TUTE ABELA MISS',
    //   ticketCount: 1,
    //   profit:300,
    //   consultant: 'FARAH SAKKA',
    //   itinerary: 'ADD - BEY',
    //   status: 'In Progress'
    // },
    // {
    //   id: '119144',
    //   clientInitials: 'TW',
    //   clientName: 'TRAVEL JR',
    //   clientEmail: 'booking@traveljr.com',
    //   requestDate: '06/11/2026',
    //   travelDate: '05 Jun, 2024',
    //   travellers: 'AYMAN EL MOGHRABI',
    //   ticketCount: 4,
    //   profit:-100,
    //   consultant: 'RENEE DIAB',
    //   itinerary: 'BEY - AYT / AYT - BEY',
    //   status: 'Confirmed'
    // },
  ];

  requests: any[] = [
    // {
    //   id: 0,
    //   desc: 'logo static',
    //   cost: 200,
    //   sell: 0,
    //   profit: -200,
    //   date: '06/09/2026'
    // },
    // {
    //   id: 1,
    //   desc: 'Furniture',
    //   cost: 550,
    //   sell: 0,
    //   profit: -500,
    //   date: '06/11/2026'
    // },
    // {
    //   id: 1,
    //   desc: 'Furniture',
    //   cost: 550,
    //   sell: 0,
    //   profit: -500,
    //   date: '06/11/2026'
    // },
  ];
}
