import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from '../models/product.model';
import { switchMap } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productList: Product[] = [];

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product)
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }

  get products(): Observable<Product> {
    let productList$ = this.db.list('/products').snapshotChanges();
    this.productList = [];
    let pList = productList$.pipe(switchMap(prodList => {
      prodList.forEach(products => {
        let indx = this.productList.length;
        this.productList[indx] = <Product>{};
        this.productList[indx]['key'] = products.key;
        this.productList[indx]['title'] = products.payload.val().title;
        this.productList[indx]['price'] = products.payload.val().price;
        this.productList[indx]['imageUrl'] = products.payload.val().imageUrl;
        this.productList[indx]['category'] = products.payload.val().category;
      });
      return this.productList;
    }));
    return pList;
  }

  getProduct(id) {
    return this.db.object('/products/' + id).snapshotChanges();
  }
}
