import { Component } from '@angular/core';
import { NorthwindService } from '../services';
import { JayStack } from '../../jaydata-model/Northwind';
import { ProductsComponent } from './products.component';
import { ProductEditorComponent } from './product-editor.component';

@Component({
    selector: 'categories',
    templateUrl: './templates/categories.template.html',
    directives: [ProductsComponent, ProductEditorComponent]
})
export class CategoriesComponent {
    private categories = [];
    private context: JayStack.NorthwindContext

    constructor(northwindService: NorthwindService) {
        northwindService.getContext(
            context => this.OnContextLoaded(context)
        );
    }

    private OnContextLoaded(context) {
        this.context = context;
        this.context.Categories
            .toArray()
            .then(
            categories => this.categories = categories
            )
    }

    private toggleSlider(products: ProductsComponent, slider: HTMLDivElement) {
        if (products.isActive) {
            slider.style.height = "0px";
        }
        else {
            slider.style.height = "100%";
        }
    }

    private OnClick(products: ProductsComponent, slider: HTMLDivElement) {
        this.toggleSlider(products, slider);

        products.openToggle();
    }

    private OnAdd(products: ProductsComponent, slider: HTMLDivElement) {
        products.open();
        slider.style.height = "100%";

        products.add()
    }
}