import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTableModule } from 'angular5-data-table';
import { AdminOrdersComponent } from 'app/admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from 'app/admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from 'app/admin/components/product-form/product-form.component';
import { CustomFormsModule } from 'ng2-validation';
import { AuthGuard } from 'shared/services/auth-guard.service';

import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path:'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path:'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path:'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path:'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard]}
    ])    
  ],
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent
  ],
  providers: [
    AdminAuthGuard
  ],
  exports: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent
  ]
})
export class AdminModule { }
