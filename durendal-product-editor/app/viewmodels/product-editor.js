define(function (require) {
    var northwind = require('services/northwind'),
        ko = require('knockout');

    var context = northwind.getContext();

    function Model() {
        this.productsModel = null;

        this.action = ko.observable();
        this.notifyText = ko.observable("Please wait ...");

        this.name = ko.observable();
        this.quantityPerUnit = ko.observable();
        this.unitPrice = ko.observable();

        this.product = null;
        this.categoryId = null;
    }

    Model.prototype.select = function select(productId, productsModel) {
        this.productsModel = productsModel;
        this.action("edit");
        this.notifyText("Please wait ...");
        this.init(productId);
    }

    Model.prototype.add = function add(categoryId, productsModel) {
        this.categoryId = categoryId;
        this.productsModel = productsModel;
        this.action("Add");
        this.notifyText("Please wait ...");

        this.name("");
        this.quantityPerUnit("");
        this.unitPrice("");
        this.product = null;
    }

    Model.prototype.init = function init(productId) {
        var _this = this;

        context.Products
            .single(
            function (product) {
                return product._id === this.id;
            },
            {
                id: productId
            }
            )
            .then(
            function (product) {
                _this.product = product;
                _this.name(product.Name);
                _this.quantityPerUnit(product.QuantityPerUnit);
                _this.unitPrice(product.UnitPrice);
            }
            );
    }

    Model.prototype.onSave = function () {
        var _this = this;
        var isNew = false;

        if (this.product) {
            context.Products.attach(this.product);
        }
        else {
            isNew = true;
            this.product = new northwind.Product();
            this.product.CategoryId = this.categoryId;
        }

        this.product.Name = this.name();
        this.product.QuantityPerUnit = this.quantityPerUnit();
        this.product.UnitPrice = this.unitPrice();

        if (isNew) {
            context.Products.add(this.product);
        }

        context.saveChanges()
            .then(
            function () {
                _this.notifyText("Complele");
                _this.productsModel.init();
            }
            )
            .catch(
            function (error) {
                _this.notifyText("Error: " + error.name);
            }
            );

        context.stateManager.reset();
    }

    return function () {
        return {
            model: new Model(),
            view: "views/product-editor"
        }
    };
});
