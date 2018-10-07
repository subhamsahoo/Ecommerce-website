import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProductService } from '../services/product.service';

@Injectable()
export class ProductsResolve implements Resolve<any> {

    constructor (private products: ProductService) {}
    resolve (route: ActivatedRouteSnapshot): any {
        let products = this.products.products;
        return {products:products};
    }
}