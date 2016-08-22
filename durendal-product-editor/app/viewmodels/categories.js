define(function (require) {
    var northwind = require('services/northwind'),
        ko = require('knockout');

    var productEditor = require("viewmodels/product-editor"),
        products = require("viewmodels/products");

    var context = northwind.getContext();


    function Model() {
        var _this = this;

        this.productEditor = productEditor();
        this.categories = ko.observableArray();
        this.products = [];

        context.Categories
            .toArray()
            .then(
            function (_categories) {
                _categories.forEach(
                    function (category) {
                        _this.products.push(
                            products(
                                category._id,
                                _this.productEditor.model
                            )
                        );
                    }
                );

                _this.categories(_categories);
            });
    }

    Model.prototype.toggleOpen = function toggleOpen(indexOfProducts) {
        var slide = $(".slide")[indexOfProducts];
        if (slide.style.height === "") {
            this.products[indexOfProducts].model.init(
                function () {
                    slide.style.height = "100%";
                }
            );
        }
        else {
            slide.style.height = "";
        }
    };

    Model.prototype.OnAdd = function OnAdd(indexOfProducts, categoryId) {
        var slide = $(".slide")[indexOfProducts];
        if (slide.style.height === "") {
            this.products[indexOfProducts].model.init(
                function () {
                    slide.style.height = "100%";
                }
            );
        }

        this.productEditor.model.add(
            categoryId,
            this.products[indexOfProducts].model
        );
    };

    Model.prototype.initDB = function initDB() {
        var _this = this;
        context.initDb()
            .then(function () {
                var categories = _this.categories();
                categories.forEach(function (category) {
                    category.products.model.init();
                });
            })
    };

    return function () {
        return {
            model: new Model(),

            view: "views/categories"
        }
    }

});
