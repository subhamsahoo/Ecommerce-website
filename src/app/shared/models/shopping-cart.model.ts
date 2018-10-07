import { ShoppingCartItem } from './shopping-cart-items';
export class ShoppingCart {

    public shoppingCartItems?: ShoppingCartItem[];

    constructor(itemsMap?: {[key: string]: ShoppingCartItem}){
        if (itemsMap) {
            for (let item in itemsMap) {
                this.shoppingCartItems.push(itemsMap[item]);
            }
        } else this.shoppingCartItems = [];
    }

    get totalItemCount (): number {
        let totals = 0;
        this.shoppingCartItems.forEach(item=>{
            totals += item.quantity;
        });
        return totals;
    }

    get totalPrice () {
        let totals = 0;
        this.shoppingCartItems.forEach(item=>{
            totals += item.product.price * item.quantity;
        });
        return totals;
    }

    getTotalItemCountJson (json: any): number {
      let keys = Object.keys(json);
      this.shoppingCartItems = [];
      for (let k of keys) {
        let item: ShoppingCartItem = new ShoppingCartItem(k, json[k].product, json[k].quantity);
        this.shoppingCartItems.push(item);
      };
      return this.totalItemCount;
    }
}