import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import {
  AngularFireModule,
  FirebaseAppConfigToken,
  FirebaseAppNameToken,
  FirebaseOptionsToken
} from "angularfire2";
import { AngularFireAuth } from "angularfire2/auth";
import { ProductsResolve } from "shared/resolvers/product-resolve.service";

import { environment } from "../environments/environment";
import { AdminModule } from "./admin/admin.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./core/components/login/login.component";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { ProductsComponent } from "./shopping/components/products/products.component";
import { ShoppingModule } from "./shopping/shopping.module";
import { ServiceWorkerModule } from "@angular/service-worker";
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule,
    RouterModule.forRoot([
      {
        path: "",
        component: ProductsComponent,
        resolve: {
          data: ProductsResolve
        }
      },
      { path: "login", component: LoginComponent }
    ]),
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [
    { provide: FirebaseOptionsToken, useValue: environment.firebase },
    { provide: FirebaseAppNameToken, useValue: "oshop" },
    { provide: FirebaseAppConfigToken, useValue: environment.firebase },
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
