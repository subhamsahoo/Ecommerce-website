import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  orderId: string;
  orderDetails: any = {};
  details$: Observable<any>;

  constructor(private route: ActivatedRoute) {
     this.route.data.forEach(details=>{
       this.orderId = details.data['order_id'];
       this.details$ = details.data['orderDetails'];
       
     });    
   }

  async ngOnInit() {
    await this.details$.subscribe(data=>{
      this.orderDetails['id'] = data[0];
      this.orderDetails['items'] = data[1];
      this.orderDetails['userInfo'] = data[2];
      this.orderDetails['address'] = data[3];
     })
  }

}
