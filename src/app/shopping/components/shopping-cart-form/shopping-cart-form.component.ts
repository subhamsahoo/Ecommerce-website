import { Component, OnInit, Input } from '@angular/core';
import { OrdersService } from 'shared/services/orders.service';
import { AuthService } from 'shared/services/auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShoppingCart } from 'shared/models/shopping-cart.model';
import { Order } from 'shared/models/order.model';

@Component({
  selector: 'shopping-cart-form',
  templateUrl: './shopping-cart-form.component.html',
  styleUrls: ['./shopping-cart-form.component.css']
})
export class ShoppingCartFormComponent implements OnInit {

  @Input('shoppingCartModel')shoppingCartInstance: ShoppingCart;
  shippingForm: FormGroup;
  name: FormControl = new FormControl('', [Validators.required]);
  address: FormGroup;
  address1: FormControl = new FormControl('', [Validators.required]);
  address2: FormControl = new FormControl();
  city: FormControl = new FormControl('', [Validators.required]);
  userInfo: {};

  constructor(
    private orderService: OrdersService,
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit() {

    this.shippingForm = new FormGroup({
      name: this.name,
      address: new FormGroup(
        {
          address1: this.address1,
          address2: this.address2
        }
      ),
      city: this.city,
    });

    let authSub = this.authService.$loginUser.subscribe(loginUser=>{
      this.userInfo = {id: loginUser.uid,
      name: loginUser.displayName,
      email: loginUser.email};
      authSub.unsubscribe();
    })

  }

  placeOrder () {
    let orders$ = this.orderService.placeOrder(
      new Order(this.shippingForm.value, this.shoppingCartInstance.shoppingCartItems, this.userInfo)
    );
    orders$
    .then(result=>{
      alert(`'Order placed=>' ${result.key}`);
      
      let navigationExtras: NavigationExtras = {
        queryParams: { 'order_id': result.key }
      };
      
      this.route.navigate(['order-success'], navigationExtras);
    }, error=>console.log(`'Error in order=>' ${error}`))
  }

}
