import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  
  shoppingCartInstance: ShoppingCart;
  cartSubscription: Subscription;
  shopCart;

  constructor(private shoppingCart: ShoppingCartService, private router: Router) { }

  ngOnInit() {
    this.shoppingCartInstance = new ShoppingCart();      
    this.getShoppingCart();
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

  clearCart () {
    let confirmation = confirm("Are you sure??");
    if (confirmation){
      this.shoppingCart.clearCart();
    }
  }

  ngOnDestroy () {
    this.cartSubscription.unsubscribe();
  }

}
