import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategory } from '../../../interfaces';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent {
    @Input() title: string  = '';
    @Input() categories: ICategory[] = [];
    @Input() allowActions: boolean = true;
    @Output() callModalAction: EventEmitter<ICategory> = new EventEmitter<ICategory>();
    @Output() callDeleteAction: EventEmitter<ICategory> = new EventEmitter<ICategory>();
}
