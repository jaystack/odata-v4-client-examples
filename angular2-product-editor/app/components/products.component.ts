import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { NorthwindService } from '../services';
import { JayStack } from '../../jaydata-model/Northwind';
import { ProductEditorComponent } from './product-editor.component'

@Component({
    selector: 'products',
    templateUrl: './templates/products.template.html'
})
export class ProductsComponent implements OnInit
{
    @Input("category-id")
    private categoryId: string;

    @Input("editor")
    private editor: ProductEditorComponent;

    private products = [ ];
    public isActive = false;
    

    constructor( private northwindService: NorthwindService ){ }

    openToggle( )
    {
        if( this.isActive )
        {
            this.isActive = false;
        }
        else
        {
            this.init( );
        }
    }

    open( )
    {
        this.init( );
    }

    ngOnInit( )
    {
        this.editor.onSaveSub.subscribe( ( categoryId ) =>
            {
                if( categoryId === this.categoryId )
                this.init( )
            }
        )
    }

    add( )
    {
        this.editor.init( );
        this.editor.add( this.categoryId );
    }

    private init( )
    {
        this.northwindService.getContext( 
            context => this.OnContextLoaded( context ) 
        );
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

    private OnClick( id:string )
    {
        this.editor.targetProduct( id );
    }
}