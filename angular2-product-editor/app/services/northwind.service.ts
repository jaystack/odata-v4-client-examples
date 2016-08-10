import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Northwind } from '../../jaydata-model/Northwind';
import "jaydata/odata";


@Injectable( )
export class NorthwindService
{
    private context: Northwind.NorthwindContext;
    private subject: Subject<Northwind.NorthwindContext>;
    
    private config = {
        provider: 'oData',
        oDataServiceHost: "http://localhost:3000/odata"
    };

    constructor( )
    {
        this.subject = new Subject( );

        new Northwind.NorthwindContext( this.config )
        .onReady( )
        .then( context => this.onReady( context ) );
    }

    getContext( setContext:( context: Northwind.NorthwindContext )=>void )
    {
        if( this.context )
        {
            setContext( this.context );
        }
        else
        {
            this.subject.subscribe( setContext );
        }
    }

    private onReady( context: Northwind.NorthwindContext )
    {
        this.context = context;
        this.subject.next( this.context );
        this.subject.complete( );
    }
}