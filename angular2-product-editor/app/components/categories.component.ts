import { Component } from '@angular/core';
import { NorthwindService } from '../services';
import { JayStack, Northwind } from '../../jaydata-model/Northwind';
import { ProductsComponent } from './products.component';

@Component({
    selector: 'categories',
    templateUrl: './templates/categories.template.html',
    directives: [ProductsComponent]
})
export class CategoriesComponent
{
    private categories = [ ];
    private context: JayStack.NorthwindContext

    constructor( northwindService: NorthwindService ) 
    {
        northwindService.getContext( 
            context => this.OnContextLoaded( context ) 
        );
    }

    OnContextLoaded( context )
    {
        this.context = context;
        this.context.Categories
        .map( 
            category => {
                return {
                    name: category.Name,
                    description: category.Description,
                    id: category._id
                }
            }
        )
        .toArray( )
        .then( 
            categories => this.categories = categories
        )
    }

    OnClick( products: ProductsComponent, slider: HTMLDivElement )
    {
        if( products.isActive )
        {
            products.init( );
            slider.style.height = "0px";
        }
        else
        {
            products.init( );
            slider.style.height = "100%";
        }
    }
}