import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'product-frontend';

  products: Product[] = [];
  editProduct: Product = new Product();
  deleteProduct: Product = new Product();

  constructor(private productService: ProductService) { }


  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts(): void{
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddProduct(addForm: NgForm): void{
   document.getElementById('close-add-form')?.click();
   
    this.productService.addProduct(addForm.value).subscribe(
      (response: Product) => {
        console.log(response);
        this.getProducts();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public setEditProduct(product: Product):void{
    this.editProduct = product;
  }

  public onUpdateProduct(product: Product): void{
    document.getElementById('close-edit-form')?.click();
    
     this.productService.updateProduct(this.editProduct.id, product).subscribe(
       (response: Product) => {
         console.log(response);
         this.getProducts();
       },
       (error: HttpErrorResponse) => {
         alert(error.message);
       }
     );
  }

  public setDeleteProduct(product: Product):void{
    this.deleteProduct = product;
  }

  public onDeleteProduct(productId: number): void{
    document.getElementById('close-delete-form')?.click();
    
     this.productService.deleteProduct(productId).subscribe(
       (response: void) => {
         this.getProducts();
       },
       (error: HttpErrorResponse) => {
        this.getProducts();
       }
     );
  }

}
