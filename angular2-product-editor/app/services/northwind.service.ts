import {Injectable} from '@angular/core';
import {JayStack,factory} from '../../jaydata-model/Northwind';

@Injectable()
export class NorthwindService
{
    private ctx:JayStack.NorthwindContext

    constructor()
    {
        factory({})
        .onReady()
        .then(ctx=>{this.ctx = ctx; alert("asd")})
        .catch(error=>console.error(error))
    }
}