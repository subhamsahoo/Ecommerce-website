import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from '../shopping/components/products/products.component';
import { ProductsResolve } from 'shared/resolvers/product-resolve.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from '../admin/admin.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClockComponent } from './components/clock/clock.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([]),
    NgbModule.forRoot()
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    BsNavbarComponent,
    ClockComponent    
  ],
  exports: [
    BsNavbarComponent
  ]
})
export class CoreModule { }
