import { Component, inject, ViewChild } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';
import { ProductFormComponent } from '../../components/products/product-form/product-form.component';
import { ProductListComponent } from '../../components/products/product-list/product-list.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ProductService } from '../../services/product.service';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IProduct } from '../../interfaces';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ModalComponent, ProductFormComponent, ProductListComponent, LoaderComponent, PaginationComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

      public productService: ProductService = inject(ProductService);
      public modalService: ModalService = inject(ModalService);
      public authService: AuthService = inject(AuthService);
      @ViewChild('addProductModal') public addProductModal: any;
      public fb: FormBuilder = inject(FormBuilder);
      productsForm = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(1)]],
        stockAmount: ['', [Validators.required, Validators.min(1)]]
      })
    
      constructor() {
        this.productService.search.page = 1;
        this.productService.getAll();
      }

      saveProduct(product: IProduct) {
        this.productService.save(product);
        this.modalService.closeAll();
      }
  
      callEdition(product: IProduct) {
        this.productsForm.controls['id'].setValue(product.id ? JSON.stringify(product.id) : '');
        this.productsForm.controls['name'].setValue(product.name ? product.name : '');
        this.productsForm.controls['description'].setValue(product.description ? product.description : '');
        this.productsForm.controls['price'].setValue(product.price ? JSON.stringify(product.price) : '');
        this.productsForm.controls['stockAmount'].setValue(product.stockAmount ? JSON.stringify(product.stockAmount) : '');
        this.modalService.displayModal('md', this.addProductModal);
      }

      updateProduct(product: IProduct) {
        this.productService.update(product);
        this.modalService.closeAll();
      }

}
