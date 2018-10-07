import { Component, OnInit, OnDestroy, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, DoCheck, ViewChildren, ContentChildren, QueryList } from '@angular/core';
import { Product } from 'shared/models/product.model';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements DoCheck, OnInit, OnDestroy, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {

  productList$: Observable<any>;
  productList: Product[]=[];
  items: Product[] = [];
  selectedCategory: string;
  shoppingCart;
  shoppingCartSub: Subscription;
  @ViewChildren(ProductCardComponent) prodCards = new QueryList<ProductCardComponent>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {
    this.activatedRoute.data.forEach(data=>this.productList$ = data.data.products);    
  }

  ngOnInit() {
    this.populateProducts();

    this.populateShoppingCart();
  }

  ngDoCheck () {
    console.log("on do check");
  }
  
  ngOnChanges() {
    console.log("on changes");
  }

  ngAfterContentChecked () {
  }

  ngAfterContentInit () {
  }

  ngAfterViewChecked () {
    this.prodCards.forEach(item=>console.log('ViewChecked item', item))
  }

  ngAfterViewInit () {
    this.prodCards.forEach(item=>console.log('ViewInit item', item))
  }

  ngOnDestroy () {
    this.shoppingCartSub.unsubscribe();
  }

  async populateProducts () {
    (await this.productList$).subscribe((data)=>this.productList.push(data));
    this.activatedRoute.queryParamMap.subscribe((param: any)=>{
      this.selectedCategory = param.get('category') || null;
      this.filter(this.selectedCategory);
    });
  }

  async populateShoppingCart () {
    this.shoppingCartSub = (await this.shoppingCartService.getCart())
    .snapshotChanges().subscribe(result=>this.shoppingCart=result.payload.val() ? result.payload.val().items : null);
  }

  filter(query: any) {
    this.selectedCategory = query ? query : null;
    this.items = query ?
      this.productList.filter(product => product.category === query) :
      this.productList;
  }

}

