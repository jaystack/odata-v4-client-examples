define(function (require) {
    var northwind = require('services/northwind'),
        ko = require('knockout');

    var context = northwind.getContext();

    function Model(categoryId, productEditorModel) {
        this.categoryId = categoryId;
        this.productEditorModel = productEditorModel;

        this.products = ko.observableArray();
    }

    Model.prototype.handleSelect = function handleSelect(productId) {
        this.productEditorModel.select(productId, this);
    }

    Model.prototype.init = function init(callback) {
        var _this = this;

        context.Products
            .filter(
            function (product) {
                return product.CategoryId === this.Id;
            },
            {
                Id: this.categoryId
            }
            )
            .toArray()
            .then(
            function (products) {
                _this.products(products);
                if (callback) callback();
            }
            );
    }

    return function (categoryId, productEditorModel) {
        return {
            model: new Model(categoryId, productEditorModel),
            view: "views/products"
        }
    };
});
