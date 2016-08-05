import { Component } from '@angular/core';
import { CategoriesComponent } from './categories.component';

@Component({
    selector: 'jaystack-example-app',
    templateUrl: './templates/jaystack-example-app.template.html',
    directives: [ CategoriesComponent ]
})
export class MainComponent { }