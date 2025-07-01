import { Component, inject, ViewChild } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { CategoriesFormComponent } from '../../components/category/categories-form/categories-form.component';
import { CategoriesListComponent } from '../../components/category/categories-list/categories-list.component';
import { CategoryService } from '../../services/category.service';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IProduct } from '../../interfaces';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [LoaderComponent,ModalComponent, CategoriesFormComponent, CategoriesListComponent, PaginationComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

    public categoryService: CategoryService = inject(CategoryService);
    public modalService: ModalService = inject(ModalService);
    public authService: AuthService = inject(AuthService);
    @ViewChild('addCategoryModal') public addCategoryModal: any;
    public fb: FormBuilder = inject(FormBuilder);
    categoriesForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
    })
  
    constructor() {
      this.categoryService.search.page = 1;
      this.categoryService.getAll();
    }

    saveCategory(product: IProduct) {
      this.categoryService.save(product);
      this.modalService.closeAll();
    }

    callEdition(product: IProduct) {
      this.categoriesForm.controls['id'].setValue(product.id ? JSON.stringify(product.id) : '');
      this.categoriesForm.controls['name'].setValue(product.name ? product.name : '');
      this.categoriesForm.controls['description'].setValue(product.description ? product.description : '');
      this.modalService.displayModal('md', this.addCategoryModal);
    }

    updateCategory(product: IProduct) {
      this.categoryService.update(product);
      this.modalService.closeAll();
    }
}
