import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Order } from '../models/order.model';
import { OrdersService } from '../services/orders.service';

@Injectable({
  providedIn: 'root'
})
export class OrderResolverService implements Resolve<any> {

  constructor(private orderService: OrdersService) { }

  async resolve(route: ActivatedRouteSnapshot) {
    let orderId = route.queryParamMap.get('order_id');
    let order$ = await this.orderService.getOrderFromId(orderId);
    return {'order_id': orderId, 'orderDetails': order$};
  }
}
