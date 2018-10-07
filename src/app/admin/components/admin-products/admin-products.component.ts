import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Observable } from '@firebase/util';
import { Product } from '../../../shared/models/product.model';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  productList$;
  productList: Product[]=[];
  tableResource: DataTableResource<Product>;
  items: Product[] = []; // data table items
  itemCount: number;

  constructor(private productService: ProductService) {
    this.productList$ = this.productService.products;
   }

   async getProducts () {
    (await this.productList$).subscribe((data)=>this.productList.push(data));
    return this.productList;
   }

  ngOnInit() {
    this.getProducts().then(items=>{
      this.items=items;
      this.initializeDataTable();
    });
  }

  filter (query: string) {
    this.items = (query) ? 
    this.productList.filter(product=>{
      return product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    }) :
    this.productList;

    this.initializeDataTable();
  }

  reloadItems(params) {

    if (!this.tableResource) return;
    this.tableResource.query(params)
    .then(items=>this.items = items);
  }

  private initializeDataTable(): void {
    this.tableResource = new DataTableResource(this.items);
    this.tableResource.query({offset:0})
    .then(_=>_);
    this.tableResource.count()
    .then(count=>this.itemCount = count)
  }

}
