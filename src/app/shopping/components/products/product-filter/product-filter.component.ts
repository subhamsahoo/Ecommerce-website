import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$: Observable<any[]>;
  categoryList: {}[] = [];
  @Input('selectedCategory') selectedCategory: string;
  @Input('items') items?=null;


  constructor(
    private categoryService: CategoryService
  ) {
    this.categories$ = this.categoryService.categories;
    let cats = [];
    this.categories$.subscribe(catList => {
      this.categoryList = cats;
      catList.forEach(proCats => {
        let indx = cats.length;
        cats[indx] = {};
        cats[indx]['key'] = proCats.key;
        cats[indx]['name'] = proCats.payload.val().name;
      });
    });
  }

  ngOnInit() {
  }

}
