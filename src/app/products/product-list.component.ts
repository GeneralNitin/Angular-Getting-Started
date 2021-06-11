import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
	selector: 'pm-products',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy {

	pageTitle: string = 'Product List';
	imageWidth: number = 50;
	imageMargin: number = 2;
	showImage: boolean = false;
	// listFilter: string = 'cart';
	products: IProduct[] = [];
	filteredProducts: IProduct[] = [];
	errorMessage: string = '';
	sub!: Subscription;

	/* Standard way to handling Dependency Injection in TypeScript */
	// private _productService;
	// constructor(productService: ProductService) {
	// 	this._productService = productService;
	// }

	/* This is the shorthand of Dependency Injection */
	constructor(private productService: ProductService) { }

	ngOnInit(): void {
		// throw new Error("Method not implemented.");
		console.info("In OnInit");
		// this._listFilter = 'cart'; // since it's a private var it doesn't triggers the onChange implemented using setter
		// this.listFilter = 'cart'; // this will call the setter method and will show filtered data on first time load itself
		// this.products = this.productService.getProducts();

		this.sub = this.productService.getProducts().subscribe({
			next: products => {
				this.products = products;
				this.filteredProducts = this.products;
			},
			error: err => this.errorMessage = err
		});
		// this.filteredProducts = this.products;
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}


	private _listFilter: string = '';
	get listFilter(): string {
		return this._listFilter;
	}
	set listFilter(value: string) {
		this._listFilter = value;
		console.warn("In Setter: ", value);

		this.filteredProducts = this.filterProduct(value.trim());
	}





	// filteredProducts: IProduct[] = this.products;

	toggleImage(): void {
		this.showImage = !this.showImage;
	}

	filterProduct(filterBy: string): IProduct[] {
		filterBy = filterBy.toLocaleLowerCase();
		return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().includes(filterBy))
	}

	onRatingClicked(message: string): void {
		this.pageTitle = 'Product List: ' + message;
	}
}


