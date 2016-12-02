$(function () {

    //OData provider
    var serviceHost = 'http://odata-v4-demo.jaystack.net/api';

    //placeholder for datasets
    var northwind = {
        Categories: [],
        Products: [],
        categoryIdSelected: '',
        productItemEdited: {}
    };

    //set $ajax calls to JSON
    $.ajaxSetup({
        contentType : 'application/json',
        processData : false
    });
    $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        if (options.data){
            options.data=JSON.stringify(options.data);
        }
    });


    //Initialize category and product arrays & bind 'save' button to saveProduct:
    $.ajax({
        url: serviceHost + '/Categories',
        cache: true,
        success: function (data) {
            northwind.Categories = data.value;
            app.renderCategories(northwind.Categories);
        },
        error: function (err) {
            console.log(err);
        }
    });
    $.ajax({
        url: serviceHost + '/Products',
        cache: true,
        success: function (data) {
            northwind.Products = data.value;
            $('form').bind('submit', saveProduct);
        }
    });


    function Application() {
        var self = this;

        self.renderCategories = function (dataList) {
            var table = $('#categoryTable tbody');
            table.empty();
            dataList.forEach(function (item) {
                table.append('<tr><td><a onClick="app.loadProduct(\'' + item._id + '\')">' +
                    item.Name + '</a></td><td>' + item.Description + '</td></tr>');
            });
        }

        self.loadProduct = function (categoryId) {
            northwind.categoryIdSelected = categoryId;
            self.renderProducts(
                northwind.Products
                    .filter(function (product) { return product.CategoryId == this.Id }, { Id: categoryId })
            )
        }

        self.renderProducts = function (dataList) {
            $('.well-box').hide();
            $('#productTable').show();
            var table = $('#productTable tbody');
            table.empty();
            dataList.forEach(function (item) {
                table.append('<tr><td><a onClick="app.editProduct(\'' + item._id + '\')">'
                    + item.Name + '</a></td>'
                    + '<td>' + item.QuantityPerUnit + '</td>'
                    + '<td>' + item.UnitPrice + '</td>'
                    + '<td>' + item.Discontinued + '</td></tr>');
            });
        }

        self.editProduct = function (productId) {
            self.renderEditProduct(
                northwind.Products
                    .find(function (product) { return product._id == this.Id }, { Id: productId })
            );
        }

        self.renderEditProduct = function (product) {
            northwind.productItemEdited = product;
            window.selectedProduct = product;
            $('form').serializeArray().forEach(function (item) {
                $('form [name="' + item.name + '"]').val(product[item.name]);
            });
            $('form [name="Discontinued"]').prop('checked', product['Discontinued']);
            $('.well-box').show();
        }

    }


    window['app'] = app = new Application();


    function renderCategories(dataList) {
        var table = $('#categoryTable tbody');
        table.empty();
        dataList.forEach(function (item) {
            table.append('<tr><td><a onClick="app.loadProduct(\'' + item._id + '\')">' +
                item.Name + '</a></td><td>' + item.Description + '</td></tr>');
        });
    }


    function saveProduct() {
        //Get data from #editProduct:
        //1. Init placeholder:
        var selectedProduct = {};
        //2. Collect the values from the form:
        $('form').serializeArray().forEach(function (item) {
            selectedProduct[item.name] = $('form [name="' + item.name + '"]').val();
        });
        selectedProduct.Discontinued = !!$('form [name = "Discontinued"]').is(':checked');

        //Save modified data:
        $.ajax({
            url: serviceHost + "/Products('"+ northwind.productItemEdited._id + "')",
            cache: true,
            type: 'PATCH',
            data: selectedProduct,
            success: function (data) {
                //Update data in product array:
                for (var prop in selectedProduct) {
                    if (selectedProduct.hasOwnProperty(prop)) {
                        northwind.productItemEdited[prop] = selectedProduct[prop];
                    }
                }
                //Re-render products to show modified data:
                app.loadProduct(northwind.categoryIdSelected);
            },
            error: function (err) {
                console.log("Product saving failed. Error:", err);
                alert("Product saving failed. Error:", err.description);
            }
        });

        return false;
    }
});