import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../shared/services/orders.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  private orders$;
  myOrders: any[];
  
  constructor(private orderService: OrdersService) {
    this.orders$ = this.orderService.orders;
   }

  ngOnInit() {
    this.orders$.subscribe(orders=>{
      this.myOrders = orders
      this.myOrders.forEach(order=>{
        let totPrice: number=0;
        order.items.forEach(item=>{
          totPrice += item.totalPrice;
        });
        order['totalPrice'] = totPrice;
      })
    });
  }

}
