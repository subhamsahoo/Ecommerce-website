import { ShoppingCartItem } from './shopping-cart-items';
export class Order {
    datePlaced: number;
    shipping: any;
    items: any[];
    placedBy: any;
    constructor(shipping:any, items: ShoppingCartItem[], userInfo: any){
        this.datePlaced = new Date().getTime();
        this.items = items.map(item=>{
            return {
                product: {
                  name: item.product.title,
                  imageUrl: item.product.imageUrl,
                  price: item.product.price
                },
                quantity: item.quantity,
                totalPrice: item.totalPrice
              }
        });
        this.shipping = shipping;
        this.placedBy = userInfo;
    }
}
