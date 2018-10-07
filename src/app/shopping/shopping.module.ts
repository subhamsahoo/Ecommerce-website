import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { OrderResolverService } from "shared/resolvers/order-resolver.service";
import { ProductsResolve } from "shared/resolvers/product-resolve.service";
import { AuthGuard } from "shared/services/auth-guard.service";

import { SharedModule } from "../shared/shared.module";
import { CheckOutComponent } from "./components/check-out/check-out.component";
import { MyOrdersComponent } from "./components/my-orders/my-orders.component";
import { OrderSuccessComponent } from "./components/order-success/order-success.component";
import { ProductFilterComponent } from "./components/products/product-filter/product-filter.component";
import { ProductsComponent } from "./components/products/products.component";
import { ShoppingCartFormComponent } from "./components/shopping-cart-form/shopping-cart-form.component";
import { ShoppingCartSummaryComponent } from "./components/shopping-cart-summary/shopping-cart-summary.component";
import { ShoppingCartComponent } from "./components/shopping-cart/shopping-cart.component";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot([
      {
        path: "products",
        component: ProductsComponent,
        data: { message: "thisismsg" }
      },
      { path: "shopping-cart", component: ShoppingCartComponent },
      {
        path: "check-out",
        component: CheckOutComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "order-success",
        component: OrderSuccessComponent,
        canActivate: [AuthGuard],
        resolve: {
          data: OrderResolverService
        }
      },
      {
        path: "my/orders",
        component: MyOrdersComponent,
        canActivate: [AuthGuard]
      }
    ])
  ],
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ShoppingCartSummaryComponent,
    ShoppingCartFormComponent,
    ProductFilterComponent
  ]
})
export class ShoppingModule {}
