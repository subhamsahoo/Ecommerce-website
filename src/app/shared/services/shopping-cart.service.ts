import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ThenableReference } from '@firebase/database-types';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private createCart(): ThenableReference {
    return this.db.list('/shopping-carts').push({
      createdDate: new Date().getTime()
    });
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  private async getOrCreateCartId() {

    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.createCart();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  getItem (cartId, productId) {
    return this.db.object('/shopping-carts/'+cartId + '/items/' + productId);
  }

  addOrUpdateItem(item$, product: Product, qty: number) {
    let subsc = item$.snapshotChanges().subscribe(item=> {
      subsc.unsubscribe();
      if (qty < 0) {
        let dbQty = item.payload.val().quantity + qty;
        if (dbQty <= 0){
          item$.remove();
          return;
        }
      }
      let dbQty = item.payload.val() ? item.payload.val().quantity + qty : 1;
      item$.update({product: product, quantity: dbQty});
    });
  }

  async addToCart(product: Product, qty: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = await this.getItem(cartId, product.key);
    this.addOrUpdateItem(item$, product, qty);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    let removed$ = this.db.object('/shopping-carts/' + cartId + '/items').remove();
    removed$.
    then(result=> console.log("result of removal", result)).
    catch(error=> console.log('remove error', error))
  }
}


