import { Component, OnInit, OnDestroy } from "@angular/core";
import { CategoryService } from "../../../shared/services/category.service";
import { Observable } from "rxjs/Observable";
import { ProductService } from "../../../shared/services/product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any[]>;
  saveStatus;
  currentProduct = {
    title: "",
    price: "",
    imageUrl: "",
    category: ""
  };
  prodSub: Subscription;
  productId;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.categories$ = this.categoryService.categories;
    this.productId = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.productId) {
      let productObjservable$ = this.productService.getProduct(this.productId);
      this.prodSub = productObjservable$.subscribe(p => {
        this.currentProduct = p.payload.val();
        this.prodSub.unsubscribe();
      });
    }
  }

  ngOnInit() {}

  save(product) {
    this.saveStatus = { status: "error", message: "Not saved!!" };
    let ref: any;
    if (!this.productId) {
      ref = this.productService.create(product);
    } else {
      ref = this.productService.update(this.productId, product);
    }

    ref.then(_ => {
      this.saveStatus = { status: "success", message: "Saved successfully..." };
      setTimeout(_ => this.router.navigate(["/admin/products"]), 1000);
    });
  }

  delete() {
    if (!confirm("Are you sure??")) return;
    this.productService.delete(this.productId);
    this.router.navigate(["/admin/products"]);
  }
}
