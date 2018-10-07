import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {  

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;
  
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {    
  }

  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product, 1);
  }

  subFromCart(product: Product) {
    this.shoppingCartService.addToCart(product, -1);
  }

  getQuantity() {
    if (!this.shoppingCart || this.shoppingCart === undefined) return 0;
    let prod = this.shoppingCart[this.product.key];
    return prod ? prod.quantity : 0;
  }

}
