import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart.model';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shoppingCartInstance: ShoppingCart;
  cartSubscription: Subscription;
  shopCart;

  constructor(
    private shoppingCart: ShoppingCartService
  ) {
    this.shoppingCartInstance = new ShoppingCart(); 
   }

  ngOnInit() {
    
    this.getShoppingCart();
    
  }

  ngOnDestroy () {
    this.cartSubscription.unsubscribe();
  }

  async getShoppingCart () {
    let cart = await (this.shoppingCart.getCart());
    this.cartSubscription = cart.snapshotChanges().subscribe(values=>{
      this.shoppingCartInstance = new ShoppingCart();      
      if (values.payload.toJSON()) {
        this.shoppingCartInstance.getTotalItemCountJson(values.payload.toJSON()["items"]);
        this.shopCart=values.payload.val().items      
      }      
    })
  }

}
