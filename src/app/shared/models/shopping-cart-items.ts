import { Product } from './product.model';
export class ShoppingCartItem {
    constructor(public id: string, public product: Product, public quantity: number) {}

    get totalPrice(): number {return this.product.price * this.quantity}
}