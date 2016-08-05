import { Component, Input, ElementRef } from '@angular/core';
import { NorthwindService } from '../services';
import { JayStack, Northwind } from '../../jaydata-model/Northwind';

@Component({
    selector: 'products',
    templateUrl: './templates/products.template.html'
})
export class ProductsComponent
{
    @Input("category-id")
    private categoryId: string;

    private products = [ ];
    
    public isActive = false;
    

    constructor( private northwindService: NorthwindService ){ }

    init( )
    {
        if( this.isActive )
        {
            this.isActive = false;
        }
        else
        {
            this.northwindService.getContext( 
                context => this.OnContextLoaded( context ) 
            );
        }
    }

    private OnContextLoaded( context )
    {
        context.Products
        .filter(
            function(product)
            {
                return product.CategoryId === this.Id;
            },
            {
                Id: this.categoryId
            }
        )
        .map( 
            product => {
                return {
                    id: product._id,
                    name: product.Name,
                    quantityPerUnit: product.QuantityPerUnit,
                    unitPrice: product.UnitPrice
                }
            }
        )
        .toArray( )
        .then( 
            products => {
                this.products = products;
                this.isActive = true;
            }
        );
    }

    OnClick( id:string )
    {
        console.info(id);
    }
}