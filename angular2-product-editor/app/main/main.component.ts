import { Component } from '@angular/core';
import { NorthwindService } from '../services'

@Component({
    selector: 'jaystack-example-app',
    templateUrl: './templates/jaystack-example-app.template.html'
})
export class MainComponent 
{ 
    constructor( private northwindService: NorthwindService ) {}
}
