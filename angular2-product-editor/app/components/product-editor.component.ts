import { Component } from '@angular/core';
import { NorthwindService } from '../services';
import { JayStack, Northwind, factory, type } from '../../jaydata-model/Northwind';
import { Subject } from "rxjs/Subject";

@Component({
    selector: 'product-editor',
    templateUrl: './templates/product-editor.template.html'
})
export class ProductEditorComponent {
    public onSaveSub: Subject<string>

    private context: JayStack.NorthwindContext
    private originProduct: Northwind.Product
    private categoryId: string
    private product: {
        id: string,
        name: string,
        quantityPerUnit: string,
        unitPrice: string,
        action: string
    };
    private notifyText = "Please wait ...";
    private isChange = true;

    constructor(northwindService: NorthwindService) {
        this.init();

        this.onSaveSub = new Subject();

        northwindService.getContext(
            context => this.context = context
        );
    }

    targetProduct(id: string) {
        this.isChange = true;
        this.context.Products
            .single(
            function (product) {
                return product._id === this.id;
            },
            {
                id: id
            }
            )
            .then(
            product => {
                this.originProduct = product;
                this.product = {
                    id: product._id,
                    name: product.Name,
                    quantityPerUnit: product.QuantityPerUnit,
                    unitPrice: product.UnitPrice,
                    action: "edit"
                }
            }
            );

        this.notifyText = "Please wait ..."
    }

    init() {
        this.product = {
            id: "",
            name: "",
            quantityPerUnit: "",
            unitPrice: "",
            action: ""
        };
    }

    add(categoryId: string) {
        this.categoryId = categoryId;
        this.isChange = false;
    }

    private OnSave(name: string, quantityPerUnit: string, unitPrice: string) {
        this.init();
        if (this.isChange) {
            this.context.Products.attach(this.originProduct);
        }
        else {
            this.originProduct = new Northwind.Product();
            this.originProduct.CategoryId = this.categoryId;
        }

        this.originProduct.Name = name;
        this.originProduct.QuantityPerUnit = quantityPerUnit
        this.originProduct.UnitPrice = unitPrice;

        if (!this.isChange) {
            this.context.Products.add(this.originProduct);
        }

        this.context.saveChanges()
            .then(
            () => this.notifyText = "Complele"
            )
            .catch(
            (error) => this.notifyText = "Error: " + error.name
            );

        this.context.stateManager.reset();
        this.onSaveSub.next(this.originProduct.CategoryId);
    }
}